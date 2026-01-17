import { parseHardcodedFileToObjectList } from "@/shared/match-data-file-parser";
import { PlayerBasicInfo } from "@/shared/model";
import { PlayerMatchStats } from "../types";

interface PlayerStatsAccumulator {
    kills: number;
    deaths: number;
    headshotKills: number;
    totalDamage: number;
}

const ATTACK_PATTERN = /^"([^<"]+)<[^>]+><[^>]+><[^>]+>" \[-?\d+ -?\d+ -?\d+\] attacked "[^<"]+<[^>]+><[^>]+><[^>]+>" \[-?\d+ -?\d+ -?\d+\] with "[^"]+" \(damage "(\d+)"\)/;
const KILL_PATTERN = /^"([^<"]+)<[^>]+><[^>]+><[^>]+>" \[-?\d+ -?\d+ -?\d+\] killed "([^<"]+)<[^>]+><[^>]+><[^>]+>" \[-?\d+ -?\d+ -?\d+\] with "[^"]+"/;

function createEmptyAccumulator(): PlayerStatsAccumulator {
    return { kills: 0, deaths: 0, headshotKills: 0, totalDamage: 0 };
}

export function parseMatchStatsForPlayers(players: PlayerBasicInfo[]): PlayerMatchStats[] {
    const events = parseHardcodedFileToObjectList();
    const statsMap = new Map<string, PlayerStatsAccumulator>(
        players.map((p) => [p.name, createEmptyAccumulator()])
    );
    let totalRounds = 0;

    for (const event of events) {
        const { data } = event;

        if (data.includes('World triggered "Round_Start"')) {
            totalRounds++;
            continue;
        }

        const attackMatch = data.match(ATTACK_PATTERN);
        if (attackMatch) {
            const [, attackerName, damageStr] = attackMatch;
            const stats = statsMap.get(attackerName);
            if (stats) {
                stats.totalDamage += parseInt(damageStr, 10);
            }
            continue;
        }

        const killMatch = data.match(KILL_PATTERN);
        if (killMatch) {
            const [, killerName, victimName] = killMatch;
            const isHeadshot = data.endsWith("(headshot)");

            const killerStats = statsMap.get(killerName);
            if (killerStats) {
                killerStats.kills++;
                if (isHeadshot) {
                    killerStats.headshotKills++;
                }
            }

            const victimStats = statsMap.get(victimName);
            if (victimStats) {
                victimStats.deaths++;
            }
        }
    }

    return players.map((player) => {
        const stats = statsMap.get(player.name)!;
        return {
            name: player.name,
            kills: stats.kills,
            deaths: stats.deaths,
            kdDiff: stats.kills - stats.deaths,
            avgDmgPerRound: totalRounds > 0 ? Math.round(stats.totalDamage / totalRounds) : 0,
            headshotPercentage: stats.kills > 0 ? Math.round((stats.headshotKills / stats.kills) * 100) : 0,
        };
    });
}
