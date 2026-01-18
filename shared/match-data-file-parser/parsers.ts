import { PlayerBasicInfo, Team } from "../model";
import { teamToLogFormatAccordingToFirstRound } from "./mappers";
import { parseHardcodedFileToObjectList } from "./parseHardcodedFileToObjectList";

export function parsePlayersFromTeam(team: Team): PlayerBasicInfo[] {
    const dataRaw = parseHardcodedFileToObjectList();
    const sideTagInFirstRound = teamToLogFormatAccordingToFirstRound(team);
    const playerNames = new Set<string>();

    for (const event of dataRaw) {
        const playerMatch = event.data.match(/^"([^<"]+)<[^>]+><[^>]+><([^>]+)>/);
        if (playerMatch && playerMatch[2] === sideTagInFirstRound) {
            playerNames.add(playerMatch[1]);
        }
        // HACK
        if (playerNames.size === 5) {
            break;
        }
    }

    return Array.from(playerNames).map(name => ({ name }));
}


export function parseTeamNameForTeam(team: Team): string {
    const dataRaw = parseHardcodedFileToObjectList();
    const firstTeamName = getFirstTeamName(dataRaw);
    const secondTeamName = getSecondTeamName(dataRaw);

    if (team === "first") {
        return firstTeamName;
    }
    return secondTeamName;
}

function getFirstTeamName(dataRaw: Array<{ data: string }>): string {
    for (const event of dataRaw) {
        const teamMatch = event.data.match(/^Team playing "([^"]+)": (.+)/);
        if (teamMatch) {
            return teamMatch[2].trim();
        }
    }
    throw new Error("Could not find first team name");
}

function getSecondTeamName(dataRaw: Array<{ data: string }>): string {
    const seenTeams = new Set<string>();
    for (const event of dataRaw) {
        const teamMatch = event.data.match(/^Team playing "([^"]+)": (.+)/);
        if (teamMatch) {
            const teamName = teamMatch[2].trim();
            if (!seenTeams.has(teamName)) {
                seenTeams.add(teamName);
                if (seenTeams.size === 2) {
                    return teamName;
                }
            }
        }
    }
    throw new Error("Could not find second team name");
}