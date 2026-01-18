import "server-only";

import { parsePlayersFromBothTeams, parseTeamNames } from "@/shared/match-data-file-parser";
import { parseMatchStatsForPlayers } from "./matchStatsParser";
import { TeamMatchStats } from "../types";

export function parseMatchStats(): [TeamMatchStats, TeamMatchStats] {
    const [firstTeamName, secondTeamName] = parseTeamNames();
    const [firstTeamPlayers, secondTeamPlayers] = parsePlayersFromBothTeams();

    return [
        { name: firstTeamName, players: parseMatchStatsForPlayers(firstTeamPlayers) },
        { name: secondTeamName, players: parseMatchStatsForPlayers(secondTeamPlayers) },
    ];
}
