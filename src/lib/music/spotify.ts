type Track = {
  id: string | null;
  title: string;
  artist: string;
  thumbnail: string;
  duration: string | null;
  url: string | null;
  source?: string;
  album?: string | null;
  explicit?: boolean;
};

let spotifyToken: string | null = null;
let spotifyTokenExpiry = 0;

async function getToken(): Promise<string | null> {
  const now = Date.now();
  if (spotifyToken && spotifyTokenExpiry > now) return spotifyToken;

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!clientId || !clientSecret) return null;

  const resp = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  });

  if (!resp.ok) {
    const txt = await resp.text();
    throw new Error(`Spotify token request failed: ${txt}`);
  }

  const data = await resp.json();
  spotifyToken = data.access_token;
  spotifyTokenExpiry = now + (data.expires_in ? data.expires_in * 1000 : 3500 * 1000);
  return spotifyToken;
}

function formatDuration(ms: number | null | undefined) {
  if (!ms && ms !== 0) return null;
  const seconds = Math.floor((ms || 0) / 1000);
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${String(secs).padStart(2, '0')}`;
}

export async function searchSpotify(query: string, limit = 12): Promise<Track[]> {
  const token = await getToken();
  if (!token) return [];

  const resp = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=${limit}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!resp.ok) {
    const txt = await resp.text();
    throw new Error(`Spotify search failed: ${txt}`);
  }

  const json = await resp.json();
  const items = json.tracks?.items || [];
  return items.map((t: any) => ({
    id: t.id || null,
    title: t.name || '',
    artist: (t.artists || []).map((a: any) => a.name).join(', '),
    thumbnail: t.album?.images?.[0]?.url || '',
    duration: formatDuration(t.duration_ms),
    url: t.preview_url || t.external_urls?.spotify || null,
    source: 'spotify',
    album: t.album?.name ?? null,
    explicit: !!t.explicit
  }));
}

export type { Track };
