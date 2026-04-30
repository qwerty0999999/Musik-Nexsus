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
    // Proxy logic for Jamendo (Legacy/Home page support)
    if (url.includes('jamendo.com')) {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Jamendo stream failed: ${response.statusText}`);
      return new Response(response.body, {
        headers: {
          'Content-Type': 'audio/mpeg',
          'Cache-Control': 'public, max-age=31536000',
        }
      });
    }

    // YouTube Stream Logic
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoInfo = await play.video_info(url);
      const stream = await play.stream_from_info(videoInfo, {
        quality: 1,
        discordPlayerCompatibility: true
      });

      return new Response(stream.stream as any, {
        headers: {
          'Content-Type': stream.type || 'audio/mpeg',
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          'Transfer-Encoding': 'chunked',
        }
      });
    }

    return new Response(JSON.stringify({ error: 'Unsupported stream source' }), { status: 400 });
  } catch (error: any) {
    console.error('Critical Stream Error:', error);
    
    let errorMessage = error.message || 'Unknown error';
    if (errorMessage.includes('429')) errorMessage = 'Rate Limit (429). Server IP blocked by YouTube.';

    return new Response(JSON.stringify({ 
      error: 'Failed to stream audio',
      message: errorMessage
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
