# 🎵 Musik Nexsus (Pulse)

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Better Auth](https://img.shields.io/badge/Better_Auth-Secure-orange?style=for-the-badge)](https://better-auth.com/)

**Musik Nexsus** (atau dikenal sebagai **Pulse**) adalah platform streaming musik modern yang menggabungkan estetika futuristik dengan performa tinggi. Dibangun dengan teknologi web terbaru, Pulse menawarkan pengalaman mendengarkan musik yang imersif, cepat, dan elegan.

---

## ✨ Fitur Utama

- **🚀 Performa Next-Gen:** Menggunakan Next.js 16 (App Router) untuk rendering yang super cepat dan SEO-friendly.
- **🎨 UI Futuristik (PULSE UI):** Desain berbasis *Glassmorphism* dengan palet warna neon yang elegan (Indigo & Cyan).
- **🔒 Autentikasi Modern:** Sistem login aman menggunakan **Better-auth** dengan dukungan Social Login (Google).
- **🎼 Pemutar Musik Terintegrasi:** Kontrol musik yang mulus dengan visualisasi progres dan antarmuka yang responsif.
- **💾 Database Robust:** Integrasi **Prisma ORM** dengan **PostgreSQL** dan **Supabase** untuk manajemen data yang handal.
- **⚡ State Management:** Menggunakan **Zustand** untuk pengelolaan state aplikasi yang ringan dan efisien.
- **📱 Responsive Design:** Optimal di semua ukuran layar, dari desktop hingga perangkat mobile.

---

## 🛠️ Tech Stack

### Core
- **Framework:** [Next.js 16](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Animation:** [Framer Motion](https://www.framer.com/motion/)

### Backend & Data
- **ORM:** [Prisma](https://www.prisma.io/)
- **Database:** PostgreSQL & [Supabase](https://supabase.com/)
- **Authentication:** [Better-auth](https://better-auth.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

### State Management
- **Store:** [Zustand](https://github.com/pmndrs/zustand)

---

## 🚀 Memulai (Getting Started)

### Prasyarat
- Node.js 20.x atau lebih baru
- Database PostgreSQL

### Instalasi

1. **Clone repository:**
   ```bash
   git clone https://github.com/username/musik-nexsus.git
   cd musik-nexsus
   ```

2. **Instal dependensi:**
   ```bash
   npm install
   ```

3. **Konfigurasi Environment:**
   Buat file `.env.local` dan lengkapi variabel berikut:
   ```env
   # Database (Prisma)
   DATABASE_URL="postgresql://user:password@localhost:5432/musik_nexsus"

   # Supabase
   NEXT_PUBLIC_SUPABASE_URL="your_supabase_url"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_anon_key"

   # Better Auth
   BETTER_AUTH_SECRET="your_secret_key"
   BETTER_AUTH_URL="http://localhost:3000"

   # Social Login (Google)
   GOOGLE_CLIENT_ID="your_google_client_id"
   GOOGLE_CLIENT_SECRET="your_google_client_secret"
   ```

4. **Sinkronisasi Database:**
   ```bash
   npx prisma db push
   ```

5. **Jalankan server pengembangan:**
   ```bash
   npm run dev
   ```

Buka [http://localhost:3000](http://localhost:3000) untuk melihat hasilnya!

---

## 📂 Struktur Proyek

```text
├── app/              # Routing & Halaman (Next.js App Router)
├── components/       # Komponen UI modular
│   ├── flow/         # Fitur Diagram (ERD & Sitemap) - WIP
│   ├── layout/       # Sidebar, Header, MobileNav
│   ├── music/        # Komponen Pemutar Musik
│   └── ui/           # Komponen UI Dasar (Button, Card, dll)
├── lib/              # Konfigurasi Library (Auth, Prisma, Supabase)
├── prisma/           # Skema Database (Prisma Schema)
├── public/           # Aset Statis (Icons, Logos)
├── store/            # State Management (Zustand Slices)
└── tailwind.config.js # Konfigurasi Tailwind CSS
```

---

## 🤝 Kontribusi

Kontribusi selalu terbuka! Silakan buka *issue* atau kirim *pull request* jika ingin membantu mengembangkan Musik Nexsus.

---

Dibuat dengan ❤️ oleh [Rijalul Fikri](https://github.com/qwerty0999999)
