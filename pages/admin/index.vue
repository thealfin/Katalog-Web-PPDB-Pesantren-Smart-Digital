<template>
  <div class="animate-fade-in">
    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="bg-white border border-gray-100 rounded-3xl p-6 flex items-center gap-5 shadow-sm transition-transform hover:scale-[1.02]"
      >
        <div class="w-16 h-16 rounded-2xl flex items-center justify-center" :class="stat.iconBg">
          <Icon :name="stat.icon" class="text-3xl" :class="stat.iconColor" />
        </div>
        <div>
          <p class="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">{{ stat.label }}</p>
          <p class="text-3xl font-bold text-gray-800">{{ stat.value }}</p>
        </div>
      </div>
    </div>

    <!-- Table Container -->
    <div class="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
      <!-- Header -->
      <div class="flex flex-col md:flex-row items-center justify-between px-8 py-6 border-b border-gray-50 bg-gray-50/50 gap-4">
        <div>
          <h2 class="text-gray-800 font-bold text-xl">Daftar Template</h2>
          <p class="text-gray-500 text-xs mt-0.5">Kelola koleksi template website di katalog</p>
        </div>
        <div class="flex items-center gap-3 w-full md:w-auto">
          <!-- Search -->
          <div class="relative flex-1 md:w-64">
            <Icon name="heroicons:magnifying-glass" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari template..."
              class="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 text-sm
                focus:outline-none focus:border-psd-green focus:ring-4 focus:ring-psd-green/5 transition-all"
            />
          </div>
          <NuxtLink to="/admin/upload" class="bg-psd-green text-white text-sm px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-[#084a40] transition-all shadow-lg shadow-psd-green/20 shrink-0">
            <Icon name="heroicons:plus" class="text-lg" />
            Template Baru
          </NuxtLink>
        </div>
      </div>

      <!-- Table Content -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-gray-50/30 text-gray-400 text-[10px] uppercase font-bold tracking-[0.1em]">
              <th class="text-left px-8 py-4">No</th>
              <th class="text-left px-8 py-4">Visual Template</th>
              <th class="text-left px-8 py-4 hidden md:table-cell">Tema & Gaya</th>
              <th class="text-left px-8 py-4 hidden lg:table-cell">Warna</th>
              <th class="text-left px-8 py-4">Status</th>
              <th class="text-right px-8 py-4">Kelola</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr
              v-for="(t, i) in filteredTemplates"
              :key="t.slug"
              class="group hover:bg-gray-50/50 transition-colors"
            >
              <td class="px-8 py-5 text-gray-400 font-mono text-xs">{{ String(i + 1).padStart(2, '0') }}</td>
              <td class="px-8 py-5">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-xl border border-gray-100 flex items-center justify-center text-xl shadow-sm relative overflow-hidden group-hover:scale-110 transition-transform">
                    <img v-if="t.previewImage" :src="t.previewImage" class="w-full h-full object-cover" />
                    <div v-else class="w-full h-full flex items-center justify-center font-bold text-white text-xs" :style="{ backgroundColor: t.colorPrimary }">
                      {{ t.name[0] }}
                    </div>
                  </div>
                  <div>
                    <p class="text-gray-800 font-bold text-sm">{{ t.name }}</p>
                    <p class="text-gray-400 text-[10px] font-mono group-hover:text-psd-green transition-colors">{{ t.slug }}</p>
                  </div>
                </div>
              </td>
              <td class="px-8 py-5 hidden md:table-cell">
                <div class="space-y-1">
                  <p class="text-gray-700 text-sm font-medium capitalize">{{ t.theme }}</p>
                  <p class="text-gray-400 text-[10px] uppercase">{{ t.style }}</p>
                </div>
              </td>
              <td class="px-8 py-5 hidden lg:table-cell">
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 rounded-full border border-gray-200" :style="{ backgroundColor: t.colorPrimary }"></div>
                  <span class="text-gray-600 text-xs capitalize">{{ t.colorScheme }}</span>
                </div>
              </td>
              <td class="px-8 py-5">
                <div class="flex gap-1.5">
                  <span v-if="t.isNew" class="text-[9px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-600 rounded-lg uppercase tracking-wider">New</span>
                  <span v-if="t.isFeatured" class="text-[9px] font-bold px-2 py-0.5 bg-amber-100 text-amber-600 rounded-lg uppercase tracking-wider">Featured</span>
                  <span v-if="!t.isNew && !t.isFeatured" class="text-[9px] font-bold px-2 py-0.5 bg-gray-100 text-gray-500 rounded-lg uppercase tracking-wider">Active</span>
                </div>
              </td>
              <td class="px-8 py-5 text-right">
                <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <NuxtLink
                    :to="`/template/${t.slug}`"
                    class="w-9 h-9 flex items-center justify-center bg-gray-100 text-gray-600 hover:bg-psd-green hover:text-white rounded-xl transition-all"
                    title="Preview Live"
                  >
                    <Icon name="heroicons:eye" class="text-lg" />
                  </NuxtLink>
                  <NuxtLink
                    :to="`/admin/edit/${t.slug}`"
                    class="w-9 h-9 flex items-center justify-center bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all"
                    title="Edit Template"
                  >
                    <Icon name="heroicons:pencil-square" class="text-lg" />
                  </NuxtLink>
                  <button
                    class="w-9 h-9 flex items-center justify-center bg-gray-100 text-gray-400 hover:bg-rose-100 hover:text-rose-600 rounded-xl transition-all"
                    title="Hapus Template"
                    @click="confirmDelete(t.slug, t.name)"
                  >
                    <Icon name="heroicons:trash" class="text-lg" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-if="filteredTemplates.length === 0" class="py-24 text-center">
        <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
          <Icon name="heroicons:magnifying-glass" class="text-4xl" />
        </div>
        <p class="text-gray-800 font-bold">Template Tidak Ditemukan</p>
        <p class="text-gray-400 text-sm mt-1">Coba kata kunci lain atau tambah template baru.</p>
      </div>
    </div>

    <!-- Confirm Delete Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="deleteModal.show" class="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" @click="deleteModal.show = false"></div>
          <div class="relative bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl animate-fade-up">
            <div class="text-center mb-8">
              <div class="w-20 h-20 mx-auto mb-6 rounded-3xl bg-rose-50 flex items-center justify-center">
                <Icon name="heroicons:trash" class="text-4xl text-rose-500" />
              </div>
              <h3 class="text-gray-800 font-bold text-2xl mb-2">Hapus Template?</h3>
              <p class="text-gray-500 text-sm">
                Template <strong class="text-gray-800">{{ deleteModal.name }}</strong> akan dihapus permanen dari katalog dan server.
              </p>
            </div>
            <div class="flex gap-4">
              <button
                class="flex-1 py-3.5 rounded-2xl border border-gray-100 text-gray-500 font-bold hover:bg-gray-50 transition-all"
                @click="deleteModal.show = false"
              >
                Batal
              </button>
              <button
                class="flex-1 py-3.5 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold transition-all shadow-lg shadow-rose-500/20 flex items-center justify-center gap-2"
                :disabled="deleteModal.loading"
                @click="executeDelete"
              >
                <Icon v-if="deleteModal.loading" name="heroicons:arrow-path" class="animate-spin" />
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useTemplatesStore } from '~/stores/templates'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const authStore = useAuthStore()
const store = useTemplatesStore()

await useAsyncData('admin-templates', () => store.fetchTemplates())

const searchQuery = ref('')

const filteredTemplates = computed(() => {
  if (!searchQuery.value) return store.templates
  const q = searchQuery.value.toLowerCase()
  return store.templates.filter(
    (t) => t.name.toLowerCase().includes(q) || t.slug.includes(q),
  )
})

const stats = computed(() => [
  {
    label: 'Total Koleksi',
    value: store.totalTemplates,
    icon: 'heroicons:squares-2x2',
    iconBg: 'bg-psd-green/10',
    iconColor: 'text-psd-green',
  },
  {
    label: 'Rilisan Baru',
    value: store.newTemplates.length,
    icon: 'heroicons:bolt',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-500',
  },
  {
    label: 'Pilihan Editor',
    value: store.featuredTemplates.length,
    icon: 'heroicons:star',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-500',
  },
])

const deleteModal = reactive({ show: false, slug: '', name: '', loading: false })

const confirmDelete = (slug: string, name: string) => {
  deleteModal.slug = slug
  deleteModal.name = name
  deleteModal.show = true
}

const executeDelete = async () => {
  deleteModal.loading = true
  const result = await store.deleteTemplate(deleteModal.slug)
  deleteModal.loading = false
  deleteModal.show = false
  if (!result.success) {
    alert(result.message)
  }
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>

