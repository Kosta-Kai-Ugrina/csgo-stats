import "server-only";

import { parseHardcodedFileToObjectList, parseTeamNameForTeam } from "@/shared/match-data-file-parser";
import { TeamFinalScore } from "../types";

export function parseFinalScore(): [TeamFinalScore, TeamFinalScore] {
  const events = parseHardcodedFileToObjectList();
  const firstTeamName = parseTeamNameForTeam("first");
  const secondTeamName = parseTeamNameForTeam("second");

  const scoresByTeamName = new Map<string, number>();

  for (let i = events.length - 1; i >= 0; i--) {
    const { data } = events[i];

    const scoreMatch = data.match(/^Team "(CT|TERRORIST)" scored "(\d+)" with "\d+" players$/);
    if (scoreMatch) {
      const side = scoreMatch[1];
      const score = parseInt(scoreMatch[2], 10);

      const teamNameMatch = findTeamNameForSide(events, i, side);
      if (teamNameMatch && !scoresByTeamName.has(teamNameMatch)) {
        scoresByTeamName.set(teamNameMatch, score);
      }
    }

    if (scoresByTeamName.has(firstTeamName) && scoresByTeamName.has(secondTeamName)) {
      break;
    }
  }

  const firstScore = scoresByTeamName.get(firstTeamName);
  const secondScore = scoresByTeamName.get(secondTeamName);

  if (firstScore === undefined || secondScore === undefined) {
    throw new Error("Could not find final score data");
  }

  return [
    { name: firstTeamName, score: firstScore },
    { name: secondTeamName, score: secondScore },
  ];
}

function findTeamNameForSide(events: Array<{ data: string }>, fromIndex: number, side: string): string | null {
  for (let i = fromIndex; i < events.length; i++) {
    const match = events[i].data.match(new RegExp(`^MatchStatus: Team playing "${side}": (.+)$`));
    if (match) return match[1];
  }
  return null;
}