import Image from "next/image";
import { TeamRoster as TeamRosterType } from "../types";
import { FC, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { getFlagPath } from "@/shared/player-country";

type Props = {
  teamInfo: TeamRosterType;
} & HTMLAttributes<HTMLDivElement>;

const TeamRoster: FC<Props> = ({ teamInfo, className, ...divProps }) => {
  return (
    <div className={twMerge("", className)} {...divProps}>
      <h2 className="text-white text-sm font-bold mb-2 flex items-center gap-2">
        <Image
          src={`/team-logos/${teamInfo.name}.png`}
          alt={teamInfo.name}
          width={20}
          height={20}
          className="object-contain"
        />
        {teamInfo.name}
      </h2>
      <div className="flex gap-2">
        {teamInfo.players.map((player) => {
          const flagPath = getFlagPath(player.countryCode);
          return (
            <div key={player.name} className="flex flex-col items-center text-center group cursor-pointer p-2 rounded-xs bg-white/5 hover:bg-white/20 transition-colors duration-300">

              <div className="flex items-center space-x-1 text-white font-medium">
                <span className="text-xs">{player.name}</span>
              </div>

              <div className="w-12 h-12 mb-1 relative">
                <Image
                  src={`/player-img/${player.name}.png`}
                  alt={player.name}
                  fill
                  className="rounded-full object-cover"
                />
                {flagPath && (
                  <Image
                    src={flagPath}
                    alt={player.countryCode ?? ""}
                    width={16}
                    height={12}
                    className="absolute bottom-0 right-0"
                  />
                )}
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeamRoster;
