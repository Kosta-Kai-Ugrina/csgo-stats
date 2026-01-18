import { Side } from "@/shared/model";
import { PlayerCountryInfo } from "@/shared/player-country";

export interface PlayerStats extends PlayerCountryInfo {
    kills: number;
    deaths: number;
    kdDiff: number;
    damage: number;
    headshotPercentage: number;
}

export interface TeamMatchStats {
    name: string;
    players: PlayerStats[];
}

export interface TeamRoundStats {
    name: string;
    hasWon: boolean;
    side: Side;
    players: PlayerStats[];
}

export interface RoundStats {
    roundNumber: number;
    firstTeamStats: TeamRoundStats;
    secondTeamStats: TeamRoundStats;
}
