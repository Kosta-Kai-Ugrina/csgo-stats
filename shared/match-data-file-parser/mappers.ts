import { Team } from "../model";
import { parseHardcodedFileToObjectList } from "./parseHardcodedFileToObjectList";

export function teamToLogFormatAccordingToFirstRound(team: Team): "CT" | "TERRORIST" {
  const dataRaw = parseHardcodedFileToObjectList();

  const firstTeamName = getFirstTeamName(dataRaw);
  const secondTeamName = getSecondTeamName(dataRaw);
  const targetTeamName = team === "first" ? firstTeamName : secondTeamName;

  for (const event of dataRaw) {
    const teamMatch = event.data.match(/^Team playing "([^"]+)": (.+)/);
    if (teamMatch) {
      const side = teamMatch[1] as "CT" | "TERRORIST";
      const teamName = teamMatch[2].trim();

      if (teamName === targetTeamName) {
        return side;
      }
    }
  }

  throw new Error(`Could not determine log format for team: ${team}`);
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
