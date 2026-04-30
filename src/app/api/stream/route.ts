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
    console.log('Fetching info for:', url);
    
    // Check if the URL is a valid YouTube URL
    if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
      return new Response(JSON.stringify({ error: 'Only YouTube URLs are supported' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get video info first - this is more stable
    const videoInfo = await play.video_info(url);
    const stream = await play.stream_from_info(videoInfo, {
      quality: 1, // 0 is highest, 1 is medium, 2 is lowest. 1 is usually safer for serverless.
      discordPlayerCompatibility: true
    });
    
    return new Response(stream.stream as any, {
      headers: {
        'Content-Type': stream.type || 'audio/mpeg',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Transfer-Encoding': 'chunked',
      }
    });
  } catch (error: any) {
    console.error('Critical Stream Error:', error);
    
    // Check for specific YouTube errors
    let errorMessage = error.message || 'Unknown error';
    if (errorMessage.includes('sign in')) {
      errorMessage = 'YouTube is blocking this server (Bot detection). Use cookies or a proxy.';
    }

    return new Response(JSON.stringify({ 
      error: 'Failed to stream audio',
      message: errorMessage,
      hint: 'If this continues on Vercel, YouTube might be blocking the IP. Consider a custom backend.'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
