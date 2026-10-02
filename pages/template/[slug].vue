<template>
  <div class="min-h-screen bg-psd-cream text-psd-ink font-sans pb-16">
    <!-- Loading State -->
    <div v-if="pending" class="min-h-[70vh] flex items-center justify-center">
      <div class="text-center">
        <div class="w-12 h-12 border-4 border-[#0A5C4F]/20 border-t-[#0A5C4F] rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-slate-500 text-sm font-medium">Memuat preview template...</p>
      </div>
    </div>

    <!-- Not Found State -->
    <div v-else-if="!template" class="min-h-[70vh] flex items-center justify-center px-4">
      <div class="text-center max-w-md bg-white p-8 rounded-3xl border border-slate-200/80 shadow-lg">
        <div class="w-16 h-16 rounded-full bg-emerald-50 text-[#0A5C4F] flex items-center justify-center mx-auto mb-4 border border-emerald-100">
          <span class="material-symbols-outlined text-[32px]">search_off</span>
        </div>
        <h1 class="text-2xl font-extrabold text-slate-900 mb-2 font-sans">Template Tidak Ditemukan</h1>
        <p class="text-slate-500 text-sm mb-6 font-sans">Template dengan slug "{{ route.params.slug }}" tidak terdaftar dalam katalog.</p>
        <NuxtLink to="/" class="btn-primary text-xs px-6 py-3 rounded-xl inline-flex items-center gap-1.5 font-sans">
          <span class="material-symbols-outlined text-[16px]">arrow_back</span>
          <span>Kembali ke Katalog</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Template Detail Content -->
    <div v-else>
      <!-- Top Navigation Bar (Non-floating, Static document flow) -->
      <nav class="bg-white border-b border-slate-200/80 shadow-sm relative">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <!-- Left: Breadcrumb Back Link -->
          <div class="flex items-center gap-2 text-xs sm:text-sm">
            <NuxtLink
              to="/"
              class="inline-flex items-center gap-1.5 font-semibold text-slate-600 hover:text-[#0A5C4F] transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-100"
            >
              <span class="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>Kembali ke Katalog</span>
            </NuxtLink>
            <span class="text-slate-300">/</span>
            <span class="font-bold text-[#0A5C4F] truncate max-w-[180px] sm:max-w-none">{{ template.name }}</span>
          </div>

          <!-- Right: Previous / Next Quick Jump Links -->
          <div class="flex items-center gap-2">
            <NuxtLink
              v-if="prevTemplate"
              :to="`/template/${prevTemplate.slug}`"
              class="text-xs font-semibold text-slate-600 hover:text-[#0A5C4F] hover:bg-slate-100 transition-all flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200/80"
              title="Template Sebelumnya"
            >
              <span class="material-symbols-outlined text-[16px]">chevron_left</span>
              <span class="hidden sm:inline">{{ prevTemplate.name }}</span>
            </NuxtLink>

            <NuxtLink
              v-if="nextTemplate"
              :to="`/template/${nextTemplate.slug}`"
              class="text-xs font-semibold text-slate-600 hover:text-[#0A5C4F] hover:bg-slate-100 transition-all flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200/80"
              title="Template Berikutnya"
            >
              <span class="hidden sm:inline">{{ nextTemplate.name }}</span>
              <span class="material-symbols-outlined text-[16px]">chevron_right</span>
            </NuxtLink>
          </div>
        </div>
      </nav>

      <!-- Main Layout -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex flex-col xl:flex-row gap-8 items-start">
          <!-- Left: Apple-Style Safari Browser Window Mockup Frame -->
          <div class="flex-1 w-full">
            <div class="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-300/80 transition-all duration-300">
              <!-- Apple macOS Window Header (Traffic Light Dots + Safari URL Bar) -->
              <div class="bg-[#1E222B] border-b border-slate-700/80 px-4 py-3 flex items-center justify-between gap-4">
                <!-- 3 Classic Apple Traffic Light Dots -->
                <div class="flex items-center gap-2 shrink-0">
                  <span class="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/80 shadow-sm inline-block" title="Tutup"></span>
                  <span class="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/80 shadow-sm inline-block" title="Minimalkan"></span>
                  <span class="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/80 shadow-sm inline-block" title="Perbesar"></span>
                </div>

                <!-- Safari-Style Centered Address Bar -->
                <div class="flex-1 max-w-md mx-2 sm:mx-6">
                  <div class="bg-black/35 hover:bg-black/45 border border-white/10 rounded-xl px-3.5 py-1.5 flex items-center justify-center gap-2 shadow-inner transition-colors">
                    <span class="material-symbols-outlined text-emerald-400 text-[14px]">lock</span>
                    <span class="text-xs text-slate-300 font-mono tracking-tight truncate">
                      ppdb.{{ template.slug }}.ponpes.id
                    </span>
                  </div>
                </div>

                <!-- Window Action & Device Switcher Controls -->
                <div class="flex items-center gap-2 shrink-0">
                  <!-- Responsive Viewport Switcher -->
                  <div class="hidden sm:flex items-center bg-black/35 p-1 rounded-xl border border-white/10">
                    <button
                      type="button"
                      @click="activeDevice = 'desktop'"
                      :class="activeDevice === 'desktop' ? 'bg-[#0A5C4F] text-white shadow' : 'text-slate-400 hover:text-white'"
                      class="p-1 rounded-lg text-xs transition-colors flex items-center justify-center"
                      title="Tampilan Desktop (100%)"
                    >
                      <span class="material-symbols-outlined text-[16px]">desktop_windows</span>
                    </button>
                    <button
                      type="button"
                      @click="activeDevice = 'tablet'"
                      :class="activeDevice === 'tablet' ? 'bg-[#0A5C4F] text-white shadow' : 'text-slate-400 hover:text-white'"
                      class="p-1 rounded-lg text-xs transition-colors flex items-center justify-center"
                      title="Tampilan Tablet (768px)"
                    >
                      <span class="material-symbols-outlined text-[16px]">tablet_mac</span>
                    </button>
                    <button
                      type="button"
                      @click="activeDevice = 'mobile'"
                      :class="activeDevice === 'mobile' ? 'bg-[#0A5C4F] text-white shadow' : 'text-slate-400 hover:text-white'"
                      class="p-1 rounded-lg text-xs transition-colors flex items-center justify-center"
                      title="Tampilan Smartphone (390px)"
                    >
                      <span class="material-symbols-outlined text-[16px]">smartphone</span>
                    </button>
                  </div>

                  <!-- External Fullscreen Link -->
                  <a
                    :href="previewUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                    title="Buka Tab Baru"
                  >
                    <span class="material-symbols-outlined text-[18px]">open_in_new</span>
                  </a>
                </div>
              </div>

              <!-- Live Iframe Viewport Container with Responsive Wrapper -->
              <div class="relative bg-slate-900/30 overflow-hidden flex justify-center items-stretch" style="height: 74vh; min-height: 540px;">
                <div
                  class="h-full transition-all duration-300 shadow-2xl relative bg-white"
                  :style="{ width: deviceWidth }"
                >
                  <iframe
                    :src="previewUrl"
                    :title="`Live Preview ${template.name}`"
                    class="w-full h-full border-0"
                    sandbox="allow-scripts allow-same-origin"
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>

            <!-- Fullscreen Open Hint Below Frame -->
            <div class="mt-4 flex items-center justify-between text-xs text-slate-500 px-1 font-sans">
              <span class="flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Live Interactive Preview Mode ({{ activeDeviceLabel }})</span>
              </span>

              <a
                :href="previewUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 font-bold text-[#0A5C4F] hover:underline"
              >
                <span>Buka preview di tab baru</span>
                <span class="material-symbols-outlined text-[15px]">open_in_new</span>
              </a>
            </div>
          </div>

          <!-- Right: Apple-Style Information Sidebar Card -->
          <aside class="w-full xl:w-96 shrink-0">
            <div class="space-y-6">
              <!-- Template Info Card -->
              <div class="bg-white rounded-3xl border border-slate-200/80 shadow-lg p-6 flex flex-col gap-6">
                <!-- Color Swatch + Title (Plus Jakarta Sans) -->
                <div class="flex items-start gap-4">
                  <div
                    class="w-12 h-12 rounded-2xl shadow-md border-2 border-white flex items-center justify-center shrink-0 mt-0.5"
                    :style="{ backgroundColor: template.colorPrimary }"
                    :title="`Palet Utama: ${template.colorPrimary}`"
                  ></div>

                  <div class="flex-1">
                    <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight leading-tight font-sans">
                      {{ template.name }}
                    </h1>

                    <div class="flex items-center flex-wrap gap-2 mt-2">
                      <!-- Badge Baru (Google Material Icon, No Emotes) -->
                      <span
                        v-if="template.isNew"
                        class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#0A5C4F] text-white text-[11px] font-semibold shadow-sm font-sans"
                      >
                        <span class="material-symbols-outlined text-[13px]">bolt</span>
                        <span>Baru</span>
                      </span>

                      <!-- Badge Unggulan (Google Material Icon, No Emotes) -->
                      <span
                        v-if="template.isFeatured"
                        class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#F4C430] text-[#0A5C4F] text-[11px] font-bold shadow-sm font-sans"
                      >
                        <span class="material-symbols-outlined text-[13px]">star</span>
                        <span>Unggulan</span>
                      </span>

                      <span class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium capitalize border border-slate-200 font-sans">
                        {{ template.style }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Description (Plus Jakarta Sans) -->
                <p class="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
                  {{ template.description }}
                </p>

                <!-- Features Badges (No Emotes, Google Material Icons) -->
                <div>
                  <span class="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2.5 font-sans">
                    Fitur Tersedia
                  </span>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="feature in template.features"
                      :key="feature"
                      class="text-xs px-3 py-1 bg-emerald-50 text-[#0A5C4F] rounded-xl border border-emerald-100/80 font-medium capitalize flex items-center gap-1 font-sans"
                    >
                      <span class="material-symbols-outlined text-[14px]">check</span>
                      <span>{{ feature }}</span>
                    </span>
                  </div>
                </div>

                <!-- Tags -->
                <div>
                  <span class="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2.5 font-sans">
                    Kategori &amp; Tag
                  </span>
                  <div class="flex flex-wrap gap-1.5">
                    <span
                      v-for="tag in template.tags"
                      :key="tag"
                      class="text-[11px] px-2.5 py-0.5 bg-slate-50 text-slate-600 rounded-lg border border-slate-200/80 font-medium font-sans"
                    >
                      #{{ tag }}
                    </span>
                  </div>
                </div>

                <!-- Meta Specifications (Apple Settings Group Style) -->
                <div class="border-t border-slate-100 pt-4 space-y-2.5 text-xs sm:text-sm font-sans">
                  <div class="flex justify-between items-center py-1">
                    <span class="text-slate-500 font-normal">Warna Skema</span>
                    <span class="font-bold text-slate-800 capitalize">{{ template.colorScheme }}</span>
                  </div>
                  <div class="flex justify-between items-center py-1 border-t border-slate-100">
                    <span class="text-slate-500 font-normal">Tema Visual</span>
                    <span class="font-bold text-slate-800 capitalize">{{ template.theme }}</span>
                  </div>
                  <div class="flex justify-between items-center py-1 border-t border-slate-100">
                    <span class="text-slate-500 font-normal">Jumlah Halaman</span>
                    <span class="font-bold text-slate-800">{{ template.pages }} halaman</span>
                  </div>
                  <div class="flex justify-between items-center py-1 border-t border-slate-100">
                    <span class="text-slate-500 font-normal">Dibuat</span>
                    <span class="font-bold text-slate-800">{{ formatDate(template.createdAt) }}</span>
                  </div>
                </div>

                <!-- Action CTA Buttons (Hero Green, Yellow on Hover) -->
                <div class="space-y-3 pt-2">
                  <!-- WhatsApp Direct Lead Button to Mas Alfin (6287787243916) -->
                  <a
                    :href="whatsappUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="w-full py-3.5 px-4 rounded-xl bg-[#0A5C4F] text-white font-extrabold text-xs hover:bg-[#F4C430] hover:text-[#0A5C4F] hover:shadow-lg transition-all duration-300 shadow-md flex items-center justify-center gap-2 active:translate-y-0.5 font-sans"
                  >
                    <span class="material-symbols-outlined text-[18px]">chat</span>
                    <span>Pilih Template Ini via WhatsApp</span>
                  </a>

                  <!-- Fullscreen Live Button -->
                  <a
                    :href="previewUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="w-full py-3 px-4 rounded-xl bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200 font-bold text-xs transition-all duration-200 flex items-center justify-center gap-2 shadow-sm font-sans"
                  >
                    <span class="material-symbols-outlined text-[16px]">visibility</span>
                    <span>Buka Preview Fullscreen</span>
                  </a>

                  <!-- Admin Download ZIP button (Hanya tampil jika user adalah administrator) -->
                  <DownloadButton
                    v-if="authStore.isAdmin"
                    :zip-path="zipDownloadPath"
                    :template-name="template.name"
                    class="w-full justify-center"
                  />
                </div>
              </div>

              <!-- Quick Prev / Next Cards -->
              <div class="grid grid-cols-2 gap-3 font-sans">
                <NuxtLink
                  v-if="prevTemplate"
                  :to="`/template/${prevTemplate.slug}`"
                  class="flex flex-col items-start p-3.5 bg-white rounded-2xl border border-slate-200/80 hover:border-[#0A5C4F]/40 hover:shadow-md transition-all duration-200 group"
                >
                  <span class="text-[11px] text-slate-400 mb-1 flex items-center gap-1 font-medium">
                    <span class="material-symbols-outlined text-[14px]">arrow_back</span>
                    Sebelumnya
                  </span>
                  <span class="text-xs font-bold text-slate-800 group-hover:text-[#0A5C4F] transition-colors truncate w-full">
                    {{ prevTemplate.name }}
                  </span>
                </NuxtLink>
                <div v-else></div>

                <NuxtLink
                  v-if="nextTemplate"
                  :to="`/template/${nextTemplate.slug}`"
                  class="flex flex-col items-end p-3.5 bg-white rounded-2xl border border-slate-200/80 hover:border-[#0A5C4F]/40 hover:shadow-md transition-all duration-200 group"
                >
                  <span class="text-[11px] text-slate-400 mb-1 flex items-center gap-1 font-medium">
                    Berikutnya
                    <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </span>
                  <span class="text-xs font-bold text-slate-800 group-hover:text-[#0A5C4F] transition-colors truncate w-full text-right">
                    {{ nextTemplate.name }}
                  </span>
                </NuxtLink>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useTemplatesStore } from '~/stores/templates'

const route = useRoute()
const authStore = useAuthStore()
const templatesStore = useTemplatesStore()

onMounted(() => authStore.init())

const slug = computed(() => route.params.slug as string)

const { data: template, pending } = await useAsyncData(
  `template-${slug.value}`,
  () => $fetch(`/api/templates/${slug.value}`),
)

const previewUrl = computed(() => {
  if (template.value?.previewUrl) return template.value.previewUrl
  return `/api/templates/preview/${slug.value}/index.html`
})

const zipDownloadPath = computed(() => {
  return template.value?.zipPath || template.value?.zipUrl || ''
})

// Load all templates for prev/next navigation
if (templatesStore.templates.length === 0) {
  await useAsyncData('templates', () => templatesStore.fetchTemplates())
}

const currentIndex = computed(() => templatesStore.templateIndex(slug.value))
const prevTemplate = computed(() =>
  currentIndex.value > 0 ? templatesStore.templates[currentIndex.value - 1] : null,
)
const nextTemplate = computed(() =>
  currentIndex.value < templatesStore.templates.length - 1
    ? templatesStore.templates[currentIndex.value + 1]
    : null,
)

// Responsive preview device modes
const activeDevice = ref<'desktop' | 'tablet' | 'mobile'>('desktop')
const deviceWidth = computed(() => {
  if (activeDevice.value === 'mobile') return '390px'
  if (activeDevice.value === 'tablet') return '768px'
  return '100%'
})
const activeDeviceLabel = computed(() => {
  if (activeDevice.value === 'mobile') return 'Smartphone View'
  if (activeDevice.value === 'tablet') return 'Tablet View'
  return 'Desktop View'
})

// WhatsApp Direct Lead to Mas Alfin (Web Team PSD) at 6287787243916
const whatsappUrl = computed(() => {
  const name = template.value?.name || 'Template PPDB'
  const msg = `Halo Mas Alfin & Tim Website PSD, saya tertarik menggunakan template PPDB "${name}". Mohon informasi lebih lanjut mengenai implementasinya.`
  return `https://wa.me/6287787243916?text=${encodeURIComponent(msg)}`
})

const formatDate = (dateStr?: string) => {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

useSeoMeta({
  title: () => `${template.value?.name || 'Template'} — PSD Web PPDB Katalog`,
  description: () => template.value?.description || '',
})
</script>
