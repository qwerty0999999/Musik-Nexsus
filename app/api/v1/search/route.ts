import { NextResponse } from 'next/server';
import { getInitializedYTMusic } from '@/lib/ytmusic';

// Cache sederhana di memori
const searchCache = new Map<string, { data: any, timestamp: number }>();
const CACHE_DURATION = 1000 * 60 * 5; // 5 menit

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
        return NextResponse.json({ error: 'Query parameter "q" is required' }, { status: 400 });
    }

    // Cek cache
    const cached = searchCache.get(query);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return NextResponse.json({ data: cached.data, fromCache: true });
    }

    try {
        const yt = await getInitializedYTMusic();
        const results = await yt.searchSongs(query);

        const formattedSongs = results.map((song) => ({
            id: song.videoId,
            title: song.name,
            artist: song.artist.name,
            cover: song.thumbnails[song.thumbnails.length - 1]?.url || '/file.svg',
            duration: song.duration,
            url: `https://www.youtube.com/watch?v=${song.videoId}`,
            source: 'youtube'
        }));

        // Simpan ke cache
        searchCache.set(query, { data: formattedSongs, timestamp: Date.now() });

        return NextResponse.json({ data: formattedSongs });
    } catch (error: any) {
        console.error('YTMusic Search Error:', error.message);
        
        if (error.message?.includes('429')) {
            return NextResponse.json({ 
                error: 'YouTube sedang membatasi permintaan. Silakan gunakan lagu lain atau tunggu beberapa saat.',
                isRateLimited: true 
            }, { status: 429 });
        }
        
        return NextResponse.json({ error: 'Gagal mengambil lagu' }, { status: 500 });
    }
}
