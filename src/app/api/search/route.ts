import { NextResponse } from 'next/server';
import { searchSpotify } from '@/lib/music/spotify';
import { searchYouTube } from '@/lib/music/youtube';
import { ensureConfig, tryEnsureConfig } from '@/lib/config';
import { checkRateLimit } from '@/lib/rateLimiter';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Query is required' }, { status: 400 });
  }

  try {
    // Validate config (warn in non-critical environments)
    tryEnsureConfig();

    // Rate limit (throw if exceeded)
    try {
      checkRateLimit(request, 40, 60_000);
    } catch (rlErr: any) {
      return NextResponse.json({ error: 'Rate limit exceeded', retryAfter: rlErr.retryAfter ?? 60 }, { status: 429 });
    }
    // Try Spotify first
    const spotifyResults = await searchSpotify(query, 12).catch((e) => {
      console.warn('Spotify helper error:', e);
      return [] as any[];
    });

    // If Spotify returned playable preview URLs, return them directly
    const playable = spotifyResults.filter((t: any) => t.url && typeof t.url === 'string' && t.url.startsWith('http'));
    if (playable.length) return NextResponse.json(playable);

    // Otherwise fallback to YouTube search and merge results (YouTube prioritized)
    const ytResults = await searchYouTube(query, 24).catch((e) => {
      console.warn('YouTube helper error:', e);
      return [] as any[];
    });

    // If we have some YouTube results, return those; otherwise return Spotify candidates
    const finalResults = ytResults.length ? ytResults : spotifyResults;
    return NextResponse.json(finalResults);
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
