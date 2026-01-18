"use client";

import React, { FC, HTMLAttributes, useState } from 'react'
import { RoundStats } from '../types';
import { twMerge } from 'tailwind-merge';
import MatchStatsTable from './MatchStatsTable';
import { FlexColumn, FlexRow } from '@/shared/components/layout';

type Props = {
  roundStats: RoundStats[];
} & HTMLAttributes<HTMLDivElement>;

const RoundStatsList: FC<Props> = ({ roundStats, className, ...tableProps }) => {
  const [selectedRoundNumber, setSelectedRoundNumber] = useState<number>(0);
  const { firstTeamStats, secondTeamStats, roundNumber } = roundStats[selectedRoundNumber];


  return (
    <FlexColumn className={twMerge("text-white text-sm border-collapse border-[0.5px] border-white/10 px-4 py-2 rounded-sm", className)} {...tableProps}>
      <h2 className="text-white text-lg font-bold">Stats Per Round</h2>
      <span className="text-white/60 text-xs font-medium">Round {roundNumber}</span>

      <FlexRow className="w-full justify-between">
        <MatchStatsTable teamStats={firstTeamStats} />
        <MatchStatsTable teamStats={secondTeamStats} />
      </FlexRow>

      <FlexRow>
        <button onClick={() => setSelectedRoundNumber(selectedRoundNumber - 1)}>Previous Round</button>
        <button onClick={() => setSelectedRoundNumber(selectedRoundNumber + 1)}>Next Round</button>
      </FlexRow>
    </FlexColumn>
  )
}

export default RoundStatsList