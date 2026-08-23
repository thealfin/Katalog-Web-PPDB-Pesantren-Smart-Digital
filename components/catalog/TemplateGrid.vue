<template>
  <div>
    <!-- Results info -->
    <div class="flex items-center justify-between mb-6">
      <p class="text-gray-500 text-sm">
        Menampilkan <span class="font-semibold text-brand-green">{{ templates.length }}</span> template
        <span v-if="templates.length !== total"> dari {{ total }}</span>
      </p>
    </div>

    <!-- Grid -->
    <div v-if="templates.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="(template, index) in templates"
        :key="template.slug"
        class="opacity-0 animate-fade-up"
        :style="{ animationDelay: `${Math.min(index * 80, 600)}ms`, animationFillMode: 'forwards' }"
      >
        <TemplateCard :template="template" />
      </div>
    </div>

    <!-- Empty state -->
    <div v-else class="py-24 text-center">
      <div class="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gray-100 flex items-center justify-center">
        <Icon name="heroicons:magnifying-glass" class="text-3xl text-gray-400" />
      </div>
      <h3 class="font-display text-xl font-semibold text-gray-700 mb-2">Tidak ada template ditemukan</h3>
      <p class="text-gray-500 text-sm mb-6">Coba ubah kata kunci atau filter yang digunakan</p>
      <button @click="$emit('resetFilters')" class="btn-secondary text-sm px-4 py-2">
        Reset Filter
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Template } from '~/stores/templates'

interface Props {
  templates: Template[]
  total: number
}

defineProps<Props>()
defineEmits(['resetFilters'])
</script>
