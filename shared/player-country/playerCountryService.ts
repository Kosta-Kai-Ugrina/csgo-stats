import "server-only";

import { PlayerBasicInfo } from "../model";
import { fetchPlayerCountries } from "./steamPlayerCountryFetcher";
import { PlayerCountryInfo } from "./types";

export async function getPlayersWithCountry(
  players: PlayerBasicInfo[]
): Promise<PlayerCountryInfo[]> {
  const steamIds64 = players.map((p) => p.steamId64);
  const countryMap = await fetchPlayerCountries(steamIds64);

  return players.map((player) => ({
    ...player,
    countryCode: countryMap.get(player.steamId64) ?? null,
  }));
}
