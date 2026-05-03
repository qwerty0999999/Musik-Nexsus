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

        // Buat URL lengkap karena play-dl terkadang gagal jika hanya ID di beberapa environment
        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

        // Set token/cookie jika ada
        if (process.env.YOUTUBE_COOKIE) {
            await play.setToken({
                youtube: {
                    cookie: process.env.YOUTUBE_COOKIE
                }
            });
        }

        // Dapatkan stream menggunakan URL lengkap
        const streamInfo = await play.stream(videoUrl, {
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
