export function ensureConfig() {
  const required = [
    { key: 'SPOTIFY_CLIENT_ID', name: 'Spotify Client ID' },
    { key: 'SPOTIFY_CLIENT_SECRET', name: 'Spotify Client Secret' }
  ];

  const missing = required.filter(r => !process.env[r.key]);
  if (missing.length) {
    const names = missing.map(m => m.name).join(', ');
    throw new Error(`Missing required environment variables: ${names}. Add them to .env.local`);
  }

  return {
    spotifyClientId: process.env.SPOTIFY_CLIENT_ID!,
    spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET!
  };
}

export function tryEnsureConfig() {
  try {
    return ensureConfig();
  } catch (e) {
    console.warn('Config validation warning:', (e as Error).message);
    return null;
  }
}
