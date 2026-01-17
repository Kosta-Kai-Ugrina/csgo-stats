import { PlayerBasicInfo } from "@/shared/model";

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