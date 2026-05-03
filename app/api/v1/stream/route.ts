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
        // Tambahkan jeda acak agar tidak terlihat seperti bot saat mengambil stream
        const delay = Math.floor(Math.random() * (2000 - 1000 + 1) + 1000);
        await new Promise(resolve => setTimeout(resolve, delay));

        // Validasi ID Video
        if (!play.yt_validate(videoId)) {
             return NextResponse.json({ error: 'Invalid YouTube Video ID' }, { status: 400 });
        }

        // Set token/cookie untuk menghindari deteksi bot
        if (process.env.YOUTUBE_COOKIE) {
            await play.setToken({
                youtube: {
                    cookie: process.env.YOUTUBE_COOKIE
                }
            });
        }

        // Dapatkan stream
        // Kita gunakan quality: 1 (medium) untuk keseimbangan kecepatan dan kualitas
        const streamInfo = await play.stream(videoId, {
            quality: 1,
            seek: 0
        }) as any;

        if (!streamInfo || !streamInfo.url) {
            throw new Error('No stream URL found');
        }

        return NextResponse.json({ 
            url: streamInfo.url,
            expiresIn: 3600 
        });
    } catch (error: any) {
        console.error('PLAY-DL DETAILED ERROR:', error.message);
        
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
