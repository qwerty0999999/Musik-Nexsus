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

    // YouTube Stream Logic (use play-dl with fallbacks)
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      // Try direct stream first
      let streamInfo: any = null;
      try {
        streamInfo = await play.stream(url);
      } catch (err) {
        // fallback to video_info + stream_from_info for older play-dl APIs
        const videoInfo = await play.video_info(url);
        if (typeof play.stream_from_info === 'function') {
          streamInfo = await play.stream_from_info(videoInfo, {
            quality: 1,
            discordPlayerCompatibility: true
          });
        } else if (videoInfo && typeof play.stream === 'function') {
          // try to stream by URL as a fallback
          streamInfo = await play.stream(url);
        }
      }

      if (!streamInfo) throw new Error('Could not obtain YouTube stream (play-dl fallback failed)');

      const bodyStream = streamInfo.stream || streamInfo; // some APIs return the stream object directly

      return new Response(bodyStream as any, {
        headers: {
          'Content-Type': streamInfo.type || 'audio/mpeg',
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          'Transfer-Encoding': 'chunked',
        }
      });
    }

    return new Response(JSON.stringify({ error: 'Unsupported stream source' }), { status: 400 });
  } catch (error: any) {
    console.error('Critical Stream Error:', error);

    let errorMessage = error?.message ?? 'Unknown error';
    if (String(errorMessage).includes('429')) errorMessage = 'Rate Limit (429). Server IP blocked by YouTube.';

    return new Response(JSON.stringify({
      error: 'Failed to stream audio',
      message: errorMessage
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
