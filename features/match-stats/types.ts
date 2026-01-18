import { PlayerBasicInfo, Side } from "@/shared/model";

export interface PlayerStats extends PlayerBasicInfo {
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
