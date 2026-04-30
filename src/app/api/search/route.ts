import { NextResponse } from 'next/server';
import play from 'play-dl';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Query is required' }, { status: 400 });
  }

  try {
    const results = await play.search(query, {
      limit: 10,
      source: { youtube: 'video' }
    });

    const formattedResults = results.map(video => ({
      id: video.id,
      title: video.title,
      artist: video.channel?.name || 'Unknown Artist',
      thumbnail: video.thumbnails[0]?.url || '',
      duration: video.durationRaw,
      url: video.url
    }));

    return NextResponse.json(formattedResults);
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Failed to search music' }, { status: 500 });
  }
}
