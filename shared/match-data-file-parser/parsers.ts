import { PlayerBasicInfo } from "../model";
import { getSideTagsForBothTeams } from "./mappers";
import { parseHardcodedFileToObjectList } from "./parseHardcodedFileToObjectList";

export function parsePlayersFromBothTeams(): [PlayerBasicInfo[], PlayerBasicInfo[]] {
    const dataRaw = parseHardcodedFileToObjectList();
    const [firstTeamSide, secondTeamSide] = getSideTagsForBothTeams();
    const firstTeamPlayers = new Set<string>();
    const secondTeamPlayers = new Set<string>();

    for (const event of dataRaw) {
        const playerMatch = event.data.match(/^"([^<"]+)<[^>]+><[^>]+><([^>]+)>/);
        if (playerMatch) {
            const [, playerName, side] = playerMatch;
            if (side === firstTeamSide && firstTeamPlayers.size < 5) {
                firstTeamPlayers.add(playerName);
            } else if (side === secondTeamSide && secondTeamPlayers.size < 5) {
                secondTeamPlayers.add(playerName);
            }
        }
        if (firstTeamPlayers.size === 5 && secondTeamPlayers.size === 5) {
            break;
        }
    }

    return [
        Array.from(firstTeamPlayers).map(name => ({ name })),
        Array.from(secondTeamPlayers).map(name => ({ name })),
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