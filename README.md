# 🎵 Musik Nexsus (Pulse)

**Musik Nexsus** (atau dikenal sebagai **Pulse**) adalah platform pemutar musik modern berbasis web yang dirancang dengan antarmuka futuristik, performa tinggi, dan pengalaman pengguna yang imersif. Proyek ini mengintegrasikan berbagai sumber musik seperti YouTube dan Spotify ke dalam satu antarmuka yang elegan.

## ✨ Fitur Utama

- **Antarmuka Futuristik (PULSE UI):** Desain gelap yang elegan dengan efek *ambient glow*, *glassmorphism*, dan elemen visual modern (Material Design 3 influenced).
- **Pencarian Multi-Platform:** Cari lagu favorit Anda secara bersamaan dari YouTube Music dan Spotify.
- **Audio Visualizer Real-time:** Visualisasi spektrum audio yang interaktif menggunakan Web Audio API saat musik diputar.
- **Streaming Tanpa Batas:** Sistem proxy streaming yang dioptimalkan untuk mendukung berbagai sumber audio (YouTube, Jamendo, Spotify Previews).
- **Responsive & Seamless:** Pengalaman yang mulus di perangkat mobile maupun desktop dengan animasi transisi yang halus menggunakan Framer Motion.
- **Immersive Mini Player:** Kontrol musik yang selalu dapat diakses dengan visualisasi progres yang menarik di setiap halaman.

## 🚀 Teknologi yang Digunakan

- **Framework:** [Next.js 16 (Canary)](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Animasi:** [Framer Motion](https://www.framer.com/motion/)
- **Database & Auth:** [Supabase](https://supabase.com/)
- **Audio Engine:** Web Audio API & `play-dl` untuk streaming YouTube.
- **Integrasi API:** Spotify API & YouTube Music API (`ytmusic-api`).
- **Bahasa:** [TypeScript](https://www.typescriptlang.org/)

## 🛠️ Persiapan Lingkungan

Sebelum menjalankan proyek, pastikan Anda telah menyiapkan variabel lingkungan berikut di file `.env.local`. Anda bisa menyalin contoh dari `.env.example`:

```env
# Spotify API
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📦 Instalasi & Pengembangan

1. **Clone repository:**
   ```bash
   git clone https://github.com/username/musik-nexsus.git
   ```

2. **Masuk ke direktori proyek:**
   ```bash
   cd musik-nexsus
   ```

3. **Instal dependensi:**
   ```bash
   npm install
   ```

4. **Jalankan server pengembangan:**
   ```bash
   npm run dev
   ```

5. Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## 📂 Struktur Proyek

- `src/app`: Routing dan halaman utama (Home, Discover, Player).
- `src/components`: Komponen UI modular (Visualizer, NavBar, dll).
- `src/context`: State management global untuk kontrol musik.
- `src/lib`: Logika integrasi API (Spotify, YouTube, Supabase).
- `src/types`: Definisi tipe data TypeScript untuk konsistensi kode.

---

Dibuat dengan ❤️ untuk para pecinta musik.

**Editor Setup**
- **Tailwind IntelliSense:** Gunakan ekstensi "Tailwind CSS IntelliSense" di VS Code untuk saran class name.
- **VS Code settings:** Pengaturan workspace otomatis tersedia di `.vscode/settings.json` untuk kenyamanan pengembangan.
