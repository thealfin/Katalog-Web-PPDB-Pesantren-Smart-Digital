<template>
  <div class="animate-fade-in font-sans">
    <!-- Stats Cards (Matching Landing Page Colors) -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="bg-white border border-slate-200/80 rounded-3xl p-6 flex items-center gap-5 shadow-sm transition-transform hover:scale-[1.02]"
      >
        <div class="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm" :class="stat.iconBg">
          <span class="material-symbols-outlined text-[28px]" :class="stat.iconColor">{{ stat.icon }}</span>
        </div>
        <div>
          <p class="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1 font-sans">{{ stat.label }}</p>
          <p class="text-3xl font-extrabold text-slate-900 font-sans tracking-tight">{{ stat.value }}</p>
        </div>
      </div>
    </div>

    <!-- Table Container -->
    <div class="bg-white border border-slate-200/80 rounded-3xl shadow-sm overflow-hidden">
      <!-- Header Toolbar -->
      <div class="flex flex-col md:flex-row items-center justify-between px-6 sm:px-8 py-5 border-b border-slate-100 bg-slate-50/60 gap-4">
        <div>
          <h2 class="text-slate-900 font-extrabold text-lg sm:text-xl font-sans tracking-tight">Koleksi Template PPDB</h2>
          <p class="text-slate-500 text-xs mt-0.5 font-medium">Kelola dan update seluruh pilihan template website di katalog</p>
        </div>
        <div class="flex items-center gap-3 w-full md:w-auto">
          <!-- Search Input -->
          <div class="relative flex-1 md:w-64">
            <span class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[20px] pointer-events-none">
              search
            </span>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari template..."
              class="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 text-xs sm:text-sm font-sans
                focus:outline-none focus:border-[#0A5C4F] focus:ring-2 focus:ring-[#0A5C4F]/15 transition-all shadow-sm"
            />
          </div>

          <!-- Add Template Button -->
          <NuxtLink
            to="/admin/upload"
            class="bg-[#0A5C4F] text-white text-xs px-5 py-2.5 rounded-xl font-extrabold flex items-center gap-1.5 hover:bg-[#F4C430] hover:text-[#0A5C4F] transition-all shadow-md shrink-0 font-sans active:translate-y-0.5"
          >
            <span class="material-symbols-outlined text-[18px]">add</span>
            <span>Upload Template</span>
          </NuxtLink>
        </div>
      </div>

      <!-- Table Content -->
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="bg-slate-50/80 text-slate-400 text-[10px] uppercase font-bold tracking-[0.1em] border-b border-slate-100">
              <th class="px-6 sm:px-8 py-3.5">No</th>
              <th class="px-6 sm:px-8 py-3.5">Visual Template</th>
              <th class="px-6 sm:px-8 py-3.5 hidden md:table-cell">Tema &amp; Gaya</th>
              <th class="px-6 sm:px-8 py-3.5 hidden lg:table-cell">Warna</th>
              <th class="px-6 sm:px-8 py-3.5">Status</th>
              <th class="text-right px-6 sm:px-8 py-3.5">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 text-xs sm:text-sm">
            <tr
              v-for="(t, i) in filteredTemplates"
              :key="t.slug"
              class="group hover:bg-slate-50/70 transition-colors"
            >
              <td class="px-6 sm:px-8 py-4 text-slate-400 font-mono text-xs">{{ String(i + 1).padStart(2, '0') }}</td>
              <td class="px-6 sm:px-8 py-4">
                <div class="flex items-center gap-3.5">
                  <div class="w-12 h-12 rounded-xl border border-slate-200 flex items-center justify-center shadow-sm relative overflow-hidden group-hover:scale-105 transition-transform shrink-0 bg-slate-100">
                    <img v-if="t.previewImage" :src="t.previewImage" :alt="t.name" class="w-full h-full object-cover" />
                    <div v-else class="w-full h-full flex items-center justify-center font-bold text-white text-xs" :style="{ backgroundColor: t.colorPrimary }">
                      {{ t.name[0] }}
                    </div>
                  </div>
                  <div>
                    <p class="text-slate-900 font-bold text-sm leading-snug">{{ t.name }}</p>
                    <p class="text-slate-400 text-[11px] font-mono group-hover:text-[#0A5C4F] transition-colors">ppdb.{{ t.slug }}.ponpes.id</p>
                  </div>
                </div>
              </td>
              <td class="px-6 sm:px-8 py-4 hidden md:table-cell">
                <div class="space-y-0.5">
                  <p class="text-slate-700 font-semibold capitalize text-xs">{{ t.theme }}</p>
                  <p class="text-slate-400 text-[10px] uppercase font-bold">{{ t.style }}</p>
                </div>
              </td>
              <td class="px-6 sm:px-8 py-4 hidden lg:table-cell">
                <div class="flex items-center gap-2">
                  <div class="w-3.5 h-3.5 rounded-full border border-slate-200 shadow-sm" :style="{ backgroundColor: t.colorPrimary }"></div>
                  <span class="text-slate-600 text-xs capitalize font-medium">{{ t.colorScheme }}</span>
                </div>
              </td>
              <td class="px-6 sm:px-8 py-4">
                <div class="flex items-center gap-1.5 flex-wrap">
                  <span v-if="t.isNew" class="inline-flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 bg-[#0A5C4F] text-white rounded-md shadow-sm">
                    <span class="material-symbols-outlined text-[11px]">bolt</span>
                    <span>Baru</span>
                  </span>
                  <span v-if="t.isFeatured" class="inline-flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 bg-[#F4C430] text-[#0A5C4F] rounded-md shadow-sm">
                    <span class="material-symbols-outlined text-[11px]">star</span>
                    <span>Unggulan</span>
                  </span>
                  <span v-if="!t.isNew && !t.isFeatured" class="text-[10px] font-semibold px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md">
                    Aktif
                  </span>
                </div>
              </td>
              <td class="px-6 sm:px-8 py-4 text-right">
                <div class="flex items-center justify-end gap-1.5">
                  <NuxtLink
                    :to="`/template/${t.slug}`"
                    class="w-8 h-8 flex items-center justify-center bg-slate-100 text-slate-600 hover:bg-[#0A5C4F] hover:text-white rounded-lg transition-all"
                    title="Live Preview"
                  >
                    <span class="material-symbols-outlined text-[16px]">visibility</span>
                  </NuxtLink>
                  <NuxtLink
                    :to="`/admin/edit/${t.slug}`"
                    class="w-8 h-8 flex items-center justify-center bg-slate-100 text-slate-600 hover:bg-blue-600 hover:text-white rounded-lg transition-all"
                    title="Edit Template"
                  >
                    <span class="material-symbols-outlined text-[16px]">edit</span>
                  </NuxtLink>
                  <button
                    class="w-8 h-8 flex items-center justify-center bg-slate-100 text-slate-400 hover:bg-rose-100 hover:text-rose-600 rounded-lg transition-all"
                    title="Hapus Template"
                    @click="confirmDelete(t.slug, t.name)"
                  >
                    <span class="material-symbols-outlined text-[16px]">delete</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-if="filteredTemplates.length === 0" class="py-20 text-center">
        <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
          <span class="material-symbols-outlined text-[32px]">search_off</span>
        </div>
        <p class="text-slate-800 font-bold text-base">Template Tidak Ditemukan</p>
        <p class="text-slate-400 text-xs mt-1">Coba kata kunci lain atau upload template baru.</p>
      </div>
    </div>

    <!-- Confirm Delete Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="deleteModal.show" class="fixed inset-0 z-50 flex items-center justify-center px-4 font-sans">
          <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="deleteModal.show = false"></div>
          <div class="relative bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl animate-fade-up">
            <div class="text-center mb-6">
              <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500">
                <span class="material-symbols-outlined text-[32px]">delete</span>
              </div>
              <h3 class="text-slate-900 font-extrabold text-xl mb-2">Hapus Template?</h3>
              <p class="text-slate-500 text-xs sm:text-sm leading-relaxed">
                Template <strong class="text-slate-900 font-bold">{{ deleteModal.name }}</strong> akan dihapus permanen dari katalog dan berkas server.
              </p>
            </div>
            <div class="flex gap-3">
              <button
                class="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-all font-sans"
                @click="deleteModal.show = false"
              >
                Batal
              </button>
              <button
                class="flex-1 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs transition-all shadow-md flex items-center justify-center gap-1.5 font-sans"
                :disabled="deleteModal.loading"
                @click="executeDelete"
              >
                <span v-if="deleteModal.loading" class="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                <span>{{ deleteModal.loading ? 'Menghapus...' : 'Ya, Hapus' }}</span>
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
    icon: 'grid_view',
    iconBg: 'bg-[#0A5C4F]/10 border border-[#0A5C4F]/20',
    iconColor: 'text-[#0A5C4F]',
  },
  {
    label: 'Rilisan Baru',
    value: store.newTemplates.length,
    icon: 'bolt',
    iconBg: 'bg-emerald-50 border border-emerald-100',
    iconColor: 'text-emerald-600',
  },
  {
    label: 'Pilihan Unggulan',
    value: store.featuredTemplates.length,
    icon: 'star',
    iconBg: 'bg-amber-50 border border-amber-100',
    iconColor: 'text-amber-600',
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
