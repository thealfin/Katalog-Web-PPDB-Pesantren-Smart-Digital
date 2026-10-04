<div align="center">

# 🕌 Katalog Web PPDB Pesantren Smart Digital (PSD)

**Platform Katalog, Live Interactive Preview & CMS Template Website PPDB untuk Pondok Pesantren, Islamic Boarding School & Madrasah Modern**

Pilih dari beragam desain profesional • Live Responsive Preview • Download Source Code ZIP • Neon PostgreSQL • Vercel Blob • Admin Management Panel

[![Nuxt](https://img.shields.io/badge/Nuxt-3.17+-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)](https://nuxt.com)
[![Vue](https://img.shields.io/badge/Vue-3.5+-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org)
[![Neon Database](https://img.shields.io/badge/Neon_PostgreSQL-Serverless_Database-00E599?style=for-the-badge&logo=postgresql&logoColor=white)](https://neon.tech)
[![Vercel Blob](https://img.shields.io/badge/Vercel_Blob-Cloud_Storage-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/docs/storage/vercel-blob)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4+-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Pinia](https://img.shields.io/badge/Pinia-State_Management-F7D336?style=for-the-badge&logo=pinia&logoColor=black)](https://pinia.vuejs.org)
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
- **🐘 Neon Serverless PostgreSQL Database:** Penyimpanan data terstruktur (template metadata, admin credentials terenkripsi, dan tanya-jawab FAQ) dengan query berparameter yang 100% kebal dari SQL Injection.
- **☁️ Vercel Blob Object Storage:** Penyimpanan cloud terdistribusi untuk arsip berkas source code ZIP template dan gambar thumbnail berkualitas tinggi.
- **🛠️ Admin Panel Komprehensif:** Dashboard mandiri dengan analytics counter, upload template langsung ke cloud, manajemen tanya-jawab FAQ dinamis, manajemen taksonomi warna/gaya, serta dialog konfirmasi bergaya Apple macOS glassmorphism.

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

## 🏗️ Arsitektur Sistem Terpadu

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                       KATALOG WEB PPDB PESANTREN SMART DIGITAL                  │
├──────────────────────────────────────┬──────────────────────────────────────────┤
│             PUBLIC USERS             │              ADMINISTRATOR               │
├──────────────────────────────────────┼──────────────────────────────────────────┤
│ • Search & Filter Real-Time          │ • Secure Login (scrypt + HMAC Token)     │
│ • Filter Kategori Warna & Gaya       │ • Dashboard Analytics & Stats Counter    │
│ • Live Iframe Preview Switcher       │ • Upload Template (Direct to Cloud Blob) │
│ • One-Click ZIP Downloader           │ • Kelola Tanya-Jawab FAQ Dinamis         │
│ • Dynamic FAQ Accordion              │ • Dynamic Taxonomy (Warna & Gaya Desain) │
│ • WhatsApp Direct Consultation       │ • Edit & Hapus Koleksi Template          │
│ • Ecosystem Showcase & Alur PPDB     │ • REST API Storage (GET/POST/PUT/DEL)    │
└──────────────────────────────────────┴──────────────────────────────────────────┘
```

---

## 🗄️ Arsitektur Data & Penyimpanan Berkas (Database & Storage)

Aplikasi mengadopsi pemisahan tugas secara bersih antara **Relational Database Engine** dan **Object Storage CDN**:

```
                                  ┌──────────────────────────┐
                                  │    Nuxt 3 Backend API    │
                                  │   (Nitro Server Engine)  │
                                  └─────────────┬────────────┘
                                                │
                 ┌──────────────────────────────┴──────────────────────────────┐
                 ▼                                                             ▼
    [ Neon PostgreSQL Database ]                                  [ Vercel Blob Cloud Storage ]
 ┌────────────────────────────────────────┐                    ┌─────────────────────────────────┐
 │ • Table: templates                     │                    │ • templates/[slug]/source.zip   │
 │   - id, slug, name, description        │                    │ • templates/[slug]/preview.png  │
 │   - theme, color, features, tags JSONB │                    │ • Public Global CDN Access      │
 │   - zip_url, preview_image             │                    │ • Multi-method HTTP Storage API │
 │ • Table: admin_users                   │                    │   (GET, POST, PUT, DELETE,      │
 │   - username, scrypt hash, salt        │                    │    PATCH Rename / Move)         │
 │ • Table: faqs                          │                    └─────────────────────────────────┘
 │   - question, answer, order_index      │                                    ▲
 │   - is_published                       │                                    │
 └────────────────────────────────────────┘                    [ Local Dev Filesystem Fallback ]
                 ▲                                             ┌─────────────────────────────────┐
                 │                                             │ • data/templates.json & faqs.json
                 └─────────────────────────────────────────────┤ • public/templates/[slug]/      │
                                                               └─────────────────────────────────┘
```

### 1. 🐘 Neon Serverless PostgreSQL Database

- **Koneksi Pooler:** Terhubung melalui connection string berkecepatan tinggi dengan SSL mode terenkripsi (`ep-still-wind-b3hawgeb-pooler`).
- **100% Kebal SQL Injection (Parameterized Queries):** Menggunakan tagged template `@neondatabase/serverless` (`sql`\`...\``) yang secara native mengisolasi semua input variabel ke dalam parameter binding PostgreSQL (`$1`, `$2`, dst.).
- **Tabel `templates`:** Menyimpan informasi metadata template, palet warna, rincian fitur, serta URL file cloud.
- **Tabel `admin_users`:** Menyimpan data pengguna admin dengan algoritma password hashing `scrypt` (memory-hard, tahan serangan brute-force/GPU) dan salt kriptografis 16-byte unik per pengguna.
- **Tabel `faqs`:** Menyimpan tanya-jawab umum yang dapat diubah dan diatur urutannya secara langsung dari panel admin.

### 2. ☁️ Vercel Blob Object Storage

- **Direct Storage Integration:** Terhubung langsung ke store `store_MzTaOl2Xq7nUywvI`.
- **Penyimpanan Berkas ZIP & Media:** Menyimpan file source code ZIP dan thumbnail yang diunggah oleh admin tanpa membebani memori serverless function.
- **Otomatisasi Pembersihan:** Saat template dihapus dari database, file ZIP dan thumbnail terkait di Vercel Blob otomatis ikut terhapus (*auto-cleanup*) agar kapasitas penyimpanan tetap bersih dari file sampah (*orphaned files*).
- **REST API Storage Universal (`/api/storage`):** Menyediakan kontrol lengkap atas storage dengan berbagai metode HTTP standard:
  - `GET /api/storage`: Menampilkan daftar berkas (listing) dengan filter prefix dan paginasi.
  - `GET /api/storage?url=...`: Membaca metadata berkas (HEAD: ukuran file, tipe konten, waktu upload).
  - `POST /api/storage`: Mengunggah file baru via multipart/form-data.
  - `PUT /api/storage?pathname=...`: Mengunggah/menimpa (*overwrite*) stream binary file secara langsung.
  - `DELETE /api/storage?url=...`: Menghapus satu atau banyak file dari storage.
  - `PATCH /api/storage`: Memindahkan atau mengganti nama (*rename/move*) file di cloud.

### 3. 💾 Local Development Fallback

- Jika dijalankan secara offline atau tanpa koneksi internet, sistem secara otomatis beralih (*fallback*) membaca berkas lokal [data/templates.json](file:///d:/All%20Project%20Website/Nuxt%20PSD%20katalog%20web/data/templates.json) dan [data/faqs.json](file:///d:/All%20Project%20Website/Nuxt%20PSD%20katalog%20web/data/faqs.json), serta menyajikan preview dari direktori `public/templates/`.

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
│   │   ├── FaqSection.vue              # Accordion tanya-jawab dinamis terhubung ke Neon PostgreSQL
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
│   ├── faqs.json                       # Cadangan data offline tanya-jawab FAQ
│   └── templates.json                  # Cadangan data offline katalog template PPDB
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
│   │   ├── faqs.vue                    # Panel kelola FAQ (tambah, edit, urutkan, terbitkan) (/admin/faqs)
│   │   ├── login.vue                   # Halaman login administrator (/admin/login)
│   │   ├── upload.vue                  # Formulir upload template & auto-extract ZIP (/admin/upload)
│   │   └── 📂 edit/
│   │       └── [slug].vue              # Formulir edit metadata & pembaruan berkas template
│   └── 📂 template/
│       └── [slug].vue                  # Halaman detail template & responsive interactive iframe
├── 📂 public/
│   ├── logo-psd.jpeg                   # Logo resmi Pesantren Smart Digital
│   └── 📂 templates/                   # Berkas statis & arsip ZIP template bawaan
├── 📂 server/
│   ├── 📂 api/
│   │   ├── 📂 auth/
│   │   │   ├── login.post.ts           # Login admin dengan verifikasi scrypt & token HMAC SHA-256
│   │   │   ├── logout.post.ts          # Logout admin & penghapusan cookie sesi
│   │   │   └── me.get.ts               # Pengecekan validitas token sesi admin
│   │   ├── 📂 faqs/
│   │   │   ├── index.get.ts            # GET list FAQ publik & admin (?all=true)
│   │   │   ├── index.post.ts           # POST tambah FAQ baru ke Neon DB
│   │   │   ├── [id].put.ts             # PUT perbarui pertanyaan/jawaban FAQ
│   │   │   ├── [id].delete.ts          # DELETE hapus pertanyaan FAQ
│   │   │   └── reorder.put.ts          # PUT simpan susunan urutan FAQ
│   │   ├── 📂 storage/
│   │   │   ├── status.get.ts           # GET cek status koneksi ke Vercel Blob store
│   │   │   ├── index.get.ts            # GET daftar berkas storage & HEAD metadata
│   │   │   ├── index.post.ts           # POST upload berkas baru ke Vercel Blob
│   │   │   ├── index.put.ts            # PUT timpa/upload stream binary berkas
│   │   │   ├── index.delete.ts         # DELETE hapus berkas dari Vercel Blob
│   │   │   └── index.patch.ts          # PATCH pindah/ubah nama berkas di Vercel Blob
│   │   └── 📂 templates/
│   │       ├── index.get.ts            # GET seluruh daftar template dari Neon DB
│   │       ├── upload.post.ts          # POST simpan template baru ke Neon DB & Vercel Blob
│   │       ├── upload-token.post.ts    # POST token direct client-side upload ke Vercel Blob
│   │       ├── 📂 preview/
│   │       │   └── [...path].get.ts    # GET streaming sandboxed HTML/CSS/JS preview
│   │       ├── [slug].get.ts           # GET detail satu template dari Neon DB
│   │       ├── [slug].put.ts           # PUT perbarui data template di Neon DB & Blob
│   │       └── [slug].delete.ts        # DELETE hapus template dari Neon DB & auto-cleanup Blob
│   └── 📂 utils/
│       ├── blob-storage.ts             # Wrapper utilitas Vercel Blob Storage SDK
│       ├── db.ts                       # Konektor Neon PostgreSQL, auth hashing & token generator
│       ├── faqs-store.ts               # Data store & sinkronisasi FAQ Neon PostgreSQL
│       └── templates-store.ts          # Data store & sinkronisasi template Neon PostgreSQL
├── 📂 stores/
│   ├── auth.ts                         # Pinia store autentikasi, bearer token, dan cookie sesi
│   └── templates.ts                    # Pinia store koleksi data katalog template
├── app.vue                             # Root Nuxt application wrapper
├── error.vue                           # Halaman penanganan error kustom 404 / 500
├── nuxt.config.ts                      # Konfigurasi modul Nuxt, runtime config, Tailwind & SEO
├── package.json                        # Definisi dependensi & skrip NPM
└── tailwind.config.ts                  # Konfigurasi tema warna PSD, breakpoint & font
```

---

## 🛠️ Tech Stack & Ekosistem

| Lapisan                | Teknologi                                                                                | Penggunaan & Keterangan                                                       |
| ---------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| **Framework Utama**    | [Nuxt 3](https://nuxt.com/) (v3.17+)                                                     | Full-stack Vue framework dengan SSR, file-based routing, dan Nitro engine     |
| **View Layer**         | [Vue 3](https://vuejs.org/) (Composition API)                                            | Reactive UI components dengan `<script setup lang="ts">`                      |
| **Database Engine**    | [Neon PostgreSQL](https://neon.tech/) (v18.6)                                            | Serverless Postgres RDBMS dengan pooling, JSONB, dan parameterized query      |
| **Cloud Storage**      | [Vercel Blob](https://vercel.com/docs/storage/vercel-blob)                               | Penyimpanan berkas arsip ZIP template, thumbnail, dan REST API universal      |
| **Kriptografi & Auth** | Node.js `crypto` (`scrypt`, `timingSafeEqual`, `HMAC-SHA256`)                            | Autentikasi aman tanpa dependensi eksternal, kebal timing attack & brute force|
| **Bahasa Pemrograman** | [TypeScript](https://www.typescriptlang.org/)                                            | Strict type checking untuk reliabilitas kode skala enterprise                 |
| **Styling & Desain**   | [Tailwind CSS 3](https://tailwindcss.com/)                                               | Utility-first CSS, custom Islamic color palette, dan efek glassmorphism       |
| **Tipografi**          | [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)                 | Font modern, bersih, dan berstandar internasional                             |
| **Ikonografi**         | [Google Material Symbols](https://fonts.google.com/icons)                                | Ikon sistem elegan yang serasi di seluruh halaman web & admin                 |
| **State Management**   | [Pinia 3](https://pinia.vuejs.org/)                                                      | Reusable modular state untuk katalog dan sesi autentikasi                     |
| **Kompresi Berkas**    | [JSZip](https://stuk.github.io/jszip/) & [Adm-Zip](https://github.com/cthackers/adm-zip) | Kompresi, ekstraksi ZIP di browser dan server                                 |
| **Utilitas Gambar**    | [Sharp](https://sharp.pixelplumbing.com/)                                                | Optimasi dan pemrosesan gambar berkecepatan tinggi                            |
| **Utilitas Reaktif**   | [@vueuse/nuxt](https://vueuse.org/)                                                      | Helper hooks untuk keyboard event, clipboard, dan viewport                    |

---

## 🚀 Panduan Memulai (Getting Started)

### Prasyarat Sistem

- **Node.js:** Versi `18.x` atau lebih baru (Disarankan `20.x` LTS atau `24.x`)
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
# 1. DATABASE NEON POSTGRESQL (Wajib)
# ==========================================
DATABASE_URL=postgresql://neondb_owner:password_anda@ep-still-wind-b3hawgeb-pooler.c-4.ap-southeast-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require

# ==========================================
# 2. KREDENSIAL ADMINISTRATOR
# ==========================================
NUXT_ADMIN_USERNAME=psdadmin
NUXT_ADMIN_PASSWORD=password_admin_rahasia_anda
NUXT_SESSION_SECRET=kunci_rahasia_sesi_acak_minimal_32_karakter

# ==========================================
# 3. CLOUD STORAGE VERCEL BLOB
# ==========================================
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxxxxxxxxxxxxx
```

> **Catatan Inisialisasi Otomatis:** Saat server pertama kali berjalan, sistem akan secara otomatis memeriksa tabel di Neon DB (`templates`, `admin_users`, `faqs`). Jika tabel belum ada, sistem akan membuat tabel dan melakukan *initial seeding* data bawaan secara otomatis.

### 4. Menjalankan di Lingkungan Development

```bash
npm run dev
```

Buka browser pada alamat [http://localhost:3000](http://localhost:3000).

### 5. Build & Deployment ke Vercel

Proyek ini telah dikonfigurasi optimal untuk Vercel:

```bash
# Build & Deploy langsung via Vercel CLI
vercel --prod
```

> Pastikan seluruh variabel environment (`DATABASE_URL`, `BLOB_READ_WRITE_TOKEN`, `NUXT_ADMIN_USERNAME`, `NUXT_ADMIN_PASSWORD`, dan `NUXT_SESSION_SECRET`) telah disematkan pada menu **Project Settings > Environment Variables** di Vercel Dashboard.

---

## 📋 Daftar Rute & Endpoint API Lengkap

### Halaman Frontend (Pages)

| Rute                 | Tipe           | Keterangan                                                         |
| -------------------- | -------------- | ------------------------------------------------------------------ |
| `/`                  | Publik         | Halaman utama katalog, filter, showcase ekosistem PSD, dan FAQ     |
| `/template/[slug]`   | Publik         | Halaman detail template dengan live responsive preview iframe      |
| `/admin/login`       | Publik (Admin) | Halaman login dengan rate limiter dan autentikasi scrypt           |
| `/admin`             | Terproteksi    | Dashboard analytics, metrik koleksi, dan tabel aksi template       |
| `/admin/upload`      | Terproteksi    | Form upload template baru ke Neon DB & Vercel Blob                 |
| `/admin/faqs`        | Terproteksi    | Panel CMS kelola pertanyaan umum (tambah, edit, urutkan, terbitkan)|
| `/admin/edit/[slug]` | Terproteksi    | Form pembaruan metadata dan aset template                          |

### Server API (Nitro Endpoints)

| Endpoint                           | Method   | Autentikasi | Keterangan                                                  |
| ---------------------------------- | -------- | ----------- | ----------------------------------------------------------- |
| `/api/auth/login`                  | `POST`   | Publik      | Validasi login admin (scrypt + HMAC SHA-256 session token)  |
| `/api/auth/logout`                 | `POST`   | Terproteksi | Mengakhiri sesi dan menghapus cookie login admin            |
| `/api/auth/me`                     | `GET`    | Terproteksi | Memvalidasi status sesi dan identitas admin aktif           |
| `/api/templates`                   | `GET`    | Publik      | Mengambil seluruh template dari Neon PostgreSQL             |
| `/api/templates/[slug]`            | `GET`    | Publik      | Mengambil detail satu template berdasarkan slug unik        |
| `/api/templates/preview/[...path]` | `GET`    | Publik      | Streaming sandboxed aset preview (HTML, CSS, JS, Media)     |
| `/api/templates/upload`            | `POST`   | Terproteksi | Menyimpan template ke Neon DB & mengunggah file ke Blob     |
| `/api/templates/upload-token`      | `POST`   | Terproteksi | Menerbitkan token direct client-side upload ke Vercel Blob  |
| `/api/templates/[slug]`            | `PUT`    | Terproteksi | Memperbarui metadata dan aset template di Neon DB & Blob    |
| `/api/templates/[slug]`            | `DELETE` | Terproteksi | Menghapus template dari Neon DB & auto-cleanup Vercel Blob  |
| `/api/faqs`                        | `GET`    | Publik      | Mengambil daftar FAQ yang berstatus terbit (*published*)   |
| `/api/faqs?all=true`               | `GET`    | Terproteksi | Mengambil seluruh FAQ (termasuk draft/arsip) untuk admin    |
| `/api/faqs`                        | `POST`   | Terproteksi | Menambahkan pertanyaan & jawaban FAQ baru ke Neon DB        |
| `/api/faqs/[id]`                   | `PUT`    | Terproteksi | Memperbarui teks atau status publikasi FAQ di Neon DB       |
| `/api/faqs/[id]`                   | `DELETE` | Terproteksi | Menghapus pertanyaan FAQ secara permanen                    |
| `/api/faqs/reorder`                | `PUT`    | Terproteksi | Mengatur ulang urutan tampil (*order_index*) FAQ di website |
| `/api/storage/status`              | `GET`    | Publik      | Cek status koneksi ke Vercel Blob Storage                   |
| `/api/storage`                     | `GET`    | Publik      | List berkas di Vercel Blob atau ambil metadata (HEAD)       |
| `/api/storage`                     | `POST`   | Terproteksi | Upload file baru via multipart/form-data ke Vercel Blob     |
| `/api/storage`                     | `PUT`    | Terproteksi | Upload/overwrite stream binary file ke Vercel Blob          |
| `/api/storage`                     | `DELETE` | Terproteksi | Hapus satu atau banyak file dari Vercel Blob                |
| `/api/storage`                     | `PATCH`  | Terproteksi | Pindahkan (*move*) atau ganti nama (*rename*) file di Blob  |

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
