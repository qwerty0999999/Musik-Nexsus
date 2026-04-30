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
    const stream = await play.stream(url);
    
    // Return the stream as a Response
    // Note: Vercel has a 10s timeout for hobby tier.
    // For long audio, you might need a different approach, but this is the direct migration.
    return new Response(stream.stream as any, {
      headers: {
        'Content-Type': 'audio/mpeg',
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
