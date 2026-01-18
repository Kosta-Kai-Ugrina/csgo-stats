import "server-only";

import { parsePlayersFromTeam, parseTeamNameForTeam } from "@/shared/match-data-file-parser";
import { Team } from "@/shared/model";
import { parseMatchStatsForPlayers } from "./matchStatsParser";
import { TeamMatchStats } from "../types";

export function parseMatchStats(team: Team): TeamMatchStats {
    const players = parsePlayersFromTeam(team);
    const matchStats = parseMatchStatsForPlayers(players);
    const teamName = parseTeamNameForTeam(team);

    return {
        name: teamName,
        players: matchStats,
    };
}
