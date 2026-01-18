"use client";

import { FC, HTMLAttributes, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { PlayerStats, RoundStats, TeamMatchStats } from "../types";
import { FlexColumn, FlexRow } from "@/shared/components/layout";
import MatchStatsTable from "./MatchStatsTable";

type Props = {
  roundStats: RoundStats[];
  fullMatchStats: [TeamMatchStats, TeamMatchStats];
} & HTMLAttributes<HTMLDivElement>;

const MatchStatsPanel: FC<Props> = ({ fullMatchStats, roundStats, className, ...divProps }) => {
  const [view, setView] = useState<"match" | "round">("match");
  const [selectedRoundIndex, setSelectedRoundIndex] = useState(0);
  const [firstTeamMatchStats, secondTeamMatchStats] = fullMatchStats;

  const currentRound = roundStats[selectedRoundIndex];

  const isRoundView = view === "round";

  return (
    <FlexColumn
      className={twMerge("text-white text-sm border-[0.5px] border-white/10 px-4 py-2 rounded-sm", className)}
      {...divProps}
    >
      <FlexRow className="w-full justify-between items-center mb-2">
        <h2 className="text-white text-lg font-bold">
          {isRoundView ? `Round Breakdown - Round ${currentRound.roundNumber}` : "Full Match"}
        </h2>

        <FlexRow className="bg-white/5 rounded-sm p-1 gap-1">
          <button
            onClick={() => setView("match")}
            className={twMerge(
              "px-3 py-1 text-xs font-medium rounded-sm transition-colors",
              !isRoundView ? "bg-white/10 text-white" : "text-white/60 hover:text-white"
            )}
          >
            Full Match
          </button>
          <button
            onClick={() => setView("round")}
            className={twMerge(
              "px-3 py-1 text-xs font-medium rounded-sm transition-colors",
              isRoundView ? "bg-white/10 text-white" : "text-white/60 hover:text-white"
            )}
          >
            Round Breakdown
          </button>
        </FlexRow>
      </FlexRow>

      {isRoundView ? (
        <>
          <FlexRow className="w-full flex-col md:flex-row justify-between gap-4">
            <MatchStatsTable teamStats={currentRound.firstTeamStats} damageLabel="DMG" />
            <MatchStatsTable teamStats={currentRound.secondTeamStats} damageLabel="DMG" />
          </FlexRow>

          <FlexRow className="w-full justify-end gap-2 mt-2">
            <button
              disabled={selectedRoundIndex === 0}
              onClick={() => setSelectedRoundIndex(selectedRoundIndex - 1)}
              className="text-white/60 text-center bg-white/5 h-6 w-6 text-xs font-medium hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 transition-colors rounded-sm p-1"
            >
              &lt;
            </button>
            <span className="text-white/60 text-xs self-center">
              {selectedRoundIndex + 1} / {roundStats.length}
            </span>
            <button
              disabled={selectedRoundIndex === roundStats.length - 1}
              onClick={() => setSelectedRoundIndex(selectedRoundIndex + 1)}
              className="text-white/60 text-center bg-white/5 h-6 w-6 text-xs font-medium hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 transition-colors rounded-sm p-1"
            >
              &gt;
            </button>
          </FlexRow>
        </>
      ) : (
        <FlexRow className="w-full flex-col md:flex-row justify-between gap-4">
          <MatchStatsTable teamStats={firstTeamMatchStats} />
          <MatchStatsTable teamStats={secondTeamMatchStats} />
        </FlexRow>
      )}
    </FlexColumn>
  );
};

export default MatchStatsPanel;