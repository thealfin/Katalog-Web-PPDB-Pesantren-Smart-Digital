<template>
  <div class="w-full">
    <!-- Grid -->
    <div
      v-if="templates.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <div
        v-for="(template, index) in templates"
        :key="template.slug"
        class="opacity-0 animate-fade-up"
        :style="{ animationDelay: `${Math.min(index * 60, 480)}ms`, animationFillMode: 'forwards' }"
      >
        <TemplateCard :template="template" />
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-else
      class="py-20 px-4 text-center bg-white rounded-2xl border border-psd-line shadow-sm flex flex-col items-center justify-center"
    >
      <div class="w-16 h-16 rounded-full bg-psd-cream flex items-center justify-center text-psd-muted mb-4 border border-psd-line">
        <span class="material-symbols-outlined text-[32px]">search_off</span>
      </div>
      <h3 class="text-lg font-bold text-psd-ink mb-1">
        Tidak Ada Template yang Sesuai
      </h3>
      <p class="text-psd-muted text-sm max-w-sm mb-6">
        Coba ganti kata kunci pencarian atau ubah filter gaya dan palet warna di atas.
      </p>
      <button
        type="button"
        class="btn-primary text-xs px-5 py-2.5 rounded-xl inline-flex items-center gap-1.5"
        @click="$emit('resetFilters')"
      >
        <span class="material-symbols-outlined text-[16px]">restart_alt</span>
        <span>Tampilkan Semua Template</span>
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
