import { NextResponse } from 'next/server';
import play from 'play-dl';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const videoId = searchParams.get('v');

    if (!videoId) {
        return NextResponse.json({ error: 'Video ID parameter "v" is required' }, { status: 400 });
    }

    try {
        // --- LOGIKA ANTI-BRUTAL ---
        const delay = Math.floor(Math.random() * (2000 - 1000 + 1) + 1000);
        await new Promise(resolve => setTimeout(resolve, delay));

        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

        // Konfigurasi play-dl dengan User Agent yang terlihat seperti browser asli
        // Ini sangat penting di server cloud (Vercel)
        if (process.env.YOUTUBE_COOKIE) {
            await play.setToken({
                youtube: {
                    cookie: process.env.YOUTUBE_COOKIE
                }
            });
        }

        // Ambil info video
        const videoInfo = await play.video_info(videoUrl);
        
        // Ambil stream dengan format audio saja untuk kecepatan
        const stream = await play.stream_from_info(videoInfo, {
            quality: 1, // Medium quality
            seek: 0
        }) as any;

        if (!stream || !stream.url) {
            throw new Error('Stream URL not found after heavy check');
        }

        return NextResponse.json({ 
            url: stream.url,
            expiresIn: 3600 
        });
    } catch (error: any) {
        console.error('SERVER-SIDE STREAM ERROR:', error);
        
        // Cek jika error karena bot detection
        if (error.message.includes('429') || error.message.includes('Too Many Requests')) {
            return NextResponse.json({ 
                error: 'YouTube memblokir akses streaming. Coba gunakan lagu lain atau tunggu beberapa saat.',
                code: 'RATE_LIMIT'
            }, { status: 429 });
        }

        if (error.message.includes('Sign in')) {
            return NextResponse.json({ 
                error: 'Lagu ini memerlukan login YouTube (konten terbatas).',
                code: 'AGE_RESTRICTED'
            }, { status: 403 });
        }

        return NextResponse.json({ 
            error: 'Gagal mengambil aliran suara dari YouTube.',
            message: error.message
        }, { status: 500 });
    }
}
