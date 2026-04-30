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
    await ytmusic.initialize();
    
    // Search for songs specifically
    const results = await ytmusic.searchSongs(query);

    const formattedResults = results.map(song => ({
      id: song.videoId,
      title: song.name,
      artist: song.artist.name,
      thumbnail: song.thumbnails[song.thumbnails.length - 1]?.url || '',
      duration: formatDuration(song.duration || 0),
      url: `https://www.youtube.com/watch?v=${song.videoId}`
    }));

    return NextResponse.json(formattedResults);
  } catch (error: any) {
    console.error('Search error:', error);
    return NextResponse.json({ 
      error: 'Failed to search music from YouTube Music',
      message: error.message 
    }, { status: 500 });
  }
}

function formatDuration(ms: number) {
  const seconds = Math.floor(ms / 1000);
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
