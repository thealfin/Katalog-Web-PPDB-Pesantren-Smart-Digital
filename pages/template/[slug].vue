<template>
  <div>
    <!-- Loading -->
    <div v-if="pending" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div class="w-14 h-14 border-4 border-brand-green/20 border-t-brand-green rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-gray-500 text-sm">Memuat template...</p>
      </div>
    </div>

    <!-- Not Found -->
    <div v-else-if="!template" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <p class="text-8xl mb-6">🕌</p>
        <h1 class="font-display text-3xl font-bold text-gray-800 mb-3">Template Tidak Ditemukan</h1>
        <p class="text-gray-500 mb-8">Template dengan slug "{{ route.params.slug }}" tidak ada.</p>
        <NuxtLink to="/" class="btn-primary">← Kembali ke Katalog</NuxtLink>
      </div>
    </div>

    <!-- Template Detail -->
    <div v-else class="min-h-screen">
      <!-- Top Bar -->
      <div class="bg-white border-b border-gray-100 sticky top-16 z-40">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <NuxtLink to="/" class="text-gray-500 hover:text-brand-green transition-colors text-sm flex items-center gap-1">
              <Icon name="heroicons:arrow-left" class="text-sm" />
              Katalog
            </NuxtLink>
            <span class="text-gray-300">/</span>
            <span class="text-brand-green font-medium text-sm">{{ template.name }}</span>
          </div>

          <!-- Prev / Next -->
          <div class="flex items-center gap-2">
            <NuxtLink
              v-if="prevTemplate"
              :to="`/template/${prevTemplate.slug}`"
              class="text-xs text-gray-500 hover:text-brand-green transition-colors flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-gray-100"
            >
              <Icon name="heroicons:chevron-left" />
              {{ prevTemplate.name }}
            </NuxtLink>
            <NuxtLink
              v-if="nextTemplate"
              :to="`/template/${nextTemplate.slug}`"
              class="text-xs text-gray-500 hover:text-brand-green transition-colors flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-gray-100"
            >
              {{ nextTemplate.name }}
              <Icon name="heroicons:chevron-right" />
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Main Layout -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex flex-col xl:flex-row gap-8">
          <!-- Preview iframe (fullwidth) -->
          <div class="flex-1">
            <div class="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
              <!-- Browser chrome mockup -->
              <div class="flex items-center gap-2 px-4 py-3 bg-gray-800 border-b border-gray-700">
                <div class="flex gap-1.5">
                  <div class="w-3 h-3 rounded-full bg-red-500"></div>
                  <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div class="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div class="flex-1 ml-4">
                  <div class="bg-gray-700 rounded-md px-4 py-1.5 text-xs text-gray-400 font-mono truncate">
                    {{ template.previewUrl }}
                  </div>
                </div>
                <a
                  :href="template.previewUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-gray-400 hover:text-white transition-colors ml-2"
                  title="Buka Fullscreen"
                >
                  <Icon name="heroicons:arrow-top-right-on-square" class="text-sm" />
                </a>
              </div>

              <!-- iframe -->
              <div class="relative" style="height: 70vh;">
                <iframe
                  :src="template.previewUrl"
                  :title="`Preview ${template.name}`"
                  class="w-full h-full border-0"
                  sandbox="allow-scripts allow-same-origin"
                  loading="lazy"
                ></iframe>

                <!-- Fallback overlay if iframe fails -->
                <div class="absolute inset-0 bg-gray-100 flex flex-col items-center justify-center pointer-events-none opacity-0" id="iframe-fallback">
                  <img
                    :src="template.previewImage"
                    :alt="template.name"
                    class="max-h-full object-contain"
                  />
                </div>
              </div>
            </div>

            <!-- Fullscreen link -->
            <div class="mt-4 flex justify-center">
              <a
                :href="template.previewUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-green transition-colors"
              >
                <Icon name="heroicons:arrow-top-right-on-square" />
                Buka preview di tab baru
              </a>
            </div>
          </div>

          <!-- Sidebar Info -->
          <aside class="xl:w-80 shrink-0">
            <div class="sticky top-32 space-y-6">
              <!-- Template Info Card -->
              <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <!-- Color swatch + name -->
                <div class="flex items-start gap-3 mb-4">
                  <div
                    class="w-10 h-10 rounded-xl shadow-md shrink-0 mt-0.5"
                    :style="{ backgroundColor: template.colorPrimary }"
                  ></div>
                  <div>
                    <h1 class="font-display text-xl font-bold text-gray-900">{{ template.name }}</h1>
                    <div class="flex items-center gap-2 mt-1">
                      <BadgeTag v-if="template.isNew" label="✨ Baru" color="new" />
                      <BadgeTag v-if="template.isFeatured" label="⭐ Unggulan" color="featured" />
                      <span class="text-xs text-gray-400 capitalize">{{ template.style }}</span>
                    </div>
                  </div>
                </div>

                <p class="text-gray-600 text-sm leading-relaxed mb-5">{{ template.description }}</p>

                <!-- Features -->
                <div class="mb-5">
                  <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Fitur Tersedia</p>
                  <div class="flex flex-wrap gap-1.5">
                    <span
                      v-for="feature in template.features"
                      :key="feature"
                      class="text-xs px-2.5 py-1 bg-green-50 text-green-700 rounded-lg border border-green-100 capitalize"
                    >
                      {{ feature }}
                    </span>
                  </div>
                </div>

                <!-- Tags -->
                <div class="mb-5">
                  <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Tags</p>
                  <div class="flex flex-wrap gap-1.5">
                    <BadgeTag
                      v-for="tag in template.tags"
                      :key="tag"
                      :label="`#${tag}`"
                      :color="template.colorScheme"
                    />
                  </div>
                </div>

                <!-- Meta Info -->
                <div class="border-t border-gray-100 pt-4 space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-500">Warna Skema</span>
                    <span class="font-medium text-gray-700 capitalize">{{ template.colorScheme }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-500">Tema</span>
                    <span class="font-medium text-gray-700 capitalize">{{ template.theme }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-500">Halaman</span>
                    <span class="font-medium text-gray-700">{{ template.pages }} halaman</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-500">Dibuat</span>
                    <span class="font-medium text-gray-700">{{ formatDate(template.createdAt) }}</span>
                  </div>
                </div>
              </div>

              <!-- Actions -->
              <div class="space-y-3">
                <a
                  :href="template.previewUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-secondary w-full justify-center"
                >
                  <Icon name="heroicons:eye" />
                  Lihat Fullscreen
                </a>

                <!-- Download ZIP - only for admin -->
                <DownloadButton
                  v-if="authStore.isAdmin"
                  :zip-path="template.zipPath"
                  :template-name="template.name"
                  class="w-full justify-center"
                />

                <div v-else class="text-center py-3 px-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                  <p class="text-xs text-gray-400">
                    <NuxtLink to="/admin/login" class="text-brand-green hover:underline font-medium">Login sebagai Admin</NuxtLink>
                    untuk download ZIP
                  </p>
                </div>
              </div>

              <!-- Navigation -->
              <div class="grid grid-cols-2 gap-3">
                <NuxtLink
                  v-if="prevTemplate"
                  :to="`/template/${prevTemplate.slug}`"
                  class="flex flex-col items-start p-3 bg-white rounded-xl border border-gray-100 hover:border-brand-green/30 hover:shadow-md transition-all duration-200 group"
                >
                  <span class="text-xs text-gray-400 mb-1 flex items-center gap-1">
                    <Icon name="heroicons:chevron-left" class="text-xs" />
                    Sebelumnya
                  </span>
                  <span class="text-xs font-semibold text-gray-700 group-hover:text-brand-green transition-colors">{{ prevTemplate.name }}</span>
                </NuxtLink>
                <div v-else></div>

                <NuxtLink
                  v-if="nextTemplate"
                  :to="`/template/${nextTemplate.slug}`"
                  class="flex flex-col items-end p-3 bg-white rounded-xl border border-gray-100 hover:border-brand-green/30 hover:shadow-md transition-all duration-200 group"
                >
                  <span class="text-xs text-gray-400 mb-1 flex items-center gap-1">
                    Berikutnya
                    <Icon name="heroicons:chevron-right" class="text-xs" />
                  </span>
                  <span class="text-xs font-semibold text-gray-700 group-hover:text-brand-green transition-colors">{{ nextTemplate.name }}</span>
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

const formatDate = (dateStr: string) => {
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
