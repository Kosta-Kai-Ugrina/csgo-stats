import { parseHardcodedFileToObjectList, parsePlayersFromBothTeams, parseTeamNames } from "@/shared/match-data-file-parser";
import { PlayerBasicInfo, Side } from "@/shared/model";
import { RoundStats, TeamRoundStats } from "../types";

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

export function parseMatchStatsPerRound(): RoundStats[] {
    const events = parseHardcodedFileToObjectList();
    const [firstTeamName, secondTeamName] = parseTeamNames();
    const [firstTeamPlayers, secondTeamPlayers] = parsePlayersFromBothTeams();

    const allPlayerNames = [
        ...firstTeamPlayers.map(p => p.name),
        ...secondTeamPlayers.map(p => p.name),
    ];

    const rounds: RoundStats[] = [];
    let roundAccumulators: Map<string, PlayerStatsAccumulator> | null = null;
    let roundNumber = 0;
    let winningSide: Side | null = null;
    let firstTeamSide: Side | null = null;
    let secondTeamSide: Side | null = null;

    for (const event of events) {
        const { data } = event;

        if (data.includes('World triggered "Round_Start"')) {
            roundNumber++;
            roundAccumulators = new Map(
                allPlayerNames.map(name => [name, createEmptyAccumulator()])
            );
            winningSide = null;
            continue;
        }

        if (!roundAccumulators) continue;

        const attackMatch = data.match(ATTACK_PATTERN);
        if (attackMatch) {
            const [, attackerName, damageStr] = attackMatch;
            const stats = roundAccumulators.get(attackerName);
            if (stats) {
                stats.totalDamage += parseInt(damageStr, 10);
            }
            continue;
        }

        const killMatch = data.match(KILL_PATTERN);
        if (killMatch) {
            const [, killerName, victimName] = killMatch;
            const isHeadshot = data.endsWith("(headshot)");

            const killerStats = roundAccumulators.get(killerName);
            if (killerStats) {
                killerStats.kills++;
                if (isHeadshot) killerStats.headshotKills++;
            }

            const victimStats = roundAccumulators.get(victimName);
            if (victimStats) {
                victimStats.deaths++;
            }
            continue;
        }

        const winTriggerMatch = data.match(/^Team "(CT|TERRORIST)" triggered "(SFUI_Notice_[^"]+)"/);
        if (winTriggerMatch) {
            const [, side, trigger] = winTriggerMatch;
            if (trigger.includes("Win") || trigger === "SFUI_Notice_Target_Bombed") {
                winningSide = side as Side;
            } else if (trigger === "SFUI_Notice_Bomb_Defused") {
                winningSide = "CT";
            }
            continue;
        }

        const sideMatch = data.match(/^MatchStatus: Team playing "(CT|TERRORIST)": (.+)$/);
        if (sideMatch) {
            const [, side, teamName] = sideMatch;
            if (teamName === firstTeamName) {
                firstTeamSide = side as Side;
                secondTeamSide = side === "CT" ? "TERRORIST" : "CT";
            } else if (teamName === secondTeamName) {
                secondTeamSide = side as Side;
                firstTeamSide = side === "CT" ? "TERRORIST" : "CT";
            }
            continue;
        }

        if (data.includes('World triggered "Round_End"')) {
            if (winningSide && firstTeamSide && secondTeamSide) {
                rounds.push({
                    roundNumber,
                    firstTeamStats: buildTeamRoundStats(
                        firstTeamName,
                        firstTeamSide === winningSide,
                        firstTeamSide,
                        firstTeamPlayers,
                        roundAccumulators
                    ),
                    secondTeamStats: buildTeamRoundStats(
                        secondTeamName,
                        secondTeamSide === winningSide,
                        secondTeamSide,
                        secondTeamPlayers,
                        roundAccumulators
                    ),
                });
            }
            roundAccumulators = null;
        }
    }

    return rounds;
}

function buildTeamRoundStats(
    teamName: string,
    hasWon: boolean,
    side: Side,
    players: PlayerBasicInfo[],
    accumulators: Map<string, PlayerStatsAccumulator>
): TeamRoundStats {
    return {
        name: teamName,
        hasWon,
        side,
        players: players.map(player => {
            const stats = accumulators.get(player.name)!;
            return {
                name: player.name,
                kills: stats.kills,
                deaths: stats.deaths,
                kdDiff: stats.kills - stats.deaths,
                damage: stats.totalDamage,
                headshotPercentage: stats.kills > 0 ? Math.round((stats.headshotKills / stats.kills) * 100) : 0,
            };
        }),
    };
}