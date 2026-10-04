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

      <!-- Loading Skeleton -->
      <div v-if="pending && (!faqs || faqs.length === 0)" class="flex flex-col gap-3">
        <div v-for="i in 4" :key="i" class="bg-white rounded-2xl border border-psd-line p-5 animate-pulse">
          <div class="h-4 bg-slate-200 rounded w-2/3 mb-2"></div>
          <div class="h-3 bg-slate-100 rounded w-full"></div>
        </div>
      </div>

      <!-- FAQ Accordion List -->
      <div v-else class="flex flex-col gap-3">
        <div
          v-for="(faq, index) in faqs"
          :key="faq.id || index"
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

        <div v-if="!pending && (!faqs || faqs.length === 0)" class="text-center py-8 text-slate-400 text-sm">
          Belum ada pertanyaan FAQ yang diterbitkan.
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
export interface FaqItem {
  id: number
  question: string
  answer: string
  orderIndex: number
  isPublished: boolean
}

const openIndex = ref<number | null>(0)

const toggleFaq = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index
}

// Mengambil FAQ secara dinamis dari Neon PostgreSQL
const { data: faqs, pending } = await useAsyncData<FaqItem[]>('catalog-faqs', () =>
  $fetch('/api/faqs')
)
</script>
