import "server-only";

import { parseMatchStatsPerRound } from "./matchStatsParser";
import { PlayerStats, RoundStats, TeamMatchStats } from "../types";

export function getMatchStatsPerRound(): RoundStats[] {
    return parseMatchStatsPerRound();
}


export function aggregateRoundStats(rounds: RoundStats[]): [TeamMatchStats, TeamMatchStats] {
    if (rounds.length === 0) {
        return [{ name: "", players: [] }, { name: "", players: [] }];
    }

    const firstTeamName = rounds[0].firstTeamStats.name;
    const secondTeamName = rounds[0].secondTeamStats.name;

    return [
        { name: firstTeamName, players: aggregatePlayerStats(rounds.map(r => r.firstTeamStats.players)) },
        { name: secondTeamName, players: aggregatePlayerStats(rounds.map(r => r.secondTeamStats.players)) },
    ];
}

function aggregatePlayerStats(roundsPlayers: PlayerStats[][]): PlayerStats[] {
    const playerMap = new Map<string, { kills: number; deaths: number; damage: number; headshotKills: number }>();

    for (const players of roundsPlayers) {
        for (const player of players) {
            const existing = playerMap.get(player.name) ?? { kills: 0, deaths: 0, damage: 0, headshotKills: 0 };
            existing.kills += player.kills;
            existing.deaths += player.deaths;
            existing.damage += player.damage;
            existing.headshotKills += player.kills > 0 && player.headshotPercentage > 0
                ? Math.round((player.headshotPercentage / 100) * player.kills)
                : 0;
            playerMap.set(player.name, existing);
        }
    }

    const totalRounds = roundsPlayers.length;
    return Array.from(playerMap.entries()).map(([name, stats]) => ({
        name,
        kills: stats.kills,
        deaths: stats.deaths,
        kdDiff: stats.kills - stats.deaths,
        damage: totalRounds > 0 ? Math.round(stats.damage / totalRounds) : 0,
        headshotPercentage: stats.kills > 0 ? Math.round((stats.headshotKills / stats.kills) * 100) : 0,
    }));
}
