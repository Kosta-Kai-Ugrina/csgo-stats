import "server-only";

import { Team } from "../types";
import { parsePlayersFromBothTeams, parseTeamNames } from "@/shared/match-data-file-parser";

export function getTeamRosters(): [Team, Team] {
    const [firstTeamName, secondTeamName] = parseTeamNames();
    const [firstTeamPlayers, secondTeamPlayers] = parsePlayersFromBothTeams();

    return [
        { name: firstTeamName, players: firstTeamPlayers },
        { name: secondTeamName, players: secondTeamPlayers },
    ];
}