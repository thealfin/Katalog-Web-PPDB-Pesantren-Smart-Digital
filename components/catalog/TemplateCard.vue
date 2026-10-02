<template>
  <div
    class="template-card bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#0A5C4F]/30 transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1.5 group"
  >
    <!-- Mockup Header -->
    <div class="w-full bg-slate-50 border-b border-slate-100 px-3.5 py-2 flex items-center justify-between">
      <div class="flex items-center gap-1.5">
        <span class="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
      </div>
      <span class="text-[11px] font-mono text-slate-500 px-2 py-0.5 rounded bg-white border border-slate-200">
        ppdb.{{ template.slug }}.ponpes.id
      </span>
      <span class="material-symbols-outlined text-slate-400 text-[14px]">lock</span>
    </div>

    <!-- Preview Canvas with Image & Badges -->
    <div class="relative overflow-hidden aspect-[16/10] bg-slate-100 group">
      <img
        :src="template.previewImage"
        :alt="`Preview ${template.name}`"
        class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
        @error="onImageError"
      />

      <!-- Floating Badges Top Layer (Google Material Symbols, No Emotes) -->
      <div class="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
        <span
          v-if="template.isNew"
          class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#0A5C4F] text-white text-[11px] font-semibold shadow-sm backdrop-blur-sm"
        >
          <span class="material-symbols-outlined text-[13px]">bolt</span>
          <span>Baru</span>
        </span>

        <span
          v-if="template.isFeatured"
          class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#F4C430] text-[#0A5C4F] text-[11px] font-bold shadow-sm backdrop-blur-sm"
        >
          <span class="material-symbols-outlined text-[13px]">star</span>
          <span>Unggulan</span>
        </span>
      </div>

      <!-- Color Swatch & Style Badge -->
      <div class="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10">
        <span
          class="px-2 py-0.5 rounded-md bg-white/95 text-slate-700 text-[11px] font-medium shadow-sm capitalize border border-slate-200 backdrop-blur-sm"
        >
          {{ template.style }}
        </span>
        <div
          class="w-4 h-4 rounded-full border-2 border-white shadow-md shrink-0"
          :style="{ backgroundColor: template.colorPrimary }"
          :title="`Warna: ${template.colorPrimary}`"
        ></div>
      </div>

      <!-- Hover Overlay -->
      <div class="absolute inset-0 bg-[#06351F]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
        <NuxtLink
          :to="`/template/${template.slug}`"
          class="inline-flex items-center gap-1.5 bg-white text-[#0A5C4F] hover:bg-[#F4C430] hover:text-[#0A5C4F] font-bold text-xs px-4 py-2 rounded-xl shadow-lg transition-all transform translate-y-2 group-hover:translate-y-0 duration-300"
        >
          <span class="material-symbols-outlined text-[16px]">visibility</span>
          <span>Lihat Detail</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Body Information -->
    <div class="p-4 sm:p-5 flex-1 flex flex-col justify-between">
      <div>
        <div class="flex items-start justify-between gap-2 mb-1.5">
          <h4 class="font-bold text-slate-900 text-base tracking-tight leading-snug group-hover:text-[#0A5C4F] transition-colors">
            {{ template.name }}
          </h4>
        </div>

        <p class="text-slate-600 text-xs leading-relaxed line-clamp-2 mb-3">
          {{ template.description }}
        </p>

        <!-- Tags -->
        <div class="flex flex-wrap gap-1.5 mb-4">
          <span
            v-for="tag in template.tags.slice(0, 3)"
            :key="tag"
            class="px-2 py-0.5 rounded-md bg-emerald-50 text-[#0A5C4F] text-[11px] font-medium border border-emerald-100"
          >
            #{{ tag }}
          </span>
        </div>
      </div>

      <!-- Action Buttons (Hero Green, Yellow on Hover) -->
      <div class="pt-3 border-t border-slate-100 flex items-center gap-2">
        <NuxtLink
          :to="`/template/${template.slug}`"
          class="flex-1 py-2.5 px-3 rounded-xl bg-[#0A5C4F] text-white font-bold text-xs hover:bg-[#F4C430] hover:text-[#0A5C4F] hover:shadow-lg transition-all duration-300 text-center flex items-center justify-center gap-1.5 shadow-md active:translate-y-0.5"
        >
          <span>Lihat Preview</span>
          <span class="material-symbols-outlined text-[16px]">visibility</span>
        </NuxtLink>

        <a
          :href="whatsappUrl"
          target="_blank"
          rel="noopener noreferrer"
          title="Pilih Template Ini via WhatsApp"
          class="py-2.5 px-3 rounded-xl bg-[#0A5C4F]/10 text-[#0A5C4F] hover:bg-[#F4C430] hover:text-[#0A5C4F] border border-[#0A5C4F]/20 hover:border-transparent transition-all duration-300 flex items-center justify-center shadow-sm active:translate-y-0.5"
        >
          <span class="material-symbols-outlined text-[18px]">add_task</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Template } from '~/stores/templates'

interface Props {
  template: Template
}

const props = defineProps<Props>()

const whatsappUrl = computed(() => {
  const msg = `Halo Mas Alfin & Tim Website PSD, saya tertarik menggunakan template PPDB "${props.template.name}". Mohon informasi lebih lanjut mengenai implementasinya.`
  return `https://wa.me/6287787243916?text=${encodeURIComponent(msg)}`
})

const onImageError = (e: Event) => {
  const img = e.target as HTMLImageElement
  img.src = '/templates/default-preview.png'
}
</script>
