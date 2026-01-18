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
    <FlexColumn className={twMerge("text-white text-sm", className)} {...tableProps}>

      <FlexRow className="w-full justify-between">
        <MatchStatsTable teamStats={firstTeamStats} />
        <MatchStatsTable teamStats={secondTeamStats} />
      </FlexRow>

      <FlexRow className="w-full justify-end gap-2 mt-2">
        <button className="text-white/60 text-center bg-white/5 h-6 w-6 text-xs font-medium hover:bg-white/10 transition-colors rounded-sm p-1" onClick={() => setSelectedRoundNumber(selectedRoundNumber - 1)}>&lt;</button>
        <button className="text-white/60 text-center bg-white/5 h-6 w-6 text-xs font-medium hover:bg-white/10 transition-colors rounded-sm p-1" onClick={() => setSelectedRoundNumber(selectedRoundNumber + 1)}>&gt;</button>
      </FlexRow>
    </FlexColumn>
  )
}

export default RoundStatsList