<template>
  <section class="w-full py-12">
    <div class="max-w-3xl mx-auto flex flex-col gap-8">
      <!-- Section Header -->
      <div class="text-center">
        <span class="text-xs text-psd-green-800 uppercase font-bold tracking-widest block mb-1">
          Pertanyaan Umum
        </span>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-psd-ink tracking-tight">
          Frequently Asked Questions
        </h2>
        <p class="text-sm text-psd-muted mt-2 max-w-xl mx-auto">
          Informasi penting seputar penggunaan template website PPDB dan integrasi ekosistem Pesantren Smart Digital.
        </p>
      </div>

      <!-- FAQ Accordion List -->
      <div class="flex flex-col gap-3">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="bg-white rounded-2xl border border-psd-line shadow-sm overflow-hidden transition-all duration-200"
          :class="{ 'border-psd-mint ring-1 ring-psd-mint/50': openIndex === index }"
        >
          <button
            type="button"
            class="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm text-psd-ink hover:text-psd-green-800 transition-colors"
            @click="toggleFaq(index)"
          >
            <span>{{ faq.question }}</span>
            <span
              class="material-symbols-outlined text-psd-muted text-[20px] transition-transform duration-300 shrink-0"
              :class="{ 'rotate-180 text-psd-green-800': openIndex === index }"
            >
              expand_more
            </span>
          </button>

          <div
            v-show="openIndex === index"
            class="px-5 pb-4 pt-1 text-xs sm:text-sm text-psd-muted leading-relaxed border-t border-gray-100/80 animate-fade-in"
          >
            {{ faq.answer }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const openIndex = ref<number | null>(0)

const toggleFaq = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index
}

const faqs = [
  {
    question: 'Apakah pembuatan website PPDB ini gratis untuk mitra PSD?',
    answer:
      'Pilihan desain template dalam katalog ini bebas dipilih, namun terdapat biaya tambahan untuk proses pembuatan, kustomisasi, dan setup teknis website PPDB lembaga Anda. Untuk rincian biaya dapat dikonsultasikan langsung dengan pendamping dari yayasan masing-masing.',
  },
  {
    question: 'Bagaimana cara menghubungkan template dengan domain resmi pondok kami?',
    answer:
      'Tim teknis PSD akan memandu proses pointing DNS dari domain pondok Anda (misal: pendaftaran.namaponpes.ponpes.id). Proses konfigurasi berlangsung cepat dengan sertifikat SSL gratis (HTTPS) otomatis terpasang.',
  },
  {
    question: 'Apakah tim PSD membantu proses upload logo, visi misi, dan galeri foto pondok?',
    answer:
      'Tentu saja. Anda cukup menyediakan materi dasar (logo lembaga, foto media lingkungan dan kegiatan di pesantren, teks profil, deskripsi program dan kegiatan, program unggulan (jika ada), dan kontak person panitia PPDB), dan tim pendamping PSD akan membantu proses input hingga website siap digunakan santri baru.',
  },
  {
    question: 'Apakah formulir pendaftaran bisa disesuaikan dengan jalur seleksi pondok?',
    answer:
      'Sangat bisa. Anda dapat mengaktifkan jalur reguler, jalur beasiswa tahfidz, jalur prestasi akademik, maupun jalur pindahan dengan kolom isian data wali dan berkas yang dapat disesuaikan kebutuhan panitia PPDB pondok Anda.',
  },
]
</script>
