import YTMusic from 'ytmusic-api';

const globalForYT = globalThis as unknown as {
    ytmusic: YTMusic | undefined;
    isInitialized: boolean;
    lastRequestTime: number; // Tambahkan pelacak waktu request terakhir
};

export const ytmusic = globalForYT.ytmusic ?? new YTMusic();
if (process.env.NODE_ENV !== 'production') globalForYT.ytmusic = ytmusic;

// Inisialisasi waktu terakhir ke 0
if (!globalForYT.lastRequestTime) globalForYT.lastRequestTime = 0;

export async function getInitializedYTMusic() {
    if (!globalForYT.isInitialized) {
        console.log('--- Initializing YTMusic with Cookie ---');
        await ytmusic.initialize({
            cookies: process.env.YOUTUBE_COOKIE
        });
        globalForYT.isInitialized = true;
    }

    // --- LOGIKA ANTI-BRUTAL ---
    const now = Date.now();
    const minCooldown = 2000; // Minimal jeda 2 detik antar request apapun
    const timeSinceLastRequest = now - globalForYT.lastRequestTime;

    if (timeSinceLastRequest < minCooldown) {
        const waitTime = minCooldown - timeSinceLastRequest;
        console.log(`--- Cooldown active, waiting ${waitTime}ms ---`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
    }

    // Tambahkan jeda acak tambahan (500ms - 1500ms) agar lebih natural
    const humanDelay = Math.floor(Math.random() * (1500 - 500 + 1) + 500);
    await new Promise(resolve => setTimeout(resolve, humanDelay));

    // Update waktu request terakhir
    globalForYT.lastRequestTime = Date.now();
    
    return ytmusic;
}
