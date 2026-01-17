import { PlayerBasicInfo, Side } from "../model";
import { sideToLogFormat } from "./mappers";
import { parseHardcodedFileToObjectList } from "./parseHardcodedFileToObjectList";

export function parsePlayersFromSide(side: Side): PlayerBasicInfo[] {
    const dataRaw = parseHardcodedFileToObjectList();
    const sideTag = sideToLogFormat(side);
    const playerNames = new Set<string>();

    for (const event of dataRaw) {
        const playerMatch = event.data.match(/^"([^<"]+)<[^>]+><[^>]+><([^>]+)>/);
        if (playerMatch && playerMatch[2] === sideTag) {
            playerNames.add(playerMatch[1]);
        }
        // HACK
        if (playerNames.size === 5) {
            break;
        }
    }

    return Array.from(playerNames).map(name => ({ name }));
}


export function parseTeamNameForSide(side: Side): string {
    const dataRaw = parseHardcodedFileToObjectList();
    const sideTag = sideToLogFormat(side);

    for (const event of dataRaw) {
        const teamMatch = event.data.match(/^Team playing "([^"]+)": (.+)/);
        if (teamMatch && teamMatch[1] === sideTag) {
            return teamMatch[2].trim();
        }
    }

    throw new Error(`Team name not found for side: ${side}`);
}