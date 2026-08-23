<template>
  <div>
    <useSeoMeta
      title="PSD Web PPDB Katalog — Template Website Pesantren"
      :description="`Katalog template website PPDB siap pakai untuk Pondok Pesantren. Pilih dari ${store.totalTemplates}+ desain profesional.`"
    />

    <!-- Hero Section -->
    <section class="relative flex items-center overflow-hidden pt-32 pb-40 lg:pt-40 lg:pb-48 bg-psd-green text-white" style="background-image: url('data:image/svg+xml,%3Csvg width=\'100\' height=\'20\' viewBox=\'0 0 100 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.735-5.197-1.575-8.244-2.653C65.666 14.195 59.554 11.968 50 11.968c-9.643 0-16.196 2.37-25.766 5.672-3.238 1.117-6.07 1.962-8.683 2.682h5.633zM28.452 8.35c3.06-.47 6.326-.743 9.77-.743 17.585 0 28.528 7.058 35.15 13.393h6.233c-7.77-7.61-20.252-14.393-41.383-14.393-4.717 0-9.124.443-13.155 1.144L28.452 8.35z\' fill=\'%23136f60\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'/%3E%3C/svg%3E');">
      <!-- Glow effects -->
      <div class="absolute top-10 left-1/4 w-72 h-72 bg-white/5 rounded-full filter blur-3xl pointer-events-none"></div>
      <div class="absolute bottom-10 right-1/4 w-96 h-96 bg-psd-yellow/10 rounded-full filter blur-3xl pointer-events-none"></div>

      <!-- Waves Bottom Decoration -->
      <div class="absolute bottom-0 w-full translate-y-px z-10">
          <svg viewBox="0 0 1440 320" class="w-full h-auto text-white fill-current block">
              <path fill-opacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
      </div>

      <div class="container mx-auto px-6 relative z-20">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <!-- Left: Text -->
              <div class="lg:col-span-7 text-center lg:text-left" data-aos="fade-right">
                  <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-psd-yellow border border-white/20 rounded-full px-4 py-1.5 text-sm mb-6">
                    <span class="w-2 h-2 rounded-full bg-psd-yellow animate-pulse"></span>
                    {{ store.totalTemplates }} Template Siap Pakai
                  </div>

                  <h1 class="font-poppins text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 uppercase">
                    Template Web PPDB<br />
                    <span class="text-psd-yellow">Pesantren, Islamic Boarding School & Madrasah</span>
                  </h1>
                  
                  <!-- Yellow Underline -->
                  <div class="mb-8 flex justify-center lg:justify-start">
                      <svg width="120" height="12" viewBox="0 0 150 15" class="text-psd-yellow md:w-[150px] md:h-[15px]">
                          <path d="M0 10c15 0 15-7 30-7s15 7 30 7 15-7 30-7 15 7 30 7 15-7 30-7" stroke="currentColor" stroke-width="6" stroke-linecap="round" fill="none"/>
                      </svg>
                  </div>

                  <p class="font-poppins text-gray-200 text-base md:text-lg mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                    Pilih dari koleksi template siap pakai untuk website PPDB pesantren Anda.
                  </p>

                  <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <a href="#katalog" class="bg-psd-yellow text-psd-green font-bold text-base px-8 py-4 rounded-full hover:bg-white transition shadow-lg flex items-center justify-center gap-2">
                      <Icon name="heroicons:squares-2x2" />
                      Lihat Semua Template
                    </a>
                  </div>
              </div>

              <!-- Right: Stats -->
              <div class="lg:col-span-5 text-center lg:text-right grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 mt-12 lg:mt-0" data-aos="fade-left">
                  <div class="bg-white/5 backdrop-blur-md rounded-[2rem] p-6 border border-white/10 hover:bg-white/10 transition duration-300">
                      <h3 class="text-sm md:text-base text-psd-yellow mb-2 uppercase tracking-wider">Total</h3>
                      <div class="text-3xl md:text-5xl font-bold text-white mb-1">{{ store.totalTemplates }}</div>
                      <p class="text-gray-300 text-xs">Template</p>
                  </div>
                  <div class="bg-white/5 backdrop-blur-md rounded-[2rem] p-6 border border-white/10 hover:bg-white/10 transition duration-300">
                      <h3 class="text-sm md:text-base text-psd-yellow mb-2 uppercase tracking-wider">Varian</h3>
                      <div class="text-3xl md:text-5xl font-bold text-white mb-1">{{ store.totalColorSchemes }}</div>
                      <p class="text-gray-300 text-xs">Warna Tema</p>
                  </div>
                  <div class="col-span-2 md:col-span-1 bg-white/5 backdrop-blur-md rounded-[2rem] p-6 border border-white/10 hover:bg-white/10 transition duration-300">
                      <h3 class="text-sm md:text-base text-psd-yellow mb-2 uppercase tracking-wider">Akses</h3>
                      <div class="text-3xl md:text-5xl font-bold text-white mb-1">100%</div>
                      <p class="text-gray-300 text-xs">Gratis</p>
                  </div>
              </div>
          </div>
      </div>
    </section>

    <!-- Main Content -->
    <section id="katalog" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-20 bg-white rounded-t-[2rem] -mt-8 shadow-sm">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Sidebar Filter -->
        <aside class="lg:w-72 shrink-0">
          <div class="sticky top-20">
            <h2 class="font-display text-lg font-semibold text-gray-800 mb-4">Filter Template</h2>
            <FilterBar />
          </div>
        </aside>

        <!-- Template Grid -->
        <div class="flex-1">
          <!-- Loading state -->
          <div v-if="store.loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="n in 6" :key="n" class="rounded-2xl overflow-hidden border border-gray-100">
              <div class="aspect-video skeleton"></div>
              <div class="p-4 space-y-3">
                <div class="skeleton h-5 w-3/4 rounded"></div>
                <div class="skeleton h-3 w-full rounded"></div>
                <div class="skeleton h-3 w-2/3 rounded"></div>
              </div>
            </div>
          </div>

          <!-- Error state -->
          <div v-else-if="store.error" class="py-20 text-center">
            <Icon name="heroicons:exclamation-triangle" class="text-5xl text-red-400 mb-4" />
            <p class="text-gray-600 mb-4">{{ store.error }}</p>
            <button @click="store.fetchTemplates()" class="btn-primary text-sm">Coba Lagi</button>
          </div>

          <!-- Grid -->
          <TemplateGrid
            v-else
            :templates="store.filteredTemplates"
            :total="store.totalTemplates"
            @reset-filters="store.resetFilters()"
          />
        </div>
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
  description:
    `Katalog template website PPDB siap pakai untuk Pondok Pesantren. Pilih dari ${store.totalTemplates}+ desain profesional, download ZIP, langsung pasang.`,
  ogTitle: 'PSD Web PPDB Katalog',
  ogDescription: 'Template website pesantren profesional siap pakai',
})
</script>
