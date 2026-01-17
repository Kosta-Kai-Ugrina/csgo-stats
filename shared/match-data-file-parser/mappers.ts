import { Side } from "../model";

export function sideToLogFormat(side: Side): "CT" | "TERRORIST" {
    return side === "counter-terrorist" ? "CT" : "TERRORIST";
}
