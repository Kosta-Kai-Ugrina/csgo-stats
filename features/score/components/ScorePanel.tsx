import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { TeamFinalScore } from "../types";

type Props = {
  firstTeamScore: TeamFinalScore;
  secondTeamScore: TeamFinalScore;
} & HTMLAttributes<HTMLDivElement>;

export async function ScorePanel({ firstTeamScore, secondTeamScore, className, ...divProps }: Props) {

  return (
    <div
      className={twMerge(
        "flex items-stretch gap-2  rounded-lg p-2",
        className
      )}
      {...divProps}
    >
      <div className={twMerge("flex-1 flex items-center justify-center rounded-r-sm", firstTeamScore.score > secondTeamScore.score ? "bg-green-500/20" : "bg-red-500/20")}>
        <span className="text-sm md:text-lg font-semibold text-white">{firstTeamScore.name}</span>
      </div>

      <div className={twMerge("w-10 md:w-16 flex items-center justify-center rounded bg-white/5", firstTeamScore.score > secondTeamScore.score ? "text-green-500" : "text-red-500")}>
        <span className="text-2xl md:text-4xl font-bold">{firstTeamScore.score}</span>
      </div>

      <div className="w-8 md:w-12 flex items-center justify-center rounded bg-white/5">
        <span className="text-xs md:text-sm font-medium text-white">FIN</span>
      </div>

      <div className={twMerge("w-10 md:w-16 flex items-center justify-center rounded-sm bg-white/5", secondTeamScore.score > firstTeamScore.score ? "text-green-500" : "text-red-500")}>
        <span className="text-2xl md:text-4xl font-bold">{secondTeamScore.score}</span>
      </div>

      <div className={twMerge("flex-1 flex items-center justify-center rounded-l-sm", secondTeamScore.score > firstTeamScore.score ? "bg-green-500/20" : "bg-red-500/20")}>
        <span className="text-sm md:text-lg font-semibold text-white">{secondTeamScore.name}</span>
      </div>
    </div>
  );
}
