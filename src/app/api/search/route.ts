import { NextResponse } from 'next/server';
import YTMusic from 'ytmusic-api';

// Spotify client credentials caching
let spotifyToken: string | null = null;
let spotifyTokenExpiry = 0;

async function getSpotifyToken() {
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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Query is required' }, { status: 400 });
  }

  try {
    // First attempt: Spotify search (client credentials)
    try {
      const token = await getSpotifyToken();
      if (token) {
        const sresp = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=12`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (sresp.ok) {
          const sjson = await sresp.json();
          const spotifyTracks = (sjson.tracks?.items || []).map((t: any) => ({
            id: t.id,
            title: t.name,
            artist: (t.artists || []).map((a: any) => a.name).join(', '),
            thumbnail: t.album?.images?.[0]?.url || '',
            duration: formatDuration(t.duration_ms),
            url: t.preview_url || t.external_urls?.spotify || null,
            source: 'spotify',
            album: t.album?.name ?? null,
            explicit: !!t.explicit
          }));

          // Prefer Spotify tracks that have preview_url (playable)
          const playable = spotifyTracks.filter((t: any) => t.url && t.url.startsWith('http'));
          if (playable.length) {
            return NextResponse.json(playable);
          }
          // otherwise, keep spotifyTracks as candidate fallback but continue to YouTube search
          if (spotifyTracks.length) {
            results = spotifyTracks.map((s: any) => ({
              id: s.id,
              title: s.title,
              artist: s.artist,
              thumbnail: s.thumbnail,
              duration: s.duration,
              url: s.url,
              album: s.album,
              explicit: s.explicit,
            }));
          }
        }
      }
    } catch (spErr) {
      console.warn('Spotify search failed:', spErr);
    }
    const ytmusic = new YTMusic();
    // initialize may be no-op for some versions; keep for compatibility
    if (typeof ytmusic.initialize === 'function') await ytmusic.initialize();

    // Try to fetch song-only results; different versions expose different helpers
    let results: any[] = [];
    if (typeof (ytmusic as any).search === 'function') {
      // many ytmusic-api versions support search(query, 'songs')
      try {
        const r = await (ytmusic as any).search(query, 'songs');
        // Some versions return { songs: [...] }
        results = Array.isArray(r) ? r : r?.songs ?? r?.results ?? [];
      } catch (e) {
        // fallback below
      }
    }

    if (!results.length && typeof (ytmusic as any).searchSongs === 'function') {
      results = await (ytmusic as any).searchSongs(query);
    }

    // last-resort: generic search
    if (!results.length && typeof (ytmusic as any).searchAll === 'function') {
      const r = await (ytmusic as any).searchAll(query);
      results = r?.songs ?? r?.results ?? [];
    }

    const formattedResults = (results || []).map((song: any) => {
      const videoId = song.videoId || song.id || song.video_id || song.youtube_id;
      const title = song.name || song.title || song.song || '';

      // artist can be an object or an array
      let artist = 'Unknown';
      if (song.artist) artist = typeof song.artist === 'string' ? song.artist : song.artist.name ?? artist;
      else if (Array.isArray(song.artists)) artist = song.artists.map((a: any) => a.name || a).join(', ');

      const thumbnails = song.thumbnails || song.thumbnail || [];
      const thumbnail = Array.isArray(thumbnails) && thumbnails.length
        ? thumbnails[thumbnails.length - 1]?.url || thumbnails[thumbnails.length - 1]?.url
        : (thumbnails?.url || '');

      const durationRaw = song.duration ?? song.length ?? song.durationMs ?? song.duration_seconds ?? null;
      const duration = formatDuration(durationRaw);

      const url = videoId ? `https://www.youtube.com/watch?v=${videoId}` : song.url || '';

      return {
        id: videoId || null,
        title,
        artist,
        thumbnail,
        duration,
        url,
        album: song.album?.name ?? song.album ?? null,
        explicit: !!song.explicit,
      };
    });

    return NextResponse.json(formattedResults);
  } catch (error: any) {
    console.error('Search error:', error);
    return NextResponse.json({ 
      error: 'Failed to search music from YouTube Music',
      message: error?.message ?? String(error)
    }, { status: 500 });
  }
}

function formatDuration(value: any) {
  // Accepts strings like "3:45" or numbers in ms or seconds
  if (!value) return '0:00';

  // If it's already a string like '3:45' or '1:02:30'
  if (typeof value === 'string') {
    // normalize H:MM:SS or M:SS
    const parts = value.split(':').map(p => parseInt(p, 10));
    if (parts.some(isNaN)) return value;
    if (parts.length === 3) {
      const [h, m, s] = parts;
      const totalSeconds = h * 3600 + m * 60 + s;
      return secondsToTime(totalSeconds);
    }
    if (parts.length === 2) {
      const [m, s] = parts;
      return `${m}:${String(s).padStart(2, '0')}`;
    }
    return value;
  }

  // If number
  if (typeof value === 'number') {
    // Heuristic: if value > 1000 assume milliseconds
    const seconds = value > 1000 ? Math.floor(value / 1000) : Math.floor(value);
    return secondsToTime(seconds);
  }

  return '0:00';
}

function secondsToTime(sec: number) {
  const mins = Math.floor(sec / 60);
  const secs = sec % 60;
  return `${mins}:${String(secs).padStart(2, '0')}`;
}
