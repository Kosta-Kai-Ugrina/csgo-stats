import "server-only";

import { TeamRoster } from "../types";
import { parsePlayersFromBothTeams, parseTeamNames } from "@/shared/match-data-file-parser";

export function getTeamRosters(): [TeamRoster, TeamRoster] {
    const [firstTeamName, secondTeamName] = parseTeamNames();
    const [firstTeamPlayers, secondTeamPlayers] = parsePlayersFromBothTeams();

    return [
        { name: firstTeamName, players: firstTeamPlayers },
        { name: secondTeamName, players: secondTeamPlayers },
    ];
}