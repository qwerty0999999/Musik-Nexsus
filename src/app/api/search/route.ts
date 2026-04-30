import { NextResponse } from 'next/server';

const JAMENDO_CLIENT_ID = '56d30808'; // Default client ID for testing Jamendo

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Query is required' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://api.jamendo.com/v3.0/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=jsonpretty&limit=12&search=${encodeURIComponent(query)}&include=musicinfo&imagesize=300`
    );
    
    const data = await response.json();

    if (!data.results) {
      return NextResponse.json([]);
    }

    const formattedResults = data.results.map((track: any) => ({
      id: track.id,
      title: track.name,
      artist: track.artist_name,
      thumbnail: track.image || '',
      duration: formatDuration(track.duration),
      url: track.audio // In Jamendo, this is the direct MP3 link
    }));

    return NextResponse.json(formattedResults);
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Failed to search music from Jamendo' }, { status: 500 });
  }
}

function formatDuration(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
