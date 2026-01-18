const STEAM_ID_64_BASE = BigInt(76561197960265728);

export function steamIdToSteamId64(steamId: string): string {
    const match = steamId.match(/^STEAM_\d:(\d):(\d+)$/);
    if (!match) {
        throw new Error(`Invalid Steam ID format: ${steamId}`);
    }

    const y = BigInt(match[1]);
    const z = BigInt(match[2]);
    const steamId64 = z * BigInt(2) + STEAM_ID_64_BASE + y;

    return steamId64.toString();
}
