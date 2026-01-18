import "server-only";

interface SteamPlayerSummary {
  steamid: string;
  loccountrycode?: string;
}

interface SteamApiResponse {
  response: {
    players: SteamPlayerSummary[];
  };
}

export async function fetchPlayerCountries(
  steamIds64: string[]
): Promise<Map<string, string | null>> {
  const apiKey = process.env.STEAM_API_KEY;
  if (!apiKey) {
    throw new Error("STEAM_API_KEY environment variable is not set");
  }

  const steamIdsParam = steamIds64.join(",");
  const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamIdsParam}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Steam API request failed: ${response.status}`);
  }

  const data: SteamApiResponse = await response.json();
  const result = new Map<string, string | null>();

  for (const steamId64 of steamIds64) {
    const player = data.response.players.find((p) => p.steamid === steamId64);
    result.set(steamId64, player?.loccountrycode ?? null);
  }

  return result;
}
