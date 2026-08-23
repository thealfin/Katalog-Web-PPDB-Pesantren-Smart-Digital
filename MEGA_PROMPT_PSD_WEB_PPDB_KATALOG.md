# 🕌 MEGA PROMPT — PSD Web PPDB Katalog
> Dokumen ini adalah roadmap + mega prompt untuk AI Agent dalam membangun website katalog template PPDB berbasis Nuxt.js.

---

## 📌 Konteks & Latar Belakang Proyek

Kamu adalah seorang **Senior Full-Stack Engineer** dengan spesialisasi **Vue.js / Nuxt.js** dan pengalaman 10+ tahun membangun CMS dan platform katalog. Tugasmu adalah membangun website bernama **"PSD Web PPDB Katalog"** — sebuah platform katalog template website untuk Pondok Pesantren, khususnya untuk keperluan PPDB (Penerimaan Peserta Didik Baru).

### Tujuan Website:
- Menampilkan koleksi template website siap pakai untuk klien pondok pesantren
- Setiap template dibangun dengan HTML murni + Tailwind CSS + vanilla JS
- Admin dapat mengunduh template dalam format **ZIP**
- Template dapat ditambahkan kapanpun via **upload manual** atau **terminal (file JSON)**
- Terdapat filter/kategori untuk navigasi template

### Referensi Template Contoh:
- URL: `https://web-ppjq.vercel.app/`
- Stack template: **HTML murni + Tailwind CSS CDN + vanilla JS**
- Karakteristik: Single-page, portal menuju pendaftaran PPDB, konten profil pesantren
- Struktur konten: Hero → Profil → Keunggulan → Unit Pendidikan → Galeri → Testimoni → Pendaftaran → Lokasi → Footer

---

## 🏗️ Arsitektur Proyek

```
psd-web-ppdb-katalog/
├── nuxt.config.ts
├── app.vue
├── package.json
├── tailwind.config.ts
│
├── assets/
│   └── css/
│       └── main.css
│
├── components/
│   ├── layout/
│   │   ├── AppHeader.vue
│   │   ├── AppFooter.vue
│   │   └── AppSidebar.vue (filter panel)
│   ├── catalog/
│   │   ├── TemplateCard.vue
│   │   ├── TemplateGrid.vue
│   │   ├── TemplatePreviewModal.vue
│   │   └── FilterBar.vue
│   └── ui/
│       ├── BadgeTag.vue
│       ├── SearchInput.vue
│       └── DownloadButton.vue
│
├── pages/
│   ├── index.vue              # Halaman utama katalog
│   ├── template/
│   │   └── [slug].vue         # Halaman detail template
│   └── admin/
│       ├── login.vue          # Login admin
│       ├── index.vue          # Dashboard admin
│       └── upload.vue         # Upload template baru
│
├── layouts/
│   ├── default.vue
│   └── admin.vue
│
├── middleware/
│   └── auth.ts                # Guard halaman admin
│
├── stores/
│   ├── templates.ts           # Pinia store data template
│   └── auth.ts                # Pinia store autentikasi admin
│
├── composables/
│   ├── useTemplates.ts        # Logic fetch & filter template
│   ├── useDownload.ts         # Logic generate & unduh ZIP
│   └── useAuth.ts             # Logic autentikasi
│
├── server/
│   └── api/
│       ├── templates/
│       │   ├── index.get.ts   # GET semua template
│       │   ├── [slug].get.ts  # GET detail template
│       │   └── upload.post.ts # POST upload template baru
│       └── auth/
│           ├── login.post.ts
│           └── logout.post.ts
│
├── data/
│   └── templates.json         # Database lokal template (sumber kebenaran)
│
└── public/
    ├── templates/             # Folder file template (HTML/CSS/JS/assets)
    │   ├── template-01-hijau-damai/
    │   │   ├── index.html
    │   │   ├── preview.png
    │   │   └── assets/
    │   ├── template-02-biru-langit/
    │   │   └── ...
    │   └── ... (17 template total)
    └── favicon.ico
```

---

## 📋 Struktur Data Template (templates.json)

```json
[
  {
    "id": "template-01",
    "slug": "hijau-damai",
    "name": "Hijau Damai",
    "description": "Template dengan nuansa hijau islami yang tenang, cocok untuk pesantren dengan karakter tradisional dan natural.",
    "theme": "islami-natural",
    "colorPrimary": "#16a34a",
    "colorScheme": "green",
    "style": "minimal",
    "pages": 1,
    "features": ["hero", "profil", "pendaftaran", "kontak", "galeri"],
    "tags": ["formal", "religi", "hijau", "simple"],
    "previewUrl": "/templates/hijau-damai/index.html",
    "previewImage": "/templates/hijau-damai/preview.png",
    "zipPath": "/templates/hijau-damai.zip",
    "createdAt": "2026-01-01",
    "isNew": false,
    "isFeatured": true
  }
]
```

### Field Wajib:
| Field | Tipe | Keterangan |
|---|---|---|
| `id` | string | ID unik |
| `slug` | string | URL-friendly name |
| `name` | string | Nama tampilan template |
| `description` | string | Deskripsi singkat |
| `theme` | string | Kategori tema |
| `colorScheme` | enum | `green`, `blue`, `maroon`, `gold`, `teal`, `gray` |
| `style` | enum | `minimal`, `classic`, `modern`, `formal` |
| `pages` | number | Jumlah halaman |
| `features` | string[] | Fitur yang ada |
| `tags` | string[] | Tag untuk pencarian |
| `previewImage` | string | Path thumbnail |
| `zipPath` | string | Path file ZIP |

---

## 🎨 17 Template yang Harus Dibuat

Semua template adalah **single-page HTML** dengan Tailwind CSS CDN. Setiap template merepresentasikan identitas visual yang berbeda namun tetap dalam koridor: **simple, formal, religi, sopan, edukatif**.

### Daftar 17 Template:

| No | Nama | Warna Utama | Karakter | Keunikan Visual |
|---|---|---|---|---|
| 01 | **Hijau Damai** | Hijau tua `#166534` | Natural, tradisional | Ornamen daun, tekstur kertas |
| 02 | **Biru Langit** | Biru navy `#1e3a5f` | Formal, profesional | Motif gelombang laut |
| 03 | **Emas Mulia** | Emas `#92400e` + krem | Mewah, prestisius | Border ornamen emas, serif elegan |
| 04 | **Merah Marun** | Marun `#7f1d1d` | Tegas, berwibawa | Layout asimetris bold |
| 05 | **Hijau Tosca** | Teal `#0f766e` | Segar, modern-islami | Gradien halus, rounded card |
| 06 | **Putih Bersih** | Putih + aksen abu | Ultra minimal | Typografi dominan, banyak whitespace |
| 07 | **Coklat Pesantren** | Coklat hangat `#78350f` | Tradisional, hangat | Tekstur kayu, ornamen klasik |
| 08 | **Ungu Ilmu** | Ungu `#4c1d95` | Spiritual, akademis | Motif bintang-bintang |
| 09 | **Abu Formal** | Abu gelap `#1f2937` | Dark mode, modern | Glassmorphism card |
| 10 | **Hijau Mint** | Mint `#d1fae5` + hijau | Cerah, ramah | Ilustrasi vektor sederhana |
| 11 | **Biru Quran** | Biru `#1d4ed8` + emas | Quraniy, khidmat | Pattern arabesque subtle |
| 12 | **Krem Santri** | Krem `#fef3c7` + coklat | Hangat, bersahaja | Watercolor wash background |
| 13 | **Hitam Elegan** | Hitam `#111827` + emas | Prestisius, bold | Tipografi serif besar |
| 14 | **Hijau Nusantara** | Hijau `#15803d` + batik | Kultural-islami | Motif batik SVG subtle |
| 15 | **Biru Langit Muda** | Biru muda `#dbeafe` | Ramah, fresh | Ilustrasi awan, playful-formal |
| 16 | **Orange Semangat** | Oranye `#c2410c` | Energik, optimistis | Diagonal accent lines |
| 17 | **Dua Warna Klasik** | Hijau + putih | Classic two-tone | Split layout header |

---

## 🧱 Struktur HTML Setiap Template

Setiap file `index.html` template **wajib** memiliki struktur seksi berikut (dapat dikustomisasi tampilannya):

```
1. <header>     — Navbar: Logo, nama pesantren, menu navigasi
2. #hero        — Hero section: Tagline utama + CTA "Daftar Sekarang"
3. #profil      — Profil singkat pesantren (sejarah, visi-misi)
4. #keunggulan  — 4 pilar/keunggulan (icon + teks)
5. #program     — Unit pendidikan / program pesantren
6. #galeri      — Grid foto (placeholder img)
7. #testimoni   — Kutipan alumni (1-2 card)
8. #pendaftaran — CTA pendaftaran + info kontak WhatsApp
9. #lokasi      — Embed Google Maps + alamat
10. <footer>    — Nama pesantren, sosmed, copyright
```

### Konten Placeholder Standar:
```html
<!-- Gunakan konten generik yang bisa diganti klien -->
Nama: "Pondok Pesantren [Nama Pesantren]"
Tagline: "Mencetak Generasi Qur'ani yang Berakhlak dan Berprestasi"
WhatsApp: "https://wa.me/628xxxxxxxxx"
Maps: iframe Google Maps kosong atau placeholder
Foto: Gunakan placeholder.co atau unsplash kategori islami
```

---

## 🖥️ Spesifikasi Halaman Website Katalog (Nuxt.js)

### 1. Halaman Utama (`/`) — Katalog Template

**Komponen:**
- Header sticky dengan logo "PSD Web PPDB Katalog" + tagline
- Hero mini: judul halaman + deskripsi singkat platform
- `FilterBar.vue`: Filter berdasarkan tema/style + warna + pencarian keyword
- `TemplateGrid.vue`: Grid 3 kolom (desktop) / 1 kolom (mobile), berisi `TemplateCard.vue`
- Footer

**FilterBar:**
```
[ 🔍 Cari template... ] [ Tema ▼ ] [ Warna ▼ ] [ Semua | Terbaru | Unggulan ]
```

**TemplateCard.vue:**
```
┌─────────────────────────┐
│   [Preview Image]       │
│   hover → tombol Preview│
├─────────────────────────┤
│ Nama Template           │
│ Tag: #formal #hijau     │
│ [Lihat Preview]         │
└─────────────────────────┘
```

---

### 2. Halaman Detail Template (`/template/[slug]`)

**Konten:**
- Iframe preview template (fullwidth, responsive)
- Sidebar info: nama, deskripsi, warna, fitur, tags
- Tombol **"Download ZIP"** (hanya tampil jika user adalah admin)
- Tombol **"Lihat Fullscreen"** (buka di tab baru)
- Navigasi prev/next template

---

### 3. Halaman Admin Login (`/admin/login`)

**Form:**
- Input username + password
- Simpan session di `localStorage` atau cookie httpOnly
- Redirect ke `/admin` setelah berhasil

**Kredensial default (hardcoded atau `.env`):**
```env
ADMIN_USERNAME=psdadmin
ADMIN_PASSWORD=ppdb2026secure
```

---

### 4. Halaman Dashboard Admin (`/admin`)

**Fitur:**
- Tabel daftar semua template (nama, slug, tema, tanggal, status)
- Tombol tambah template baru
- Tombol hapus/edit template
- Status badge: Active / Draft

---

### 5. Halaman Upload Template (`/admin/upload`)

**Form Upload:**
```
- Nama Template (text)
- Slug (auto-generate dari nama, editable)
- Deskripsi (textarea)
- Tema / Style (select)
- Warna Utama (color picker + select preset)
- Tags (multi-input)
- Fitur (checkbox: galeri, peta, testimoni, dll)
- Upload Preview Image (PNG/JPG, max 2MB)
- Upload File ZIP (max 20MB)
- [ Simpan Template ]
```

**Proses Backend:**
1. Validasi form
2. Simpan file ke `public/templates/[slug]/`
3. Update `data/templates.json`
4. Redirect ke dashboard

---

## 🔧 Cara Tambah Template via Terminal

### Langkah-langkah:

```bash
# 1. Buat folder template baru
mkdir -p public/templates/nama-template/assets

# 2. Masukkan file template
cp -r /path/to/template/* public/templates/nama-template/

# 3. Buat ZIP
cd public/templates
zip -r nama-template.zip nama-template/

# 4. Buat screenshot preview (opsional, bisa manual)
# Letakkan di: public/templates/nama-template/preview.png

# 5. Tambahkan entri ke data/templates.json
# Edit file JSON dan tambahkan objek baru sesuai skema di atas

# 6. Restart dev server / redeploy
```

### Script Helper (opsional — buat file `scripts/add-template.mjs`):
```javascript
// node scripts/add-template.mjs --name="Hijau Baru" --slug="hijau-baru" --color="green"
// Script ini otomatis menambahkan entri ke templates.json
```

---

## 📦 Tech Stack & Dependencies

### Core:
```json
{
  "nuxt": "^3.x",
  "vue": "^3.x",
  "@pinia/nuxt": "latest",
  "@nuxtjs/tailwindcss": "latest"
}
```

### Tambahan:
```json
{
  "jszip": "^3.x",              // Generate ZIP di client-side
  "file-saver": "^2.x",        // Trigger download di browser
  "@vueuse/nuxt": "latest",     // Composables utility
  "nuxt-icon": "latest"         // Icon set (Iconify)
}
```

### Tailwind Config Wajib:
```js
// tailwind.config.ts
module.exports = {
  content: ['./pages/**/*.vue', './components/**/*.vue'],
  theme: {
    extend: {
      fontFamily: {
        arabic: ['Amiri', 'serif'],        // Font nuansa Arab
        display: ['Playfair Display', 'serif'], // Judul elegan
        body: ['Plus Jakarta Sans', 'sans-serif']
      },
      colors: {
        brand: {
          green: '#166534',
          gold: '#92400e',
          navy: '#1e3a5f'
        }
      }
    }
  }
}
```

---

## 🎨 Desain Visual Website Katalog (Nuxt.js)

### Identitas Visual:
- **Tone:** Formal, bersih, profesional — tetapi tetap hangat dan islami
- **Warna Utama:**
  - Background: `#FAFAF8` (putih gading)
  - Aksen Utama: `#166534` (hijau pesantren)
  - Aksen Sekunder: `#92400e` (emas tua)
  - Teks: `#1a1a1a`
- **Font:**
  - Display/Judul: `Playfair Display` (serif, elegan)
  - Body: `Plus Jakarta Sans` (sans-serif, readable)
  - Aksen Arab: `Amiri` (untuk ornamen kaligrafi)
- **Ornamen:** Pattern arabesque subtle sebagai background texture

### Header Website:
```
🕌 PSD Web PPDB Katalog
   "Solusi Digital untuk Pesantren Modern"          [Admin Login]
```

### Footer:
```
© 2026 Pesantren Smart Digital
Dibuat dengan ❤️ untuk pendidikan Islam Indonesia
```

---

## 🔐 Sistem Autentikasi Admin

### Spesifikasi:
- **Tipe:** Simple credential auth (tidak perlu database)
- **Storage:** Cookie httpOnly via Nuxt server-side, atau localStorage (MVP)
- **Middleware:** `auth.ts` — redirect ke `/admin/login` jika belum login
- **Logout:** Clear cookie/localStorage, redirect ke `/`

### Flow:
```
Pengunjung → /admin → middleware auth → belum login → /admin/login
Login sukses → set cookie → redirect /admin/dashboard
Admin akses /template/[slug] → tombol Download ZIP muncul
```

---

## 📥 Sistem Download ZIP

### Opsi A — Static ZIP (Rekomendasi untuk MVP):
- File ZIP sudah disiapkan manual di `public/templates/[slug].zip`
- Endpoint: `GET /templates/[slug].zip`
- Tombol download trigger langsung via `<a href="...zip" download>`
- Hanya tampil jika `isAdmin === true` (dari store)

### Opsi B — Dynamic ZIP (Advanced):
- Gunakan library `JSZip` + `FileSaver.js`
- Fetch semua file dari folder template via API
- Generate ZIP di client-side
- Trigger download

> **Gunakan Opsi A untuk MVP** — lebih simple, performan, dan tidak perlu API khusus.

---

## 🗺️ Roadmap Pengerjaan (Urutan Eksekusi untuk AI Agent)

### Phase 0 — Setup (30 menit)
```
[ ] Inisialisasi proyek Nuxt 3 baru
[ ] Install dependencies (Tailwind, Pinia, VueUse, Iconify)
[ ] Konfigurasi nuxt.config.ts
[ ] Konfigurasi tailwind.config.ts (font, warna brand)
[ ] Setup struktur folder sesuai arsitektur di atas
[ ] Buat data/templates.json dengan 17 entri placeholder
```

### Phase 1 — Buat 17 Template HTML (Core deliverable)
```
[ ] Template 01: Hijau Damai
[ ] Template 02: Biru Langit
[ ] Template 03: Emas Mulia
[ ] Template 04: Merah Marun
[ ] Template 05: Hijau Tosca
[ ] Template 06: Putih Bersih
[ ] Template 07: Coklat Pesantren
[ ] Template 08: Ungu Ilmu
[ ] Template 09: Abu Formal (Dark Mode)
[ ] Template 10: Hijau Mint
[ ] Template 11: Biru Quran
[ ] Template 12: Krem Santri
[ ] Template 13: Hitam Elegan
[ ] Template 14: Hijau Nusantara
[ ] Template 15: Biru Langit Muda
[ ] Template 16: Orange Semangat
[ ] Template 17: Dua Warna Klasik
[ ] Screenshot/thumbnail setiap template (1280x800px)
[ ] ZIP setiap template folder
```

### Phase 2 — Layout & Komponen Utama
```
[ ] layouts/default.vue — AppHeader + AppFooter
[ ] layouts/admin.vue — Sidebar admin
[ ] components/layout/AppHeader.vue
[ ] components/layout/AppFooter.vue
[ ] components/ui/BadgeTag.vue
[ ] components/ui/SearchInput.vue
[ ] components/catalog/FilterBar.vue
[ ] stores/templates.ts — fetch + filter logic
```

### Phase 3 — Halaman Katalog (/)
```
[ ] pages/index.vue — layout utama katalog
[ ] components/catalog/TemplateCard.vue — card dengan hover preview
[ ] components/catalog/TemplateGrid.vue — responsive grid
[ ] Implementasi filter: tema, warna, pencarian
[ ] Implementasi badge "Baru" dan "Unggulan"
[ ] Animasi card (fade-in staggered)
```

### Phase 4 — Halaman Detail (/template/[slug])
```
[ ] pages/template/[slug].vue
[ ] Iframe preview template fullwidth
[ ] Sidebar info template
[ ] Navigasi prev/next
[ ] Tombol "Lihat Fullscreen" (buka tab baru)
[ ] Tombol "Download ZIP" (conditional: hanya admin)
```

### Phase 5 — Sistem Admin
```
[ ] stores/auth.ts
[ ] middleware/auth.ts
[ ] pages/admin/login.vue
[ ] pages/admin/index.vue (dashboard + tabel template)
[ ] pages/admin/upload.vue (form upload)
[ ] server/api/templates/index.get.ts
[ ] server/api/templates/upload.post.ts
[ ] server/api/auth/login.post.ts
[ ] Integrasi composables/useDownload.ts
```

### Phase 6 — Polish & QA
```
[ ] Responsif mobile semua halaman
[ ] SEO meta tags (nuxt-seo atau manual useSeoMeta)
[ ] Loading skeleton cards
[ ] 404 page
[ ] Empty state (tidak ada hasil filter)
[ ] Uji semua 17 template di browser
[ ] Uji flow download ZIP (admin)
[ ] Uji upload template baru
[ ] Performance audit
```

---

## 📝 Aturan Penting untuk AI Agent

1. **Setiap template HTML wajib standalone** — tidak ada dependency eksternal selain Tailwind CDN
2. **Template wajib responsive** — mobile-first, breakpoint sm/md/lg
3. **Konten template adalah placeholder** — semua nama, nomor HP, foto adalah dummy
4. **Tidak ada database** — semua data dari `data/templates.json` (file JSON flat)
5. **Download ZIP hanya untuk admin** — cek `useAuth().isAdmin` sebelum render tombol
6. **Tidak ada registrasi user** — hanya 1 akun admin (dari env variable)
7. **Framework website katalog: Nuxt 3** — bukan template HTML-nya
8. **Template yang diunduh klien: HTML murni** — bukan Nuxt/Vue
9. **Gunakan Tailwind CDN** di template, bukan NPM Tailwind
10. **Semua gambar template** gunakan `https://placehold.co/` atau Unsplash source

---

## 🌐 Environment Variables

```env
# .env
NUXT_ADMIN_USERNAME=psdadmin
NUXT_ADMIN_PASSWORD=ppdb2026secure!
NUXT_SESSION_SECRET=your-random-secret-key-here
```

---

## 🚀 Deployment

### Recommended: Vercel
```bash
# Build
npx nuxi build

# Deploy
vercel deploy --prod
```

### Folder `public/templates/` harus di-commit ke repo atau:
- Gunakan Vercel Blob Storage untuk file ZIP
- Atau simpan di GitHub LFS

---

## ✅ Definition of Done

Proyek dianggap selesai jika:

- [ ] 17 template HTML dapat diakses via browser
- [ ] Halaman katalog menampilkan semua template dengan filter berfungsi
- [ ] Admin dapat login dan mengunduh ZIP template
- [ ] Admin dapat menambah template baru via form upload
- [ ] Template baru yang diupload langsung muncul di katalog
- [ ] Website responsif di mobile, tablet, desktop
- [ ] Semua template dapat di-preview dalam iframe
- [ ] ZIP yang diunduh berisi file HTML siap pakai (Tailwind CDN)

---

*Roadmap ini dibuat untuk proyek "PSD Web PPDB Katalog" — © 2026 Pesantren Smart Digital*
