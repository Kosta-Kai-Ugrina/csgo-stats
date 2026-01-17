import "server-only";

import { Side } from "@/shared/model";
import { Team } from "../types";
import { parsePlayersFromSide, parseTeamNameForSide } from "@/shared/match-data-file-parser";

export function getTeamRoster(side: Side): Team {
    const teamName = parseTeamNameForSide(side);
    const players = parsePlayersFromSide(side);

    return {
        name: teamName,
        players: players,
    }
};

