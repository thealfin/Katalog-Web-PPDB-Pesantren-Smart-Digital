<div align="center">

# 🕌 Katalog Web PPDB Pesantren Smart Digital (PSD)

**Platform Katalog & Live Interactive Preview Template Website PPDB untuk Pondok Pesantren, Islamic Boarding School & Madrasah Modern**

Pilih dari beragam desain profesional • Live Responsive Preview • Download Source Code ZIP • Admin Management Panel

[![Nuxt](https://img.shields.io/badge/Nuxt-3.17+-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)](https://nuxt.com)
[![Vue](https://img.shields.io/badge/Vue-3.5+-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4+-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Pinia](https://img.shields.io/badge/Pinia-State_Management-F7D336?style=for-the-badge&logo=pinia&logoColor=black)](https://pinia.vuejs.org)
[![Vercel KV](https://img.shields.io/badge/Vercel_KV-Data_Cache-FF0000?style=for-the-badge&logo=redis&logoColor=white)](https://vercel.com/docs/storage/vercel-kv)
[![Vercel Blob](https://img.shields.io/badge/Vercel_Blob-Cloud_Storage-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/docs/storage/vercel-blob)
[![Deploy](https://img.shields.io/badge/Live_Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://katalog-website-ppdb-psd.vercel.app)

[🌐 Kunjungi Katalog Live](https://katalog-website-ppdb-psd.vercel.app) &nbsp;&bull;&nbsp; [🔐 Akses Admin Panel](https://katalog-website-ppdb-psd.vercel.app/admin)

</div>

---

## 📖 Tentang Project

**Katalog Web PPDB PSD** adalah platform manajemen dan etalase digital yang menyajikan kumpulan template landing page **PPDB (Penerimaan Peserta Didik Baru)** siap pakai, didesain khusus untuk **Pondok Pesantren, Islamic Boarding School, Madrasah Aliyah/Tsanawiyah, dan Yayasan Pendidikan Islam**.

Inisiatif ini lahir di bawah naungan ekosistem **Pesantren Smart Digital (PSD)** untuk membantu lembaga pendidikan Islam menghadirkan representasi digital berkelas dunia, modern, dan islami tanpa harus mengeluarkan biaya pengembangan tinggi atau membangun sistem dari nol.

### 🌟 Nilai Utama Platform

- **🕌 Desain Bernuansa Islami & Kontemporer:** Menggabungkan palet warna Deep Green (`#0A5C4F`), Imperial Gold (`#F4C430`), Mint, Slate, dan Rose dengan tipografi modern _Plus Jakarta Sans_.
- **📱 Smart Responsive Preview:** Pengunjung dapat mencoba dan menjelajahi tampilan template secara langsung dalam mockup browser interaktif (Desktop, Tablet, dan Smartphone) sebelum mengunduh.
- **⚡ Alur Instan & Download Bebas:** Santri, pengurus, maupun developer dapat mengunduh seluruh source code template dalam bentuk arsip **ZIP** siap pakai dengan sekali klik.
- **🔄 Auto-Direct Integrasi Web App PSD:** Setiap template disiapkan dengan alur pendaftaran terintegrasi langsung ke sistem Web App PPDB Pesantren Smart Digital (Formulir online, upload berkas santri, pembayaran otomatis VA/QRIS, serta notifikasi WhatsApp).
- **🛠️ Admin Panel Komprehensif:** Dashboard mandiri dengan analytics counter, upload template langsung ke cloud storage (Vercel Blob), manajemen taksonomi dinamis, dan dialog modal berstandar Apple macOS glassmorphism.

---

## 📸 Tampilan Antarmuka (Screenshots)

Berikut adalah visualisasi antarmuka aplikasi yang telah diimplementasikan:

### 1. 🏠 Halaman Katalog Utama & Filter Interaktif

Etalase template dengan banner hero islami, filter kategori skema warna, gaya desain, status rilisan (_Terbaru / Unggulan_), dan pencarian real-time:

![Halaman Katalog Utama](./docs/screenshots/landing-catalog.png)

---

### 2. 👁️ Halaman Detail & Live Interactive Preview

Preview live template berbasis iframe sandbox dengan switcher resolusi (Desktop, Tablet, Mobile), informasi fitur lengkap, badge tag, dan tombol download source code:

![Detail & Live Preview](./docs/screenshots/template-detail.png)

---

### 3. 🔐 Admin Login dengan Apple-Style macOS Controls

Halaman autentikasi administrator dengan window bar ala macOS (lampu indikator merah, kuning, hijau), logo resmi PSD, dan proteksi brute-force rate limiter:

![Admin Login](./docs/screenshots/admin-login.png)

---

### 4. 📊 Admin Dashboard Analytics & Manajemen Koleksi

Panel manajemen template yang menampilkan metrik statistik (Total Koleksi, Rilisan Baru, Pilihan Unggulan), tabel data interaktif, quick action preview/edit/hapus, serta tombol keluar dengan modal Apple glassmorphism:

![Admin Dashboard](./docs/screenshots/admin-dashboard.png)

---

### 5. 📤 Form Upload Template & Dynamic Taxonomy

Formulir upload dengan dukungan ekstraksi instan arsip ZIP via JSZip, preview thumbnail otomatis, direct upload ke Vercel Blob, serta modal tambah kategori warna & gaya desain baru secara dinamis:

![Admin Upload Template](./docs/screenshots/admin-upload.png)

---

## ✨ Fitur & Arsitektur Sistem

```
┌────────────────────────────────────────────────────────────────────────┐
│                          PSD WEB PPDB KATALOG                          │
├───────────────────────────────┬────────────────────────────────────────┤
│         PUBLIC USERS          │            ADMINISTRATOR               │
├───────────────────────────────┼────────────────────────────────────────┤
│ • Search & Filter Real-Time   │ • Secure Login & Session Guard         │
│ • Filter Kategori Warna & Gaya│ • Dashboard Analytics & Stats Counter │
│ • Live Iframe Preview Switcher│ • Upload Template (Direct to Cloud)    │
│ • One-Click ZIP Downloader    │ • Dynamic Taxonomy (Warna & Gaya)      │
│ • WhatsApp Direct Consultation│ • Edit & Hapus Koleksi Template        │
│ • FAQ & Ecosystem Showcase    │ • Apple Glassmorphic Confirm Modals    │
└───────────────────────────────┴────────────────────────────────────────┘
```

### 1. 🔍 Mesin Pencarian & Filter Cerdas

- **Pencarian Real-Time:** Filter berdasarkan nama template, kata kunci deskripsi, tag fitur, dan slug.
- **Kategori Warna & Gaya Dinamis:** Filter skema warna (Green, Gold, Blue, Gray, Maroon, Purple, dll.) dan gaya visual (Modern-Rabbani, Ultra-Minimal, Prestisius, Cyber-Islamic, dll.).
- **Quick Status Pill:** Tab filter instan untuk kategori _Semua_, _Terbaru (New Release)_, dan _Unggulan (Featured)_.

### 2. 🖥️ Sistem Streaming & Live Sandbox Preview

- **Streaming Proxy Server Engine:** Endpoint `server/api/templates/preview/[...path].get.ts` secara cerdas mengalirkan (_stream_) dokumen HTML, CSS, JavaScript, font, dan aset gambar langsung dari Vercel Blob Storage atau file lokal.
- **Device Viewport Switcher:** Memungkinkan calon pengguna menguji responsivitas template pada rasio Desktop (100%), Tablet (768px), dan Smartphone (375px).
- **Fullscreen Mode:** Membuka demo website pada tab baru tanpa elemen pembungkus untuk peninjauan menyeluruh.

### 3. 📦 Generator Download & Kompresi Berkas

- Menggunakan library client-side [`jszip`](https://stuk.github.io/jszip/) dan [`file-saver`](https://github.com/nicolo-ribaudo/FileSaver.js).
- Pengunjung dapat mengunduh paket lengkap source code website secara instan tanpa membebani bandwidth pemrosesan server.

### 4. 🏷️ Dynamic Taxonomy System (`useTemplateTaxonomy.ts`)

- Taksonomi kategori warna dan gaya desain tidak dikunci secara statis (_hardcoded_).
- Administrator dapat menambahkan opsi kategori warna dan gaya desain baru secara langsung dari form upload atau edit melalui pop-up modal modern.
- Data taksonomi disimpan secara persisten di `localStorage` pada sisi client dan tersinkronisasi di filter katalog publik.

### 5. 🛡️ Keamanan & Manajemen Sesi

- **Rate-Limiting Proteksi:** Mencegah serangan _brute force_ pada halaman login admin. Jika gagal 5 kali berturut-turut, sistem mengunci login selama 30 detik.
- **Route Guard Middleware:** File `middleware/auth.ts` memvalidasi status autentikasi sebelum mengizinkan akses ke seluruh sub-rute `/admin`.
- **Destructive Action Safety:** Konfirmasi penghapusan dan logout menggunakan modal custom bergaya Apple Glassmorphism dengan indikator loading state.

---

## 🗄️ Cloud Storage & Data Management

Aplikasi menggunakan pendekatan arsitektur **Hybrid Storage Resilience** yang fleksibel dan andal baik di lingkungan lokal maupun cloud serverless:

```
                          ┌──────────────────────────┐
                          │   Nuxt 3 Backend API     │
                          │ (server/utils/templates) │
                          └─────────────┬────────────┘
                                        │
                 ┌──────────────────────┴──────────────────────┐
                 ▼                                             ▼
     [ Cloud Storage & State (Vercel) ]            [ Local Fallback System ]
  ┌───────────────────────────────────────┐     ┌─────────────────────────────┐
  │ • Vercel Blob Storage                 │     │ • data/templates.json       │
  │   - templates.json (katalog metadata) │     │   - Standalone offline data │
  │   - ZIP source code packages          │     │ • public/templates/         │
  │   - Thumbnail & preview media         │     │   - Local static files      │
  │ • Vercel KV (Redis Key-Value Cache)   │     │   - Local preview assets    │
  │   - Fast cached read/write            │     │                             │
  └───────────────────────────────────────┘     └─────────────────────────────┘
```

### 1. Vercel Blob Cloud Storage (Utama di Production)

- **Metadata Katalog (`templates.json`):** Di production, data seluruh template disimpan dan diperbarui langsung sebagai berkas JSON publik di Vercel Blob (`BLOB_KEY = 'templates.json'`).
- **Direct Client-to-Cloud Upload:** Mengatasi batasan ukuran payload serverless Vercel (4.5 MB). Melalui endpoint `server/api/templates/upload-token.post.ts`, browser admin mengunggah file ZIP template dan thumbnail langsung ke Vercel Blob via `@vercel/blob/client`.
- **Public CDN & Global Edge:** Seluruh berkas ZIP, gambar thumbnail, dan aset preview disajikan dengan cepat melalui jaringan CDN Vercel.

### 2. Vercel KV (Redis Cache - Opsional)

- Jika variabel `KV_REST_API_URL` dan `KV_REST_API_TOKEN` tersedia di Vercel, sistem memanfaatkan Vercel KV sebagai layer caching in-memory berkecepatan tinggi sebelum membaca ke Blob.

### 3. Local JSON & Filesystem (Development)

- Ketika dijalankan secara lokal (`npm run dev`), sistem secara otomatis menggunakan berkas lokal [data/templates.json](file:///d:/All%20Project%20Website/Nuxt%20PSD%20katalog%20web/data/templates.json) sebagai database file-based dan folder `public/templates/` untuk aset preview.

---

## 📂 Struktur Direktori Proyek

```
📦 Katalog-Web-PPDB-Pesantren-Smart-Digital
├── 📂 assets/
│   └── 📂 css/
│       └── main.css                    # Setup Tailwind, Plus Jakarta Sans, glassmorphism, utilities
├── 📂 components/
│   ├── 📂 catalog/
│   │   ├── EcosystemCallout.vue        # Banner edukasi integrasi ekosistem Web App PSD & WhatsApp CTA
│   │   ├── FaqSection.vue              # Accordion tanya jawab interaktif seputar template PPDB
│   │   ├── FilterBar.vue               # Bar pencarian & filter multivariabel (status, warna, gaya)
│   │   ├── TemplateCard.vue            # Kartu item template dengan visual browser frame ala macOS
│   │   └── TemplateGrid.vue            # Grid katalog responsif dengan empty state handler
│   ├── 📂 layout/
│   │   ├── AppHeader.vue               # Navigasi utama dengan branding PSD, badge koleksi & CTA
│   │   └── AppFooter.vue               # Footer resmi PSD, info kontak, copyright & navigasi
│   └── 📂 ui/
│       ├── BadgeTag.vue                # Komponen pill badge (Baru, Unggulan, Premium)
│       ├── DownloadButton.vue          # Tombol download ZIP dengan progress spinner
│       └── SearchInput.vue             # Input box pencarian dengan icon dinamis
├── 📂 composables/
│   ├── useDownload.ts                  # Logic pembuatan dan pengunduhan arsip ZIP client-side
│   ├── useTemplates.ts                 # Store fetcher dan state cache template katalog
│   └── useTemplateTaxonomy.ts          # State terpadu kategori warna & gaya desain template
├── 📂 data/
│   └── templates.json                  # Database lokal data template PPDB (fallback)
├── 📂 docs/
│   └── 📂 screenshots/                 # Tangkapan layar dokumentasi antarmuka aplikasi
├── 📂 layouts/
│   ├── default.vue                     # Layout halaman publik dengan AppHeader & AppFooter
│   └── admin.vue                       # Layout admin dengan sidebar, topbar & modal logout modern
├── 📂 middleware/
│   └── auth.ts                         # Route guard pengecekan sesi login administrator
├── 📂 pages/
│   ├── index.vue                       # Halaman utama katalog website PPDB (/)
│   ├── 📂 admin/
│   │   ├── index.vue                   # Dashboard utama analitik & manajemen template (/admin)
│   │   ├── login.vue                   # Halaman login administrator (/admin/login)
│   │   ├── upload.vue                  # Formulir upload template & auto-extract ZIP (/admin/upload)
│   │   └── 📂 edit/
│   │       └── [slug].vue              # Formulir edit metadata & pembaruan berkas template
│   └── 📂 template/
│       └── [slug].vue                  # Halaman detail template & responsive interactive iframe
├── 📂 public/
│   ├── logo-psd.jpeg                   # Logo resmi Pesantren Smart Digital
│   ├── 📂 screenshots/                 # Salinan screenshot untuk public access
│   └── 📂 templates/                   # Direktori berkas statis & aset lokal template PPDB
├── 📂 server/
│   ├── 📂 api/
│   │   ├── 📂 auth/
│   │   │   └── login.post.ts           # Endpoint validasi kredensial login admin
│   │   └── 📂 templates/
│   │       ├── index.get.ts            # Endpoint GET seluruh daftar template
│   │       ├── upload.post.ts          # Endpoint POST upload metadata template
│   │       ├── upload-token.post.ts    # Endpoint pembuat token direct upload Vercel Blob
│   │       ├── 📂 preview/
│   │       │   └── [...path].get.ts    # Endpoint streaming preview sandboxed HTML/CSS/JS/media
│   │       ├── [slug].get.ts           # Endpoint GET data spesifik 1 template
│   │       ├── [slug].put.ts           # Endpoint PUT perbarui data template
│   │       └── [slug].delete.ts        # Endpoint DELETE hapus template dari database & storage
│   └── 📂 utils/
│       └── templates-store.ts          # Storage manager (Vercel Blob + Vercel KV + Local JSON)
├── 📂 stores/
│   ├── auth.ts                         # Pinia store autentikasi, sesi admin, dan rate limiting
│   └── templates.ts                    # Pinia store koleksi data katalog template
├── app.vue                             # Root Nuxt application wrapper
├── error.vue                           # Halaman penanganan error kustom 404 / 500
├── nuxt.config.ts                      # Konfigurasi modul Nuxt, head meta, runtime config, Tailwind
├── package.json                        # Definisi dependensi & skrip NPM
└── tailwind.config.ts                  # Konfigurasi tema warna PSD, breakpoint & font
```

---

## 🛠️ Tech Stack & Ekosistem

| Lapisan                | Teknologi                                                                                | Penggunaan & Keterangan                                                       |
| ---------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| **Framework Utama**    | [Nuxt 3](https://nuxt.com/) (v3.17+)                                                     | Full-stack Vue framework dengan SSR, file-based routing, dan Nitro engine     |
| **View Layer**         | [Vue 3](https://vuejs.org/) (Composition API)                                            | Reactive UI components dengan `<script setup lang="ts">`                      |
| **Bahasa Pemrograman** | [TypeScript](https://www.typescriptlang.org/)                                            | Strict type checking untuk reliabilitas kode skala enterprise                 |
| **Styling & Desain**   | [Tailwind CSS 3](https://tailwindcss.com/)                                               | Utility-first CSS, custom Islamic color palette, dan efek glassmorphism       |
| **Tipografi**          | [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)                 | Font modern, bersih, dan berstandar internasional                             |
| **Ikonografi**         | [Google Material Symbols](https://fonts.google.com/icons)                                | Ikon sistem elegan yang serasi di seluruh halaman web & admin                 |
| **State Management**   | [Pinia 3](https://pinia.vuejs.org/)                                                      | Reusable modular state untuk katalog dan sesi autentikasi                     |
| **Cloud Storage**      | [Vercel Blob](https://vercel.com/docs/storage/vercel-blob)                               | Penyimpanan file metadata (templates.json), arsip ZIP template, dan thumbnail |
| **Cache Store**        | [Vercel KV](https://vercel.com/docs/storage/vercel-kv) (Redis)                           | Key-value store untuk caching metadata template berkecepatan tinggi           |
| **Kompresi Berkas**    | [JSZip](https://stuk.github.io/jszip/) & [Adm-Zip](https://github.com/cthackers/adm-zip) | Kompresi, ekstraksi ZIP di browser dan server                                 |
| **Utilitas Gambar**    | [Sharp](https://sharp.pixelplumbing.com/)                                                | Optimasi dan pemrosesan gambar berkecepatan tinggi                            |
| **Utilitas Reaktif**   | [@vueuse/nuxt](https://vueuse.org/)                                                      | Helper hooks untuk keyboard event, clipboard, dan viewport                    |

---

## 🚀 Panduan Memulai (Getting Started)

### Prasyarat Sistem

- **Node.js:** Versi `18.x` atau lebih baru (Disarankan `20.x` LTS)
- **Package Manager:** `npm`, `pnpm`, atau `yarn`
- **Git**

### 1. Kloning Repository

```bash
git clone https://github.com/thealfin/Katalog-Web-PPDB-Pesantren-Smart-Digital.git
cd Katalog-Web-PPDB-Pesantren-Smart-Digital
```

### 2. Instalasi Dependensi

```bash
npm install
```

### 3. Konfigurasi Environment Variables

Salin file template `.env.example` atau buat file `.env` baru di direktori root:

```bash
cp .env.example .env
```

Isi variabel environment berikut:

```env
# ==========================================
# KREDENSIAL ADMINISTRATOR
# ==========================================
NUXT_ADMIN_USERNAME=psdadmin
NUXT_ADMIN_PASSWORD=password_admin_rahasia_anda
NUXT_SESSION_SECRET=kunci_rahasia_sesi_acak_minimal_32_karakter

# ==========================================
# CLOUD STORAGE VERCEL BLOB (Wajib untuk upload di production)
# ==========================================
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxxxxxxxxxxxxx

# ==========================================
# VERCEL KV CACHE (Opsional di Vercel)
# ==========================================
# KV_REST_API_URL=https://...
# KV_REST_API_TOKEN=...
```

### 4. Menjalankan di Lingkungan Development

```bash
npm run dev
```

Buka browser pada alamat [http://localhost:3000](http://localhost:3000).

### 5. Build untuk Lingkungan Production

```bash
# Build aplikasi Nuxt untuk deployment server / node
npm run build

# Menjalankan hasil build production secara lokal
npm run preview
```

### 6. Deployment ke Vercel

Proyek ini dioptimalkan untuk berjalan di Vercel:

```bash
# Deploy langsung via Vercel CLI
vercel --prod
```

> Pastikan seluruh variabel environment (`NUXT_ADMIN_USERNAME`, `NUXT_ADMIN_PASSWORD`, `NUXT_SESSION_SECRET`, dan `BLOB_READ_WRITE_TOKEN`) telah ditambahkan di menu **Project Settings > Environment Variables** pada dashboard Vercel.

---

## 📋 Daftar Rute & Endpoint API

### Halaman Frontend (Pages)

| Rute                 | Tipe           | Keterangan                                                     |
| -------------------- | -------------- | -------------------------------------------------------------- |
| `/`                  | Publik         | Halaman utama katalog, filter, showcase ekosistem PSD, dan FAQ |
| `/template/[slug]`   | Publik         | Halaman detail template dengan live responsive preview iframe  |
| `/admin/login`       | Publik (Admin) | Halaman login dengan rate limiter anti brute-force             |
| `/admin`             | Terproteksi    | Dashboard analytics, metrik koleksi, dan tabel aksi template   |
| `/admin/upload`      | Terproteksi    | Form upload template baru, extract ZIP, dan tambah taksonomi   |
| `/admin/edit/[slug]` | Terproteksi    | Form pembaruan metadata dan aset template yang sudah ada       |

### Server API (Nitro Endpoints)

| Endpoint                           | Method   | Autentikasi | Keterangan                                               |
| ---------------------------------- | -------- | ----------- | -------------------------------------------------------- |
| `/api/auth/login`                  | `POST`   | Publik      | Validasi username & password dengan rate limiting        |
| `/api/templates`                   | `GET`    | Publik      | Mengambil seluruh daftar template yang tersedia          |
| `/api/templates/[slug]`            | `GET`    | Publik      | Mengambil data detail satu template                      |
| `/api/templates/preview/[...path]` | `GET`    | Publik      | Streaming sandboxed aset preview (HTML, CSS, JS, Gambar) |
| `/api/templates/upload`            | `POST`   | Terproteksi | Menyimpan template baru ke database/store                |
| `/api/templates/upload-token`      | `POST`   | Terproteksi | Menerbitkan token client-side upload ke Vercel Blob      |
| `/api/templates/[slug]`            | `PUT`    | Terproteksi | Memperbarui data template yang sudah tersimpan           |
| `/api/templates/[slug]`            | `DELETE` | Terproteksi | Menghapus data template dan file terkait                 |

---

## 🤝 Alur Integrasi Ekosistem PSD

Setiap template website PPDB yang diunduh dari katalog ini siap dihubungkan secara mulus (_auto-direct_) dengan sistem aplikasi pendaftaran **Pesantren Smart Digital**:

1. Tombol **"Daftar Online"** atau **"Daftar Inden"** pada template mengarah ke subdomain resmi pesantren (misal: `https://pendaftaran.[nama-pesantren].ponpes.id`).
2. Calon wali santri mengisi formulir biodata dan mengunggah berkas santri baru secara online.
3. Pembayaran biaya registrasi otomatis terverifikasi menggunakan Virtual Account Bank & QRIS.
4. Notifikasi kelulusan, kwitansi, dan pengumuman tes seleksi dikirim otomatis via WhatsApp Gateway resmi PSD.

---

## 📄 Lisensi & Kontribusi

Proyek ini dilisensikan di bawah naungan lisensi **MIT License** — Anda bebas menggunakan, memodifikasi, dan mengimplementasikannya untuk kepentingan pondok pesantren dan institusi pendidikan Islam.

Kontribusi, laporan kendala (_bug reports_), dan usulan template baru sangat diapresiasi! Silakan buat **Issue** atau ajukan **Pull Request**.

---

<div align="center">

**Dikembangkan dengan sepenuh hati oleh Tim Pesantren Smart Digital (PSD)**  
_Mewujudkan Digitalisasi Pesantren yang Mandiri, Modern, dan Berdaya Saing Global._

⭐ **Jangan lupa berikan Star di GitHub jika project ini bermanfaat!** ⭐

</div>
