import { NextResponse } from 'next/server';
import YTMusic from 'ytmusic-api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Query is required' }, { status: 400 });
  }

  try {
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
