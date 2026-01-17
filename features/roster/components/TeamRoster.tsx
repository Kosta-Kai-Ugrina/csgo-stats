import Image from "next/image";
import { Team } from "../types";
import { FC, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  teamInfo: Team;
} & HTMLAttributes<HTMLDivElement>;

const TeamRoster: FC<Props> = ({ teamInfo, className, ...divProps }) => {
  return (
    <div className={twMerge("p-3", className)} {...divProps}>
      <h2 className="text-white text-sm font-bold mb-2">{teamInfo.name} Roster</h2>
      <div className="flex gap-2">
        {teamInfo.players.map((player) => (
          <div key={player.name} className="flex flex-col items-center text-center group cursor-pointer p-2 rounded-xs bg-white/5 hover:bg-white/20 transition-colors duration-300">

            <div className="flex items-center space-x-1 text-white font-medium`">
              <span className="text-xs">{player.name}</span>
            </div>

            <div className="w-12  h-12 mb-1 relative">
              <Image
                src={"/player.png"}
                alt={player.name}
                fill
                className="rounded-full object-cover"
              />
              <span className="text-xs absolute bottom-0 right-0 text-white">US</span>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamRoster;
