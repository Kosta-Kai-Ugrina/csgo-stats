import "server-only";

import { Team } from "@/shared/model";
import { Team as TeamType } from "../types";
import { parsePlayersFromTeam, parseTeamNameForTeam } from "@/shared/match-data-file-parser";

export function getTeamRoster(team: Team): TeamType {
    const teamName = parseTeamNameForTeam(team);
    const players = parsePlayersFromTeam(team);

    return {
        name: teamName,
        players: players,
    }
};