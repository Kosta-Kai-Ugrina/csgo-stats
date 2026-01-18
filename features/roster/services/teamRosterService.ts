import "server-only";

import { TeamRoster } from "../types";
import { parsePlayersFromBothTeams, parseTeamNames } from "@/shared/match-data-file-parser";
import { getPlayersWithCountry } from "@/shared/player-country";

export async function getTeamRosters(): Promise<[TeamRoster, TeamRoster]> {
    const [firstTeamName, secondTeamName] = parseTeamNames();
    const [firstTeamPlayers, secondTeamPlayers] = parsePlayersFromBothTeams();
    const [firstTeamPlayersWithCountry, secondTeamPlayersWithCountry] = await Promise.all([getPlayersWithCountry(firstTeamPlayers), getPlayersWithCountry(secondTeamPlayers)]);

    return [
        { name: firstTeamName, players: firstTeamPlayersWithCountry },
        { name: secondTeamName, players: secondTeamPlayersWithCountry },
    ];
}