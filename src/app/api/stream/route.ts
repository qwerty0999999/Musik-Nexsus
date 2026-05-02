import play from 'play-dl';
import { fetchAudioStream } from '@/lib/music/proxy';
import { ensureConfig, tryEnsureConfig } from '@/lib/config';
import { checkRateLimit } from '@/lib/rateLimiter';

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
    // Basic config validation
    tryEnsureConfig();

    // Rate limit the stream endpoint more strictly
    try {
      checkRateLimit(request, 20, 60_000);
    } catch (rlErr: any) {
      return new Response(JSON.stringify({ error: 'Rate limit exceeded', retryAfter: rlErr.retryAfter ?? 60 }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    // YouTube handling: use play-dl for better stream compatibility
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      let streamInfo: any = null;
      try {
        streamInfo = await play.stream(url);
      } catch (err) {
        try {
          const videoInfo = await play.video_info(url);
          if (typeof play.stream_from_info === 'function') {
            streamInfo = await play.stream_from_info(videoInfo, { quality: 1, discordPlayerCompatibility: true });
          } else if (videoInfo && typeof play.stream === 'function') {
            streamInfo = await play.stream(url);
          }
        } catch (innerErr) {
          console.warn('play-dl fallback failed', innerErr);
        }
      }

      if (!streamInfo) throw new Error('Could not obtain YouTube stream');

      const bodyStream = streamInfo.stream || streamInfo;
      const contentType = streamInfo.type || 'audio/mpeg';

      return new Response(bodyStream as any, {
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          'Transfer-Encoding': 'chunked'
        }
      });
    }

    // Fallback: proxy generic HTTP audio (e.g., Spotify preview_url)
    if (url.startsWith('http://') || url.startsWith('https://')) {
      const { body, contentType, cacheControl } = await fetchAudioStream(url);
      return new Response(body as any, {
        headers: {
          'Content-Type': contentType,
          'Cache-Control': cacheControl
        }
      });
    }

    return new Response(JSON.stringify({ error: 'Unsupported stream source' }), { status: 400 });
  } catch (error: any) {
    console.error('Critical Stream Error:', error);
    let errorMessage = error?.message ?? 'Unknown error';
    if (String(errorMessage).includes('429')) errorMessage = 'Rate Limit (429). Server IP blocked by YouTube.';

    return new Response(JSON.stringify({ error: 'Failed to stream audio', message: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
