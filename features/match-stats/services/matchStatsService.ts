import "server-only";

import { parsePlayersFromSide, parseTeamNameForSide } from "@/shared/match-data-file-parser";
import { Side } from "@/shared/model";
import { parseMatchStatsForPlayers } from "./parserService";
import { TeamMatchStats } from "../types";

export function parseMatchStats(side: Side): TeamMatchStats {
    const players = parsePlayersFromSide(side);
    const matchStats = parseMatchStatsForPlayers(players);
    const teamName = parseTeamNameForSide(side);

    return {
        name: teamName,
        players: matchStats,
    };
}
