<template>
  <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
    <!-- Search (mobile) -->
    <div class="mb-4 md:hidden">
      <SearchInput v-model="localSearch" placeholder="Cari template..." @search="applySearch" />
    </div>

    <!-- Sort Pills -->
    <div class="mb-5">
      <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Tampilkan</p>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="sort in sortOptions"
          :key="sort.value"
          class="px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
          :class="
            filters.sortBy === sort.value
              ? 'bg-brand-green text-white shadow-sm'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          "
          @click="setSort(sort.value)"
        >
          {{ sort.label }}
        </button>
      </div>
    </div>

    <!-- Color Filter -->
    <div class="mb-5">
      <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Warna Tema</p>
      <div class="flex flex-wrap gap-2">
        <button
          class="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
          :class="!filters.colorScheme ? 'bg-brand-green text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
          @click="setColor('')"
        >
          Semua
        </button>
        <button
          v-for="color in colorOptions"
          :key="color.value"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
          :class="
            filters.colorScheme === color.value
              ? 'ring-2 ring-offset-1 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          "
          :style="filters.colorScheme === color.value ? { backgroundColor: color.hex, ringColor: color.hex } : {}"
          @click="setColor(color.value)"
        >
          <span
            class="w-3 h-3 rounded-full border border-white/50"
            :style="{ backgroundColor: color.hex }"
          ></span>
          {{ color.label }}
        </button>
      </div>
    </div>

    <!-- Style Filter -->
    <div class="mb-5">
      <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Gaya Desain</p>
      <div class="flex flex-wrap gap-2">
        <button
          class="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
          :class="!filters.style ? 'bg-brand-green text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
          @click="setStyle('')"
        >
          Semua
        </button>
        <button
          v-for="style in styleOptions"
          :key="style.value"
          class="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
          :class="
            filters.style === style.value
              ? 'bg-brand-green text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          "
          @click="setStyle(style.value)"
        >
          {{ style.label }}
        </button>
      </div>
    </div>

    <!-- Reset -->
    <button
      v-if="hasActiveFilters"
      class="w-full py-2 rounded-xl border-2 border-red-200 text-red-500 text-sm font-medium hover:bg-red-50 transition-all duration-200"
      @click="resetAll"
    >
      <Icon name="heroicons:x-mark" class="text-sm" />
      Reset Semua Filter
    </button>
  </div>
</template>

<script setup lang="ts">
import { useTemplatesStore } from '~/stores/templates'

const store = useTemplatesStore()
const filters = computed(() => store.filters)

const localSearch = ref(filters.value.search)

const hasActiveFilters = computed(
  () => filters.value.search || filters.value.colorScheme || filters.value.style || filters.value.sortBy !== 'all',
)

const sortOptions = [
  { value: 'all', label: '✦ Semua' },
  { value: 'newest', label: '✨ Terbaru' },
  { value: 'featured', label: '⭐ Unggulan' },
]

const colorOptions = [
  { value: 'green', label: 'Hijau', hex: '#166534' },
  { value: 'blue', label: 'Biru', hex: '#1e3a5f' },
  { value: 'gold', label: 'Emas', hex: '#92400e' },
  { value: 'maroon', label: 'Marun', hex: '#7f1d1d' },
  { value: 'teal', label: 'Tosca', hex: '#0f766e' },
  { value: 'gray', label: 'Abu', hex: '#374151' },
  { value: 'purple', label: 'Ungu', hex: '#4c1d95' },
  { value: 'orange', label: 'Orange', hex: '#c2410c' },
  { value: 'brown', label: 'Cokelat', hex: '#78350f' },
]

const styleOptions = [
  { value: 'minimal', label: '◻ Minimal' },
  { value: 'classic', label: '◈ Klasik' },
  { value: 'modern', label: '◆ Modern' },
  { value: 'formal', label: '◉ Formal' },
  { value: 'premium', label: '★ Premium' },
]

const setSort = (val: string) => store.setFilter('sortBy', val)
const setColor = (val: string) => store.setFilter('colorScheme', val)
const setStyle = (val: string) => store.setFilter('style', val)
const applySearch = (val: string) => store.setFilter('search', val)
const resetAll = () => {
  store.resetFilters()
  localSearch.value = ''
}
</script>
