import "server-only";

import { Side } from "@/shared/model";
import { Player } from "../types";
import { parseHardcodedFileToObjectList, sideToLogFormat } from "@/shared/match-data-file-parser";

export function parsePlayersFromSide(side: Side): Player[] {
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