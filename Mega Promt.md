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

```text
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
📋 Struktur Data Template (templates.json)JSON[
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
Field Wajib:FieldTipeKeteranganidstringID unikslugstringURL-friendly namenamestringNama tampilan templatedescriptionstringDeskripsi singkatthemestringKategori temacolorSchemeenumgreen, blue, maroon, gold, teal, graystyleenumminimal, classic, modern, formalpagesnumberJumlah halamanfeaturesstring[]Fitur yang adatagsstring[]Tag untuk pencarianpreviewImagestringPath thumbnailzipPathstringPath file ZIP🎨 17 Template yang Harus DibuatSemua template adalah single-page HTML dengan Tailwind CSS CDN. Setiap template merepresentasikan identitas visual yang berbeda namun tetap dalam koridor: simple, formal, religi, sopan, edukatif.Daftar 17 Template:NoNamaWarna UtamaKarakterKeunikan Visual01Hijau DamaiHijau tua #166534Natural, tradisionalOrnamen daun, tekstur kertas02Biru LangitBiru navy #1e3a5fFormal, profesionalMotif gelombang laut03Emas MuliaEmas #92400e + kremMewah, prestisiusBorder ornamen emas, serif elegan04Merah MarunMarun #7f1d1dTegas, berwibawaLayout asimetris bold05Hijau ToscaTeal #0f766eSegar, modern-islamiGradien halus, rounded card06Putih BersihPutih + aksen abuUltra minimalTypografi dominan, banyak whitespace07Coklat PesantrenCoklat hangat #78350fTradisional, hangatTekstur kayu, ornamen klasik08Ungu IlmuUngu #4c1d95Spiritual, akademisMotif bintang-bintang09Abu FormalAbu gelap #1f2937Dark mode, modernGlassmorphism card10Hijau MintMint #d1fae5 + hijauCerah, ramahIlustrasi vektor sederhana11Biru QuranBiru #1d4ed8 + emasQuraniy, khidmatPattern arabesque subtle12Krem SantriKrem #fef3c7 + coklatHangat, bersahajaWatercolor wash background13Hitam EleganHitam #111827 + emasPrestisius, boldTipografi serif besar14Hijau NusantaraHijau #15803d + batikKultural-islamiMotif batik SVG subtle15Biru Langit MudaBiru muda #dbeafeRamah, freshIlustrasi awan, playful-formal16Orange SemangatOranye #c2410cEnergik, optimistisDiagonal accent lines17Dua Warna KlasikHijau + putihClassic two-toneSplit layout header🧱 Struktur HTML Setiap TemplateSetiap file index.html template wajib memiliki struktur seksi berikut (dapat dikustomisasi tampilannya):HTML1. <header>     — Navbar: Logo, nama pesantren, menu navigasi
2. #hero        — Hero section: Tagline utama + CTA "Daftar Sekarang"
3. #profil      — Profil singkat pesantren (sejarah, visi-misi)
4. #keunggulan  — 4 pilar/keunggulan (icon + teks)
5. #program     — Unit pendidikan / program pesantren
6. #galeri      — Grid foto (placeholder img)
7. #testimoni   — Kutipan alumni (1-2 card)
8. #pendaftaran — CTA pendaftaran + info kontak WhatsApp
9. #lokasi      — Embed Google Maps + alamat
10. <footer>    — Nama pesantren, sosmed, copyright
Konten Placeholder Standar:HTML<!-- Gunakan konten generik yang bisa diganti klien -->
Nama: "Pondok Pesantren [Nama Pesantren]"
Tagline: "Mencetak Generasi Qur'ani yang Berakhlak dan Berprestasi"
WhatsApp: "[https://wa.me/628xxxxxxxxx](https://wa.me/628xxxxxxxxx)"
Maps: iframe Google Maps kosong atau placeholder
Foto: Gunakan placeholder.co atau unsplash kategori islami
🖥️ Spesifikasi Halaman Website Katalog (Nuxt.js)1. Halaman Utama (/) — Katalog TemplateKomponen:Header sticky dengan logo "PSD Web PPDB Katalog" + taglineHero mini: judul halaman + deskripsi singkat platformFilterBar.vue: Filter berdasarkan tema/style + warna + pencarian keywordTemplateGrid.vue: Grid 3 kolom (desktop) / 1 kolom (mobile), berisi TemplateCard.vueFooterFilterBar:Plaintext[ 🔍 Cari template... ] [ Tema ▼ ] [ Warna ▼ ] [ Semua | Terbaru | Unggulan ]
TemplateCard.vue:Plaintext┌─────────────────────────┐
│   [Preview Image]       │
│   hover → tombol Preview│
├─────────────────────────┤
│ Nama Template           │
│ Tag: #formal #hijau     │
│ [Lihat Preview]         │
└─────────────────────────┘
2. Halaman Detail Template (/template/[slug])Konten:Iframe preview template (fullwidth, responsive)Sidebar info: nama, deskripsi, warna, fitur, tagsTombol "Download ZIP" (hanya tampil jika user adalah admin)Tombol "Lihat Fullscreen" (buka di tab baru)Navigasi prev/next template3. Halaman Admin Login (/admin/login)Form:Input username + passwordSimpan session di localStorage atau cookie httpOnlyRedirect ke /admin setelah berhasilKredensial default (hardcoded atau .env):Cuplikan kodeADMIN_USERNAME=psdadmin
ADMIN_PASSWORD=ppdb2026secure
4. Halaman Dashboard Admin (/admin)Fitur:Tabel daftar semua template (nama, slug, tema, tanggal, status)Tombol tambah template baruTombol hapus/edit templateStatus badge: Active / Draft5. Halaman Upload Template (/admin/upload)Form Upload:Plaintext- Nama Template (text)
- Slug (auto-generate dari nama, editable)
- Deskripsi (textarea)
- Tema / Style (select)
- Warna Utama (color picker + select preset)
- Tags (multi-input)
- Fitur (checkbox: galeri, peta, testimoni, dll)
- Upload Preview Image (PNG/JPG, max 2MB)
- Upload File ZIP (max 20MB)
- [ Simpan Template ]
Proses Backend:Validasi formSimpan file ke public/templates/[slug]/Update data/templates.jsonRedirect ke dashboard🔧 Cara Tambah Template via TerminalLangkah-langkah:Bash# 1. Buat folder template baru
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
Script Helper (opsional — buat file scripts/add-template.mjs):JavaScript// node scripts/add-template.mjs --name="Hijau Baru" --slug="hijau-baru" --color="green"
// Script ini otomatis menambahkan entri ke templates.json
📦 Tech Stack & DependenciesCore:JSON{
  "nuxt": "^3.x",
  "vue": "^3.x",
  "@pinia/nuxt": "latest",
  "@nuxtjs/tailwindcss": "latest"
}
Tambahan:JSON{
  "jszip": "^3.x",              // Generate ZIP di client-side
  "file-saver": "^2.x",        // Trigger download di browser
  "@vueuse/nuxt": "latest",     // Composables utility
  "nuxt-icon": "latest"         // Icon set (Iconify)
}
Tailwind Config Wajib:JavaScript// tailwind.config.ts
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
🎨 Desain Visual Website Katalog (Nuxt.js)Identitas Visual:Tone: Formal, bersih, profesional — tetapi tetap hangat dan islamiWarna Utama:Background: #FAFAF8 (putih gading)Aksen Utama: #166534 (hijau pesantren)Aksen Sekunder: #92400e (emas tua)Teks: #1a1a1aFont:Display/Judul: Playfair Display (serif, elegan)Body: Plus Jakarta Sans (sans-serif, readable)Aksen Arab: Amiri (untuk ornamen kaligrafi)Ornamen: Pattern arabesque subtle sebagai background textureHeader Website:Plaintext🕌 PSD Web PPDB Katalog
   "Solusi Digital untuk Pesantren Modern"          [Admin Login]
Footer:Plaintext© 2026 Pesantren Smart Digital
Dibuat dengan ❤️ untuk pendidikan Islam Indonesia
🔐 Sistem Autentikasi AdminSpesifikasi:Tipe: Simple credential auth (tidak perlu database)Storage: Cookie httpOnly via Nuxt server-side, atau localStorage (MVP)Middleware: auth.ts — redirect ke /admin/login jika belum loginLogout: Clear cookie/localStorage, redirect ke /Flow:PlaintextPengunjung → /admin → middleware auth → belum login → /admin/login
Login sukses → set cookie → redirect /admin/dashboard
Admin akses /template/[slug] → tombol Download ZIP muncul
📥 Sistem Download ZIPOpsi A — Static ZIP (Rekomendasi untuk MVP):File ZIP sudah disiapkan manual di public/templates/[slug].zipEndpoint: GET /templates/[slug].zipTombol download trigger langsung via <a href="...zip" download>Hanya tampil jika isAdmin === true (dari store)Opsi B — Dynamic ZIP (Advanced):Gunakan library JSZip + FileSaver.jsFetch semua file dari folder template via APIGenerate ZIP di client-sideTrigger downloadGunakan Opsi A untuk MVP — lebih simple, performan, dan tidak perlu API khusus.🗺️ Roadmap Pengerjaan (Urutan Eksekusi untuk AI Agent)Phase 0 — Setup (30 menit)Plaintext[ ] Inisialisasi proyek Nuxt 3 baru
[ ] Install dependencies (Tailwind, Pinia, VueUse, Iconify)
[ ] Konfigurasi nuxt.config.ts
[ ] Konfigurasi tailwind.config.ts (font, warna brand)
[ ] Setup struktur folder sesuai arsitektur di atas
[ ] Buat data/templates.json dengan 17 entri placeholder
Phase 1 — Buat 17 Template HTML (Core deliverable)Plaintext[ ] Template 01: Hijau Damai
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
Phase 2 — Layout & Komponen UtamaPlaintext[ ] layouts/default.vue — AppHeader + AppFooter
[ ] layouts/admin.vue — Sidebar admin
[ ] components/layout/AppHeader.vue
[ ] components/layout/AppFooter.vue
[ ] components/ui/BadgeTag.vue
[ ] components/ui/SearchInput.vue
[ ] components/catalog/FilterBar.vue
[ ] stores/templates.ts — fetch + filter logic
Phase 3 — Halaman Katalog (/)Plaintext[ ] pages/index.vue — layout utama katalog
[ ] components/catalog/TemplateCard.vue — card dengan hover preview
[ ] components/catalog/TemplateGrid.vue — responsive grid
[ ] Implementasi filter: tema, warna, pencarian
[ ] Implementasi badge "Baru" dan "Unggulan"
[ ] Animasi card (fade-in staggered)
Phase 4 — Halaman Detail (/template/[slug])Plaintext[ ] pages/template/[slug].vue
[ ] Iframe preview template fullwidth
[ ] Sidebar info template
[ ] Navigasi prev/next
[ ] Tombol "Lihat Fullscreen" (buka tab baru)
[ ] Tombol "Download ZIP" (conditional: hanya admin)
Phase 5 — Sistem AdminPlaintext[ ] stores/auth.ts
[ ] middleware/auth.ts
[ ] pages/admin/login.vue
[ ] pages/admin/index.vue (dashboard + tabel template)
[ ] pages/admin/upload.vue (form upload)
[ ] server/api/templates/index.get.ts
[ ] server/api/templates/upload.post.ts
[ ] server/api/auth/login.post.ts
[ ] Integrasi composables/useDownload.ts
Phase 6 — Polish & QAPlaintext[ ] Responsif mobile semua halaman
[ ] SEO meta tags (nuxt-seo atau manual useSeoMeta)
[ ] Loading skeleton cards
[ ] 404 page
[ ] Empty state (tidak ada hasil filter)
[ ] Uji semua 17 template di browser
[ ] Uji flow download ZIP (admin)
[ ] Uji upload template baru
[ ] Performance audit


📝 Aturan Penting untuk AI AgentSetiap template HTML wajib standalone — tidak ada dependency eksternal selain Tailwind CDNTemplate wajib responsive — mobile-first, breakpoint sm/md/lgKonten template adalah placeholder — semua nama, nomor HP, foto adalah dummyTidak ada database — semua data dari data/templates.json (file JSON flat)Download ZIP hanya untuk admin — cek useAuth().isAdmin sebelum render tombolTidak ada registrasi user — hanya 1 akun admin (dari env variable)Framework website katalog: Nuxt 3 — bukan template HTML-nyaTemplate yang diunduh klien: HTML murni — bukan Nuxt/VueGunakan Tailwind CDN di template, bukan NPM TailwindSemua gambar template gunakan https://placehold.co/ atau Unsplash sourceSistem Fail-Safe JSON — Instruksikan backend: Sebelum melakukan overwrite data baru ke templates.json, sistem wajib membuat salinan file tersebut menjadi templates_backup.json sebagai fail-safe untuk mencegah korupsi data.Penanganan Slug Collision — Jika nama/slug template yang di-upload sudah ada di database, backend harus otomatis menambahkan suffix angka (contoh: hijau-damai-2) agar tidak menimpa template lama.Validasi Konten ZIP — Gunakan library backend (seperti adm-zip) untuk memvalidasi isi file ZIP yang di-upload. Sistem harus menolak upload jika di dalam ZIP tersebut tidak ditemukan file index.html.Manajemen Media & Optimasi — Beri batasan ketat (Max 2MB) untuk upload preview image. Gunakan library seperti sharp di backend untuk otomatis mengonversi gambar ke format .webp dan me-resize resolusinya agar ringan.Perlindungan Endpoint Login — Tambahkan perlindungan rate-limiting sederhana di endpoint login (/api/auth/login.post.ts) untuk mencegah brute-force attack.🌐 Environment VariablesCuplikan kode# .env
NUXT_ADMIN_USERNAME=psdadmin
NUXT_ADMIN_PASSWORD=ppdb2026secure!
NUXT_SESSION_SECRET=your-random-secret-key-here
🚀 DeploymentRecommended: VercelBash# Build
npx nuxi build

# Deploy
vercel deploy --prod
Folder public/templates/ harus di-commit ke repo atau:Gunakan Vercel Blob Storage untuk file ZIPAtau simpan di GitHub LFS✅ Definition of DoneProyek dianggap selesai jika:[ ] 17 template HTML dapat diakses via browser[ ] Halaman katalog menampilkan semua template dengan filter berfungsi[ ] Admin dapat login dan mengunduh ZIP template[ ] Admin dapat menambah template baru via form upload[ ] Template baru yang diupload langsung muncul di katalog[ ] Website responsif di mobile, tablet, desktop[ ] Semua template dapat di-preview dalam iframe[ ] ZIP yang diunduh berisi file HTML siap pakai (Tailwind CDN)

Roadmap ini dibuat untuk proyek "PSD Web PPDB Katalog" — © 2026 Pesantren Smart Digital
```
