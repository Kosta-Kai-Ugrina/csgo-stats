import "server-only";

import * as fs from "fs";
import { MatchEventRaw } from "./types";

export function parseHardcodedFileToObjectList(excludeMatchesPriorToLast = true): MatchEventRaw[] {
    const fileContent = fs.readFileSync("./public/NAVIvsVitaGF-Nuke.txt", "utf8");
    const lines = fileContent.split("\n");
    let startIndex = excludeMatchesPriorToLast ? findStartIndexOfLastMatchStart(lines) : 0;

    return lines
        .slice(startIndex)
        .filter((line: string) => line.trim().length > 0)
        .map(parseLineToMatchEvent);
}

function findStartIndexOfLastMatchStart(lines: string[]): number {
    for (let i = lines.length - 1; i >= 0; i--) {
        if (lines[i].includes('World triggered "Match_Start"')) {
            return i;
        }
    }
    return 0;
}

function parseLineToMatchEvent(line: string): MatchEventRaw {
    const match = line.match(/^(\d{2}\/\d{2}\/\d{4}) - (\d{2}:\d{2}:\d{2}): ([\s\S]*)/);
    if (!match) {
        throw new Error(`Failed to parse line: ${line}`);
    }

    const [, dateStr, timeStr, data] = match;
    const [month, day, year] = dateStr.split("/").map(Number);
    const [hours, minutes, seconds] = timeStr.split(":").map(Number);
    const timestamp = new Date(year, month - 1, day, hours, minutes, seconds);

    return {
        timestamp: timestamp,
        data: data.trim(),
    };
}