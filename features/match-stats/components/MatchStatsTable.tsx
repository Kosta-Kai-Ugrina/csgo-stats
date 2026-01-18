import Image from "next/image";
import { FC, TableHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { PlayerStats } from "../types";

type TeamStats = {
  name: string;
  players: PlayerStats[];
};

type Props = {
  teamStats: TeamStats;
} & TableHTMLAttributes<HTMLTableElement>;

const MatchStatsTable: FC<Props> = ({ teamStats, className, ...tableProps }) => {
  return (
    <table
      className={twMerge("text-white text-sm border-collapse", className)}
      {...tableProps}
    >
      <thead>
        <tr className="text-white/60 text-xs font-medium">
          <th className="text-left px-2 py-2">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-amber-500 rounded-sm" />
              <span className="font-bold text-white">{teamStats.name}</span>
            </div>
          </th>
          <th className="text-center px-2 py-2 w-10">K</th>
          <th className="text-center px-2 py-2 w-10">D</th>
          <th className="text-center px-2 py-2 w-10">+/-</th>
          <th className="text-center px-2 py-2 w-12">ADR</th>
          <th className="text-center px-2 py-2 w-12">HS%</th>
        </tr>
      </thead>
      <tbody>
        {teamStats.players.map((player, index) => (
          <tr key={player.name} className={index % 2 === 0 ? "bg-white/5" : ""}>
            <td className="px-2 py-1.5">
              <div className="flex items-center gap-1.5">
                <div className="w-1 h-7 bg-amber-500 rounded-sm" />
                <div className="w-8 h-8 relative shrink-0">
                  <Image
                    src="/player.png"
                    alt={player.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="w-4 h-3 bg-white/20 rounded-sm shrink-0" />
                <span className="font-medium truncate max-w-24">{player.name}</span>
              </div>
            </td>
            <td className="text-center px-2 py-1.5">{player.kills}</td>
            <td className="text-center px-2 py-1.5">{player.deaths}</td>
            <td
              className={twMerge(
                "text-center px-2 py-1.5",
                player.kdDiff > 0 && "text-green-500",
                player.kdDiff < 0 && "text-red-500"
              )}
            >
              {player.kdDiff > 0 ? `+${player.kdDiff}` : player.kdDiff}
            </td>
            <td className="text-center px-2 py-1.5">{player.damage}</td>
            <td className="text-center px-2 py-1.5">{player.headshotPercentage}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MatchStatsTable;
