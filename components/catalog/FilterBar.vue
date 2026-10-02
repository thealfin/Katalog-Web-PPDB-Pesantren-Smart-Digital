<template>
  <div
    class="bg-[#0A5C4F] rounded-3xl p-5 sm:p-7 text-white shadow-xl relative overflow-hidden border border-white/15 flex flex-col gap-5"
    style="background-image: url('data:image/svg+xml,%3Csvg width=\'100\' height=\'20\' viewBox=\'0 0 100 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.735-5.197-1.575-8.244-2.653C65.666 14.195 59.554 11.968 50 11.968c-9.643 0-16.196 2.37-25.766 5.672-3.238 1.117-6.07 1.962-8.683 2.682h5.633zM28.452 8.35c3.06-.47 6.326-.743 9.77-.743 17.585 0 28.528 7.058 35.15 13.393h6.233c-7.77-7.61-20.252-14.393-41.383-14.393-4.717 0-9.124.443-13.155 1.144L28.452 8.35z\' fill=\'%23136f60\' fill-opacity=\'0.45\' fill-rule=\'evenodd\'/%3E%3C/svg%3E');"
  >
    <!-- Background Ambient Glow Accents (Matching Ecosystem section) -->
    <div class="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>
    <div class="absolute left-1/4 -top-10 w-48 h-48 rounded-full bg-[#F4C430]/15 blur-2xl pointer-events-none"></div>

    <!-- Top Eyebrow & Live Count Counter -->
    <div class="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div class="flex items-center gap-2">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#F4C430] text-xs font-semibold backdrop-blur-sm border border-white/20 shadow-sm font-sans">
          <span class="material-symbols-outlined text-[16px]">tune</span>
          <span>Filter &amp; Pencarian Template</span>
        </span>
      </div>

      <div class="flex items-center gap-2 text-xs text-white/90 font-sans">
        <span class="w-2 h-2 rounded-full bg-[#F4C430] animate-pulse"></span>
        <span>
          Menampilkan <strong class="text-[#F4C430] font-extrabold">{{ store.filteredTemplates.length }}</strong> dari {{ store.totalTemplates }} template siap pakai
        </span>
      </div>
    </div>

    <!-- Search Input Bar (High contrast white pill on green) -->
    <div class="relative z-10 w-full">
      <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
        <span class="material-symbols-outlined text-[22px]">search</span>
      </div>
      <input
        v-model="localSearch"
        type="text"
        placeholder="Cari nama template, fitur, gaya, warna (contoh: Darul Ikhlas, Emerald, Modern, Tahfidz)..."
        class="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-white text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-medium shadow-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#F4C430] transition-all font-sans"
        @input="onSearchInput"
      />
      <button
        v-if="localSearch"
        type="button"
        class="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-700 transition-colors"
        title="Hapus pencarian"
        @click="clearSearch"
      >
        <span class="material-symbols-outlined text-[20px]">close</span>
      </button>
    </div>

    <!-- Filter Controls Toolbar Suite -->
    <div class="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-3 border-t border-white/15">
      <!-- Status Filters (Google Material Symbols, No Emotes) -->
      <div class="flex items-center flex-wrap gap-2">
        <span class="text-xs text-white/90 uppercase tracking-wider font-bold mr-1 font-sans">Status:</span>

        <!-- Status: Semua -->
        <button
          type="button"
          class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 active:translate-y-0.5 font-sans"
          :class="
            filters.sortBy === 'all'
              ? 'bg-[#F4C430] text-[#0A5C4F] shadow-md ring-2 ring-white/20'
              : 'bg-white/10 text-white hover:bg-white/20 border border-white/15 backdrop-blur-sm'
          "
          @click="setSort('all')"
        >
          <span class="material-symbols-outlined text-[16px]">grid_view</span>
          <span>Semua</span>
        </button>

        <!-- Status: Terbaru -->
        <button
          type="button"
          class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 active:translate-y-0.5 font-sans"
          :class="
            filters.sortBy === 'newest'
              ? 'bg-[#F4C430] text-[#0A5C4F] shadow-md ring-2 ring-white/20'
              : 'bg-white/10 text-white hover:bg-white/20 border border-white/15 backdrop-blur-sm'
          "
          @click="setSort('newest')"
        >
          <span class="material-symbols-outlined text-[16px]">bolt</span>
          <span>Terbaru</span>
        </button>

        <!-- Status: Unggulan -->
        <button
          type="button"
          class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 active:translate-y-0.5 font-sans"
          :class="
            filters.sortBy === 'featured'
              ? 'bg-[#F4C430] text-[#0A5C4F] shadow-md ring-2 ring-white/20'
              : 'bg-white/10 text-white hover:bg-white/20 border border-white/15 backdrop-blur-sm'
          "
          @click="setSort('featured')"
        >
          <span class="material-symbols-outlined text-[16px]">star</span>
          <span>Unggulan</span>
        </button>
      </div>

      <!-- Dropdown Selectors: Gaya Desain & Palet Warna -->
      <div class="flex items-center flex-wrap gap-3">
        <!-- Gaya Filter -->
        <div class="flex items-center gap-1.5">
          <span class="text-xs text-white/90 uppercase tracking-wider font-bold font-sans">Gaya:</span>
          <select
            :value="filters.style || 'all'"
            class="px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/20 text-white text-xs font-semibold border border-white/25 focus:outline-none focus:ring-2 focus:ring-[#F4C430] cursor-pointer backdrop-blur-sm transition-all font-sans"
            @change="onStyleChange"
          >
            <option value="all" style="color: #0f172a; background: #ffffff;">Semua Gaya</option>
            <option
              v-for="s in designStyles"
              :key="s.value"
              :value="s.value"
              style="color: #0f172a; background: #ffffff;"
            >
              {{ s.label }}
            </option>
          </select>
        </div>

        <!-- Warna Filter -->
        <div class="flex items-center gap-1.5">
          <span class="text-xs text-white/90 uppercase tracking-wider font-bold font-sans">Warna:</span>
          <select
            :value="filters.colorScheme || 'all'"
            class="px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/20 text-white text-xs font-semibold border border-white/25 focus:outline-none focus:ring-2 focus:ring-[#F4C430] cursor-pointer backdrop-blur-sm transition-all font-sans"
            @change="onColorChange"
          >
            <option value="all" style="color: #0f172a; background: #ffffff;">Semua Warna</option>
            <option
              v-for="c in colorSchemes"
              :key="c.value"
              :value="c.value"
              style="color: #0f172a; background: #ffffff;"
            >
              {{ c.label }}
            </option>
          </select>
        </div>

        <!-- Reset Button -->
        <button
          v-if="hasActiveFilters"
          type="button"
          class="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-[#F4C430] text-white hover:text-[#0A5C4F] border border-white/20 text-xs font-bold transition-all shadow-sm font-sans"
          @click="resetAll"
        >
          <span class="material-symbols-outlined text-[15px]">restart_alt</span>
          <span>Reset</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTemplatesStore } from '~/stores/templates'
import { useTemplateTaxonomy } from '~/composables/useTemplateTaxonomy'

const store = useTemplatesStore()
const { colorSchemes, designStyles, initTaxonomy } = useTemplateTaxonomy()

onMounted(() => initTaxonomy())

const filters = computed(() => store.filters)

const localSearch = ref(filters.value.search)

const hasActiveFilters = computed(
  () =>
    Boolean(filters.value.search) ||
    Boolean(filters.value.colorScheme) ||
    Boolean(filters.value.style) ||
    filters.value.sortBy !== 'all',
)

let searchTimeout: ReturnType<typeof setTimeout> | null = null
const onSearchInput = () => {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    store.setFilter('search', localSearch.value)
  }, 250)
}

const clearSearch = () => {
  localSearch.value = ''
  store.setFilter('search', '')
}

const setSort = (val: 'all' | 'newest' | 'featured') => {
  store.setFilter('sortBy', val)
}

const onStyleChange = (e: Event) => {
  const target = e.target as HTMLSelectElement
  store.setFilter('style', target.value === 'all' ? '' : target.value)
}

const onColorChange = (e: Event) => {
  const target = e.target as HTMLSelectElement
  store.setFilter('colorScheme', target.value === 'all' ? '' : target.value)
}

const resetAll = () => {
  store.resetFilters()
  localSearch.value = ''
}
</script>
