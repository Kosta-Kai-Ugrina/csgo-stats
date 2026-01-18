import { PlayerBasicInfo, Side } from "@/shared/model";

export interface PlayerMatchStats extends PlayerBasicInfo {
    kills: number;
    deaths: number;
    kdDiff: number;
    avgDmgPerRound: number;
    headshotPercentage: number;
}

export interface TeamMatchStats {
    name: string;
    players: PlayerMatchStats[];
}

export interface PlayerRoundStats extends PlayerBasicInfo {
    kills: number;
    deaths: number;
    kdDiff: number;
    avgDmgPerRound: number;
    headshotPercentage: number;
}

export interface TeamRoundStats {
    name: string;
    hasWon: boolean;
    side: Side;
    players: PlayerRoundStats[];
}

export interface RoundStats {
    roundNumber: number;
    firstTeamStats: TeamRoundStats;
    secondTeamStats: TeamRoundStats;
}
