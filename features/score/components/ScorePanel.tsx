import Image from "next/image";
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
      <div className={twMerge("flex-1 flex pr-2 md:pr-8 items-center justify-end gap-2 rounded-r-sm", firstTeamScore.score > secondTeamScore.score ? "bg-green-500/10" : "bg-red-500/10")}>
        <span className="text-sm md:text-lg font-semibold text-white">{firstTeamScore.name}</span>
        <Image
          src={`/team-logos/${firstTeamScore.name}.png`}
          alt={firstTeamScore.name}
          width={32}
          height={32}
          className="object-contain"
        />
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

      <div className={twMerge("flex-1 flex pl-2 md:pl-8 items-center justify-start gap-2 rounded-l-sm", secondTeamScore.score > firstTeamScore.score ? "bg-green-500/10" : "bg-red-500/10")}>
        <Image
          src={`/team-logos/${secondTeamScore.name}.png`}
          alt={secondTeamScore.name}
          width={32}
          height={32}
          className="object-contain"
        />
        <span className="text-sm md:text-lg font-semibold text-white">{secondTeamScore.name}</span>
      </div>
    </div>
  );
}
