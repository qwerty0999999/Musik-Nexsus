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
    // If it's a direct MP3 link (like Jamendo), we can just proxy it
    if (url.includes('jamendo.com')) {
      const response = await fetch(url);
      
      if (!response.ok) throw new Error(`Jamendo stream failed: ${response.statusText}`);

      return new Response(response.body, {
        headers: {
          'Content-Type': 'audio/mpeg',
          'Cache-Control': 'public, max-age=31536000',
          'Transfer-Encoding': 'chunked',
        }
      });
    }

    // Fallback logic for YouTube (if still used)
    // ... rest of existing code but simplified
    return new Response(JSON.stringify({ error: 'Unsupported stream source' }), { status: 400 });
  } catch (error: any) {
    console.error('Critical Stream Error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to stream audio',
      message: error.message
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
