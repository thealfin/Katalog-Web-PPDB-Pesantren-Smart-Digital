<template>
  <section class="w-full py-8 sm:py-12 font-sans">
    <div
      class="bg-[#0A5C4F] rounded-3xl p-6 sm:p-10 lg:p-12 text-white shadow-xl relative overflow-hidden border border-white/15"
      style="background-image: url('data:image/svg+xml,%3Csvg width=\'100\' height=\'20\' viewBox=\'0 0 100 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.735-5.197-1.575-8.244-2.653C65.666 14.195 59.554 11.968 50 11.968c-9.643 0-16.196 2.37-25.766 5.672-3.238 1.117-6.07 1.962-8.683 2.682h5.633zM28.452 8.35c3.06-.47 6.326-.743 9.77-.743 17.585 0 28.528 7.058 35.15 13.393h6.233c-7.77-7.61-20.252-14.393-41.383-14.393-4.717 0-9.124.443-13.155 1.144L28.452 8.35z\' fill=\'%23136f60\' fill-opacity=\'0.45\' fill-rule=\'evenodd\'/%3E%3C/svg%3E');"
    >
      <!-- Background Ambient Glow Accents -->
      <div class="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>
      <div class="absolute left-1/3 -top-10 w-56 h-56 rounded-full bg-[#F4C430]/15 blur-2xl pointer-events-none"></div>

      <div class="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        <!-- Left & Center Content: Ecosystem Features Summary -->
        <div class="flex-1 flex flex-col gap-6">
          <!-- Eyebrow Badge -->
          <div class="flex items-center flex-wrap gap-2">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#F4C430] text-xs font-semibold backdrop-blur-sm border border-white/20 shadow-sm">
              <span class="material-symbols-outlined text-[16px]">hub</span>
              <span>Integrasi Ekosistem Pesantren Smart Digital (PSD)</span>
            </span>

            <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-200 text-[11px] font-medium border border-emerald-300/30">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Auto-Direct ke Web App PSD</span>
            </span>
          </div>

          <!-- Main Title & Value Proposition -->
          <div>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white mb-3">
              Bukan Sekadar Landing Page, Namun Terhubung Langsung ke Web App PSD
            </h2>
            <p class="text-slate-100/95 text-xs sm:text-sm md:text-base leading-relaxed max-w-3xl font-normal">
              Setiap template website PPDB yang dipilih difungsikan sebagai etalase informasi resmi pesantren yang modern dan interaktif. Ketika calon santri atau wali santri mengklik tombol <strong class="text-[#F4C430]">"Daftar Online"</strong>, sistem secara otomatis mengarahkan (<em class="italic">auto-direct</em>) ke portal Web App Pendaftaran PSD pondok Anda untuk pengisian formulir, upload berkas, dan pembayaran otomatis.
            </p>
          </div>

          <!-- 6 Key Features & Integration Benefits Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
            <!-- 1. Auto-Direct Web App PSD -->
            <div class="flex flex-col gap-2 p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm hover:bg-white/15 transition-all duration-200">
              <div class="flex items-center justify-between">
                <span class="material-symbols-outlined text-[#F4C430] text-[24px]">rocket_launch</span>
                <span class="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full bg-white/10 text-slate-200">Alur Mulus</span>
              </div>
              <h4 class="font-bold text-sm text-white">Auto-Direct Web App PSD</h4>
              <p class="text-xs text-slate-200/90 leading-relaxed">
                Tombol pendaftaran di web langsung menuju formulir resmi pondok (<code class="text-[#F4C430]">pendaftaran.[pondok].id</code>) tanpa perlu pusing setup alur terpisah.
              </p>
            </div>

            <!-- 2. Sistem Inden & Multi-Tahun Ajaran -->
            <div class="flex flex-col gap-2 p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm hover:bg-white/15 transition-all duration-200">
              <div class="flex items-center justify-between">
                <span class="material-symbols-outlined text-[#F4C430] text-[24px]">event_upcoming</span>
                <span class="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full bg-white/10 text-slate-200">Multi-TA</span>
              </div>
              <h4 class="font-bold text-sm text-white">Pendaftaran &amp; Inden Kuota</h4>
              <p class="text-xs text-slate-200/90 leading-relaxed">
                Mendukung pembukaan PPDB reguler maupun sistem inden untuk tahun ajaran mendatang (misal TA 2027/2028) agar kuota santri aman lebih awal.
              </p>
            </div>

            <!-- 3. Database Santri Terintegrasi -->
            <div class="flex flex-col gap-2 p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm hover:bg-white/15 transition-all duration-200">
              <div class="flex items-center justify-between">
                <span class="material-symbols-outlined text-[#F4C430] text-[24px]">database</span>
                <span class="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full bg-white/10 text-slate-200">Aman &amp; Rapi</span>
              </div>
              <h4 class="font-bold text-sm text-white">Database Santri Baru</h4>
              <p class="text-xs text-slate-200/90 leading-relaxed">
                Biodata, upload KK, akta kelahiran, dan rapor tersimpan terpusat di cloud PSD. Bebas risiko berkas tercecer di formulir manual atau Excel.
              </p>
            </div>

            <!-- 4. Virtual Account & Payment Otomatis -->
            <div class="flex flex-col gap-2 p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm hover:bg-white/15 transition-all duration-200">
              <div class="flex items-center justify-between">
                <span class="material-symbols-outlined text-[#F4C430] text-[24px]">payments</span>
                <span class="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full bg-white/10 text-slate-200">Real-Time</span>
              </div>
              <h4 class="font-bold text-sm text-white">VA &amp; QRIS Otomatis</h4>
              <p class="text-xs text-slate-200/90 leading-relaxed">
                Biaya registrasi dan uang pangkal otomatis terbit lewat Virtual Account Bank &amp; QRIS resmi tanpa perlu kirim bukti transfer manual.
              </p>
            </div>

            <!-- 5. Notifikasi WhatsApp Gateway -->
            <div class="flex flex-col gap-2 p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm hover:bg-white/15 transition-all duration-200">
              <div class="flex items-center justify-between">
                <span class="material-symbols-outlined text-[#F4C430] text-[24px]">chat</span>
                <span class="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full bg-white/10 text-slate-200">Otomatis WA</span>
              </div>
              <h4 class="font-bold text-sm text-white">Notifikasi WhatsApp</h4>
              <p class="text-xs text-slate-200/90 leading-relaxed">
                Wali santri otomatis menerima nomor registrasi, instruksi tes, reminder pembayaran, hingga kuitansi dan kelulusan langsung ke WhatsApp.
              </p>
            </div>

            <!-- 6. Dashboard Manajemen Panitia PPDB -->
            <div class="flex flex-col gap-2 p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm hover:bg-white/15 transition-all duration-200">
              <div class="flex items-center justify-between">
                <span class="material-symbols-outlined text-[#F4C430] text-[24px]">dashboard</span>
                <span class="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full bg-white/10 text-slate-200">Pantau 24/7</span>
              </div>
              <h4 class="font-bold text-sm text-white">Dashboard Panitia PPDB</h4>
              <p class="text-xs text-slate-200/90 leading-relaxed">
                Panitia pondok dapat memverifikasi berkas, menjadwalkan tes seleksi/wawancara, cetak kartu ujian, dan memantau kuota secara real-time.
              </p>
            </div>
          </div>
        </div>

        <!-- Right Call to Action Card ("Butuh Pendampingan?") -->
        <div
          class="w-full lg:w-80 shrink-0 bg-white p-6 sm:p-7 rounded-3xl shadow-2xl flex flex-col gap-5 text-center border border-white/30 self-center my-auto"
          style="color: #0f172a;"
        >
          <div class="w-14 h-14 rounded-2xl bg-[#0A5C4F]/10 text-[#0A5C4F] flex items-center justify-center mx-auto border border-[#0A5C4F]/20">
            <span class="material-symbols-outlined text-[30px]">support_agent</span>
          </div>

          <div>
            <span class="text-[11px] font-extrabold text-[#0A5C4F] uppercase tracking-wider block mb-1">
              Pendampingan Setup PPDB
            </span>
            <h3 class="text-lg font-extrabold text-slate-900" style="color: #0f172a !important;">
              Butuh Integrasi ke Web App PSD?
            </h3>
            <p class="text-xs text-slate-600 mt-2 leading-relaxed font-normal" style="color: #475569 !important;">
              Tim teknis Pesantren Smart Digital siap membantu setup domain pondok, custom formulir santri, hingga integrasi payment gateway dan WhatsApp notifikasi.
            </p>
          </div>

          <div class="pt-1 border-t border-slate-100 flex flex-col gap-2.5">
            <a
              href="https://wa.me/6287787243916?text=Halo%20Alfin%20dari%20Tim%20PSD,%20kami%20ingin%20konsultasi%20setup%20website%20PPDB%20dan%20integrasinya%20dengan%20aplikasi%20Pesantren%20Smart%20Digital"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full py-3.5 rounded-xl bg-[#F4C430] text-[#0A5C4F] font-extrabold text-xs hover:bg-[#0A5C4F] hover:text-white hover:shadow-lg transition-all duration-300 shadow-md flex items-center justify-center gap-2 active:translate-y-0.5 group"
            >
              <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 fill-current shrink-0">
                <title>WhatsApp</title>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>Konsultasi Gratis via WhatsApp</span>
            </a>

            <div class="text-[11px] text-slate-500 flex items-center justify-center gap-1">
              <span class="material-symbols-outlined text-[14px] text-[#0A5C4F]">check_circle</span>
              <span>Dukungan langsung oleh Tim Web PSD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>
