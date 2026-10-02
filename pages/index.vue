<template>
  <div>
    <!-- Hero Section (Retained Visual Structure & Background from Reference Image) -->
    <section
      class="relative flex items-center overflow-hidden pt-28 pb-36 lg:pt-36 lg:pb-44 bg-psd-green text-white"
      style="background-image: url('data:image/svg+xml,%3Csvg width=\'100\' height=\'20\' viewBox=\'0 0 100 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.735-5.197-1.575-8.244-2.653C65.666 14.195 59.554 11.968 50 11.968c-9.643 0-16.196 2.37-25.766 5.672-3.238 1.117-6.07 1.962-8.683 2.682h5.633zM28.452 8.35c3.06-.47 6.326-.743 9.77-.743 17.585 0 28.528 7.058 35.15 13.393h6.233c-7.77-7.61-20.252-14.393-41.383-14.393-4.717 0-9.124.443-13.155 1.144L28.452 8.35z\' fill=\'%23136f60\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'/%3E%3C/svg%3E');"
    >
      <!-- Glow ambient effects -->
      <div class="absolute top-10 left-1/4 w-72 h-72 bg-white/5 rounded-full filter blur-3xl pointer-events-none"></div>
      <div class="absolute bottom-10 right-1/4 w-96 h-96 bg-psd-yellow/10 rounded-full filter blur-3xl pointer-events-none"></div>

      <!-- Waves Bottom Decoration (Seamlessly matches #F7F8F4 background) -->
      <div class="absolute bottom-0 w-full translate-y-px z-10">
        <svg viewBox="0 0 1440 320" class="w-full h-auto text-psd-cream fill-current block">
          <path fill-opacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <!-- Left: Hero Text & CTA -->
          <div class="lg:col-span-7 text-center lg:text-left">
            <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-psd-yellow border border-white/20 rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
              <span class="w-2 h-2 rounded-full bg-psd-yellow animate-pulse"></span>
              <span>{{ store.totalTemplates }} Template Siap Pakai</span>
            </div>

            <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 uppercase tracking-tight">
              Template Web PPDB<br />
              <span class="text-psd-yellow">Pesantren, Islamic Boarding School &amp; Madrasah</span>
            </h1>

            <!-- Yellow Squiggle Underline -->
            <div class="mb-6 flex justify-center lg:justify-start">
              <svg width="120" height="12" viewBox="0 0 150 15" class="text-psd-yellow md:w-[150px] md:h-[15px]">
                <path d="M0 10c15 0 15-7 30-7s15 7 30 7 15-7 30-7 15 7 30 7 15-7 30-7" stroke="currentColor" stroke-width="6" stroke-linecap="round" fill="none"/>
              </svg>
            </div>

            <p class="text-gray-200 text-sm sm:text-base md:text-lg mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Pilih dari koleksi template siap pakai untuk website PPDB pesantren Anda.
            </p>

            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#katalog"
                class="hero-cta-btn text-sm sm:text-base active:translate-y-0.5"
              >
                <span class="material-symbols-outlined text-[20px]">grid_view</span>
                <span>Lihat Semua Template</span>
              </a>
            </div>
          </div>

          <!-- Right: Stats Cards (3 Glassmorphism Cards) -->
          <div class="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-5 mt-8 lg:mt-0">
            <div class="bg-white/5 backdrop-blur-md rounded-[2rem] p-4 sm:p-5 border border-white/10 hover:bg-white/10 transition duration-300 shadow-md flex flex-col items-center justify-center text-center">
              <h3 class="text-xs sm:text-sm text-psd-yellow mb-1.5 uppercase tracking-wider font-semibold">Total</h3>
              <div class="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-extrabold text-white mb-1">{{ store.totalTemplates }}</div>
              <p class="text-gray-300 text-xs font-medium">Template</p>
            </div>

            <div class="bg-white/5 backdrop-blur-md rounded-[2rem] p-4 sm:p-5 border border-white/10 hover:bg-white/10 transition duration-300 shadow-md flex flex-col items-center justify-center text-center">
              <h3 class="text-xs sm:text-sm text-psd-yellow mb-1.5 uppercase tracking-wider font-semibold">Varian</h3>
              <div class="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-extrabold text-white mb-1">{{ store.totalColorSchemes }}</div>
              <p class="text-gray-300 text-xs font-medium">Warna Tema</p>
            </div>

            <div class="col-span-2 md:col-span-1 bg-white/5 backdrop-blur-md rounded-[2rem] p-4 sm:p-5 border border-white/10 hover:bg-white/10 transition duration-300 shadow-md flex flex-col items-center justify-center text-center overflow-hidden">
              <h3 class="text-xs sm:text-sm text-psd-yellow mb-1.5 uppercase tracking-wider font-semibold">Akses</h3>
              <div class="text-2xl sm:text-3xl md:text-[2rem] lg:text-[2.35rem] font-extrabold text-white mb-1 tracking-tighter leading-tight whitespace-nowrap">
                100%
              </div>
              <p class="text-gray-300 text-xs font-medium">Gratis</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Catalog & Interactive Redesign Sections -->
    <section id="katalog" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-20">
      <div class="flex flex-col gap-8">
        <!-- Section Eyebrow -->
        <div class="flex items-center justify-between">
          <div>
            <span class="text-xs font-bold text-psd-green-800 uppercase tracking-widest block mb-1">
              Katalog Pilihan
            </span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-psd-ink tracking-tight">
              Eksplorasi Desain Website PPDB
            </h2>
          </div>
        </div>

        <!-- Deep Module: Horizontal Filter & Search Toolbar Suite -->
        <FilterBar />

        <!-- Template Showcase Grid Section -->
        <div>
          <!-- Loading State -->
          <div v-if="store.loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="n in 6"
              :key="n"
              class="bg-white rounded-2xl overflow-hidden border border-psd-line p-4 space-y-4 shadow-sm"
            >
              <div class="aspect-[16/10] skeleton rounded-xl"></div>
              <div class="space-y-3">
                <div class="skeleton h-5 w-3/4 rounded-lg"></div>
                <div class="skeleton h-3 w-full rounded"></div>
                <div class="skeleton h-3 w-2/3 rounded"></div>
              </div>
            </div>
          </div>

          <!-- Error State -->
          <div
            v-else-if="store.error"
            class="py-16 text-center bg-white rounded-2xl border border-psd-line p-8 shadow-sm flex flex-col items-center"
          >
            <span class="material-symbols-outlined text-4xl text-rose-500 mb-3">error_outline</span>
            <p class="text-psd-muted text-sm mb-4">{{ store.error }}</p>
            <button
              type="button"
              class="btn-primary text-xs px-5 py-2.5 rounded-xl inline-flex items-center gap-1.5"
              @click="store.fetchTemplates()"
            >
              <span class="material-symbols-outlined text-[16px]">refresh</span>
              <span>Coba Lagi</span>
            </button>
          </div>

          <!-- Deep Module: Template Grid Display -->
          <TemplateGrid
            v-else
            :templates="store.filteredTemplates"
            :total="store.totalTemplates"
            @reset-filters="store.resetFilters()"
          />
        </div>

        <!-- Deep Module: Ecosystem Integration Callout -->
        <EcosystemCallout />

        <!-- Deep Module: FAQ Accordion Section -->
        <FaqSection />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useTemplatesStore } from '~/stores/templates'

const store = useTemplatesStore()

await useAsyncData('templates', () => store.fetchTemplates())

useSeoMeta({
  title: 'PSD Web PPDB Katalog — Template Website Pesantren',
  description: `Katalog template website PPDB siap pakai untuk Pondok Pesantren. Pilih dari ${store.totalTemplates}+ desain profesional siap pakai.`,
  ogTitle: 'PSD Web PPDB Katalog',
  ogDescription: 'Template website pesantren profesional siap pakai',
})
</script>
