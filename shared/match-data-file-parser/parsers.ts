import { PlayerBasicInfo } from "../model";
import { getSideTagsForBothTeams } from "./mappers";
import { parseHardcodedFileToObjectList } from "./parseHardcodedFileToObjectList";
import { steamIdToSteamId64 } from "./steamIdConverter";

export function parsePlayersFromBothTeams(): [PlayerBasicInfo[], PlayerBasicInfo[]] {
    const dataRaw = parseHardcodedFileToObjectList();
    const [firstTeamSide, secondTeamSide] = getSideTagsForBothTeams();
    const firstTeamPlayers = new Map<string, string>();
    const secondTeamPlayers = new Map<string, string>();

    for (const event of dataRaw) {
        const playerMatch = event.data.match(/^"([^<"]+)<[^>]+><([^>]+)><([^>]+)>/);
        if (playerMatch) {
            const [, playerName, steamId, side] = playerMatch;
            if (side === firstTeamSide && firstTeamPlayers.size < 5 && !firstTeamPlayers.has(playerName)) {
                firstTeamPlayers.set(playerName, steamIdToSteamId64(steamId));
            } else if (side === secondTeamSide && secondTeamPlayers.size < 5 && !secondTeamPlayers.has(playerName)) {
                secondTeamPlayers.set(playerName, steamIdToSteamId64(steamId));
            }
        }
        if (firstTeamPlayers.size === 5 && secondTeamPlayers.size === 5) {
            break;
        }
    }

    return [
        Array.from(firstTeamPlayers.entries()).map(([name, steamId64]) => ({ name, steamId64 })),
        Array.from(secondTeamPlayers.entries()).map(([name, steamId64]) => ({ name, steamId64 })),
    ];
}

export function parseTeamNames(): [string, string] {
    const dataRaw = parseHardcodedFileToObjectList();
    const teamNames: string[] = [];

    for (const event of dataRaw) {
        const teamMatch = event.data.match(/^Team playing "([^"]+)": (.+)/);
        if (teamMatch) {
            const teamName = teamMatch[2].trim();
            if (!teamNames.includes(teamName)) {
                teamNames.push(teamName);
                if (teamNames.length === 2) {
                    break;
                }
            }
        }
    }

    if (teamNames.length < 2) {
        throw new Error("Could not find both team names");
    }

    return [teamNames[0], teamNames[1]];
}