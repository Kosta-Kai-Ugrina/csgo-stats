import { Side } from "../model";
import { parseHardcodedFileToObjectList } from "./parseHardcodedFileToObjectList";

export function getSideTagsForBothTeams(): [Side, Side] {
  const dataRaw = parseHardcodedFileToObjectList();
  const teamSides = new Map<string, Side>();

  for (const event of dataRaw) {
    const teamMatch = event.data.match(/^Team playing "([^"]+)": (.+)/);
    if (teamMatch) {
      const side = teamMatch[1] as Side;
      const teamName = teamMatch[2].trim();

      if (!teamSides.has(teamName)) {
        teamSides.set(teamName, side);
        if (teamSides.size === 2) {
          break;
        }
      }
    }
  }

  if (teamSides.size < 2) {
    throw new Error("Could not determine sides for both teams");
  }

  const sides = Array.from(teamSides.values());
  return [sides[0], sides[1]];
}
