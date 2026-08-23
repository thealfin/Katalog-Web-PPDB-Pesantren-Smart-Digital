<template>
  <div class="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl hover:shadow-brand-green/10 hover:-translate-y-2 transition-all duration-300 group">
    <!-- Preview Image -->
    <div class="relative overflow-hidden aspect-video bg-gray-100">
      <img
        :src="template.previewImage"
        :alt="`Preview ${template.name}`"
        class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
        @error="onImageError"
      />

      <!-- Color Swatch Overlay -->
      <div
        class="absolute top-3 left-3 w-5 h-5 rounded-full border-2 border-white shadow-md"
        :style="{ backgroundColor: template.colorPrimary }"
        :title="`Warna: ${template.colorPrimary}`"
      ></div>

      <!-- Badges -->
      <div class="absolute top-3 right-3 flex flex-col gap-1.5">
        <BadgeTag v-if="template.isNew" label="✨ Baru" color="new" />
        <BadgeTag v-if="template.isFeatured" label="⭐ Unggulan" color="featured" />
      </div>

      <!-- Hover overlay -->
      <div class="absolute inset-0 bg-brand-green/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
        <NuxtLink
          :to="`/template/${template.slug}`"
          class="bg-white text-brand-green font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-brand-cream transition-colors shadow-lg -translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
        >
          Lihat Preview
        </NuxtLink>
      </div>
    </div>

    <!-- Card Content -->
    <div class="p-4">
      <!-- Name + Style -->
      <div class="flex items-start justify-between gap-2 mb-2">
        <h3 class="font-display font-semibold text-gray-900 text-base leading-snug">{{ template.name }}</h3>
        <span class="text-xs text-gray-400 capitalize bg-gray-50 px-2 py-0.5 rounded-lg border border-gray-100 shrink-0">{{ template.style }}</span>
      </div>

      <!-- Description -->
      <p class="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-3">{{ template.description }}</p>

      <!-- Tags -->
      <div class="flex flex-wrap gap-1.5 mb-4">
        <BadgeTag
          v-for="tag in template.tags.slice(0, 3)"
          :key="tag"
          :label="`#${tag}`"
          :color="template.colorScheme"
        />
      </div>

      <!-- Action -->
      <NuxtLink
        :to="`/template/${template.slug}`"
        class="block w-full text-center py-2.5 rounded-xl border-2 border-brand-green text-brand-green text-sm font-semibold
          hover:bg-brand-green hover:text-white transition-all duration-200"
      >
        Lihat Preview →
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Template } from '~/stores/templates'

interface Props {
  template: Template
}

const props = defineProps<Props>()

const onImageError = (e: Event) => {
  const img = e.target as HTMLImageElement
  img.src = '/templates/default-preview.png'
}
</script>
