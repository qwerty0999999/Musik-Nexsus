export async function fetchAudioStream(url: string) {
  if (!url || typeof url !== 'string') throw new Error('Invalid URL');
  // Basic scheme and host checks
  if (url.startsWith('data:') || url.startsWith('file:')) throw new Error('Unsupported URL scheme');

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch (e) {
    throw new Error('Malformed URL');
  }

  const hostname = parsed.hostname.toLowerCase();
  // Disallow common local/loopback hostnames
  const blockedHosts = ['localhost', '127.0.0.1', '::1'];
  if (blockedHosts.includes(hostname)) throw new Error('Access to local resources is forbidden');

  // Fetch remote resource with a conservative user-agent header
  const resp = await fetch(url, {
    headers: {
      'User-Agent': 'MusicNexus/1.0 (+https://example.com)'
    }
  });

  if (!resp.ok) {
    const txt = await resp.text().catch(() => '');
    throw new Error(`Remote fetch failed: ${resp.status} ${resp.statusText} ${txt}`);
  }

  const contentType = resp.headers.get('content-type') || 'application/octet-stream';
  const cacheControl = resp.headers.get('cache-control') || 'no-store';

  return { body: resp.body, contentType, cacheControl };
}
