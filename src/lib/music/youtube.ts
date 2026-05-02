import YTMusic from 'ytmusic-api';

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

function formatDuration(value: any) {
  if (!value) return null;
  if (typeof value === 'string') return value;
  if (typeof value === 'number') {
    const seconds = value > 1000 ? Math.floor(value / 1000) : Math.floor(value);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
  }
  return null;
}

export async function searchYouTube(query: string, limit = 12): Promise<Track[]> {
  const ytmusic = new YTMusic();
  if (typeof ytmusic.initialize === 'function') await ytmusic.initialize();

  let results: any[] = [];
  if (typeof (ytmusic as any).search === 'function') {
    try {
      const r = await (ytmusic as any).search(query, 'songs');
      results = Array.isArray(r) ? r : r?.songs ?? r?.results ?? [];
    } catch (e) {
      // ignore
    }
  }

  if (!results.length && typeof (ytmusic as any).searchSongs === 'function') {
    results = await (ytmusic as any).searchSongs(query);
  }

  if (!results.length && typeof (ytmusic as any).searchAll === 'function') {
    const r = await (ytmusic as any).searchAll(query);
    results = r?.songs ?? r?.results ?? [];
  }

  return (results || []).slice(0, limit).map((song: any) => {
    const videoId = song.videoId || song.id || song.video_id || song.youtube_id || null;
    const title = song.name || song.title || song.song || '';

    let artist = 'Unknown';
    if (song.artist) artist = typeof song.artist === 'string' ? song.artist : song.artist.name ?? artist;
    else if (Array.isArray(song.artists)) artist = song.artists.map((a: any) => a.name || a).join(', ');

    const thumbnails = song.thumbnails || song.thumbnail || [];
    const thumbnail = Array.isArray(thumbnails) && thumbnails.length
      ? thumbnails[thumbnails.length - 1]?.url || thumbnails[thumbnails.length - 1]?.url
      : (thumbnails?.url || '');

    const durationRaw = song.duration ?? song.length ?? song.durationMs ?? song.duration_seconds ?? null;
    const duration = formatDuration(durationRaw);

    const url = videoId ? `https://www.youtube.com/watch?v=${videoId}` : song.url || null;

    return {
      id: videoId,
      title,
      artist,
      thumbnail,
      duration,
      url,
      album: song.album?.name ?? song.album ?? null,
      explicit: !!song.explicit,
      source: 'youtube'
    };
  });
}

export type { Track };
