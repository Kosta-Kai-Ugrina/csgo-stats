import "server-only";

import { parseMatchStatsPerRound } from "./matchStatsParser";
import { PlayerStats, RoundStats, TeamMatchStats } from "../types";
import { fetchPlayerCountries } from "@/shared/player-country";

export async function getMatchStatsPerRound(): Promise<RoundStats[]> {
    const rounds = parseMatchStatsPerRound();
    if (rounds.length === 0) return rounds;

    const allPlayers = rounds[0].firstTeamStats.players.concat(rounds[0].secondTeamStats.players);
    const steamIds = allPlayers.map(p => p.steamId64);
    const countryMap = await fetchPlayerCountries(steamIds);

    return rounds.map(round => ({
        ...round,
        firstTeamStats: {
            ...round.firstTeamStats,
            players: round.firstTeamStats.players.map(p => ({
                ...p,
                countryCode: countryMap.get(p.steamId64) ?? null,
            })),
        },
        secondTeamStats: {
            ...round.secondTeamStats,
            players: round.secondTeamStats.players.map(p => ({
                ...p,
                countryCode: countryMap.get(p.steamId64) ?? null,
            })),
        },
    }));
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

interface PlayerAggregator {
    steamId64: string;
    countryCode: string | null;
    kills: number;
    deaths: number;
    damage: number;
    headshotKills: number;
}

function aggregatePlayerStats(roundsPlayers: PlayerStats[][]): PlayerStats[] {
    const playerMap = new Map<string, PlayerAggregator>();

    for (const players of roundsPlayers) {
        for (const player of players) {
            const existing = playerMap.get(player.name) ?? {
                steamId64: player.steamId64,
                countryCode: player.countryCode,
                kills: 0,
                deaths: 0,
                damage: 0,
                headshotKills: 0,
            };
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
        steamId64: stats.steamId64,
        countryCode: stats.countryCode,
        kills: stats.kills,
        deaths: stats.deaths,
        kdDiff: stats.kills - stats.deaths,
        damage: totalRounds > 0 ? Math.round(stats.damage / totalRounds) : 0,
        headshotPercentage: stats.kills > 0 ? Math.round((stats.headshotKills / stats.kills) * 100) : 0,
    }));
}
