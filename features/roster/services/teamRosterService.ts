import "server-only";

import { Side } from "@/shared/model";
import { Team } from "../types";
import { parsePlayersFromSide, parseTeamNameForSide } from "./parserService";

export function getTeamRoster(side: Side): Team {
    const teamName = parseTeamNameForSide(side);
    const players = parsePlayersFromSide(side);

    return {
        name: teamName,
        players: players,
    }
};

