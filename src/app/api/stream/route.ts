import play from 'play-dl';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return new Response(JSON.stringify({ error: 'URL is required' }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    console.log('Attempting to stream URL:', url);
    
    // Check if the URL is a valid YouTube URL
    if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
      return new Response(JSON.stringify({ error: 'Only YouTube URLs are supported currently' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const stream = await play.stream(url, {
      discordPlayerCompatibility: true // Often improves compatibility in serverless environments
    });
    
    return new Response(stream.stream as any, {
      headers: {
        'Content-Type': stream.type || 'audio/mpeg',
        'Cache-Control': 'no-cache',
        'Transfer-Encoding': 'chunked',
      }
    });
  } catch (error: any) {
    console.error('Stream error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to stream audio',
      message: error.message || 'Unknown error',
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
