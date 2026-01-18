import "server-only";

import { parsePlayersFromBothTeams, parseTeamNames } from "@/shared/match-data-file-parser";
import { parseMatchStatsForPlayers, parseMatchStatsPerRound } from "./matchStatsParser";
import { RoundStats, TeamMatchStats } from "../types";

export function getMatchStats(): [TeamMatchStats, TeamMatchStats] {
    const [firstTeamName, secondTeamName] = parseTeamNames();
    const [firstTeamPlayers, secondTeamPlayers] = parsePlayersFromBothTeams();

    return [
        { name: firstTeamName, players: parseMatchStatsForPlayers(firstTeamPlayers) },
        { name: secondTeamName, players: parseMatchStatsForPlayers(secondTeamPlayers) },
    ];
}

export function getMatchStatsPerRound(): RoundStats[] {
    return parseMatchStatsPerRound();
}