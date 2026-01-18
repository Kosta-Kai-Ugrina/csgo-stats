import "server-only";

import { TeamFinalScore } from "../types";
import { parseFinalScore } from "./scoreParser";

export function getFinalScore(): [TeamFinalScore, TeamFinalScore] {
    return parseFinalScore();
}