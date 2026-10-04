<template>
  <div class="space-y-8 animate-fade-in font-sans">
    <!-- Header Summary & Action -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#0A5C4F] text-[11px] font-bold">
            Database Terhubung
          </span>
          <span class="text-xs text-slate-400">&bull;</span>
          <span class="text-xs text-slate-500 font-medium">Neon PostgreSQL</span>
        </div>
        <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Kelola Pertanyaan Umum (FAQ)
        </h2>
        <p class="text-slate-500 text-xs sm:text-sm mt-1 max-w-xl">
          Atur pertanyaan dan jawaban yang tampil pada bagian FAQ halaman utama katalog web PPDB.
        </p>
      </div>

      <div class="flex items-center gap-3">
        <button
          type="button"
          @click="openCreateModal"
          class="px-5 py-3 rounded-2xl bg-[#0A5C4F] hover:bg-[#F4C430] hover:text-[#0A5C4F] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 active:translate-y-0.5"
        >
          <span class="material-symbols-outlined text-[18px]">add_circle</span>
          <span>Tambah FAQ Baru</span>
        </button>
      </div>
    </div>

    <!-- Stats Overview Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
      <div class="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center gap-4">
        <div class="w-12 h-12 rounded-2xl bg-emerald-50 text-[#0A5C4F] flex items-center justify-center border border-emerald-100/80 shrink-0">
          <span class="material-symbols-outlined text-[24px]">quiz</span>
        </div>
        <div>
          <span class="text-xs text-slate-400 font-bold block uppercase tracking-wider">Total FAQ</span>
          <span class="text-2xl font-extrabold text-slate-900 leading-tight">{{ faqs.length }}</span>
        </div>
      </div>

      <div class="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center gap-4">
        <div class="w-12 h-12 rounded-2xl bg-emerald-100/70 text-emerald-700 flex items-center justify-center border border-emerald-200 shrink-0">
          <span class="material-symbols-outlined text-[24px]">visibility</span>
        </div>
        <div>
          <span class="text-xs text-slate-400 font-bold block uppercase tracking-wider">Diterbitkan</span>
          <span class="text-2xl font-extrabold text-emerald-700 leading-tight">{{ publishedCount }}</span>
        </div>
      </div>

      <div class="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center gap-4">
        <div class="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200/80 shrink-0">
          <span class="material-symbols-outlined text-[24px]">visibility_off</span>
        </div>
        <div>
          <span class="text-xs text-slate-400 font-bold block uppercase tracking-wider">Draft / Arsip</span>
          <span class="text-2xl font-extrabold text-amber-700 leading-tight">{{ draftCount }}</span>
        </div>
      </div>
    </div>

    <!-- Alert / Toast Message -->
    <Transition name="fade">
      <div
        v-if="toastMessage"
        class="flex items-center justify-between gap-3 px-5 py-3.5 rounded-2xl text-xs font-semibold shadow-sm"
        :class="toastType === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'"
      >
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-[18px]">
            {{ toastType === 'success' ? 'check_circle' : 'error' }}
          </span>
          <span>{{ toastMessage }}</span>
        </div>
        <button type="button" @click="toastMessage = ''" class="hover:opacity-75">
          <span class="material-symbols-outlined text-[16px]">close</span>
        </button>
      </div>
    </Transition>

    <!-- Main FAQ List Section -->
    <div class="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
      <div class="px-6 sm:px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div>
          <h3 class="text-sm font-bold text-slate-900">Daftar Pertanyaan & Jawaban</h3>
          <p class="text-xs text-slate-500">Urutan di bawah menentukan posisi tampilan pada website</p>
        </div>
        <div v-if="savingOrder" class="flex items-center gap-2 text-xs text-[#0A5C4F] font-bold">
          <span class="w-3.5 h-3.5 border-2 border-[#0A5C4F] border-t-transparent rounded-full animate-spin"></span>
          <span>Menyimpan urutan...</span>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="py-16 text-center">
        <div class="w-10 h-10 border-4 border-[#0A5C4F]/20 border-t-[#0A5C4F] rounded-full animate-spin mx-auto mb-3"></div>
        <p class="text-xs text-slate-500 font-medium">Memuat data FAQ dari Neon DB...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="faqs.length === 0" class="py-16 text-center px-4">
        <div class="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
          <span class="material-symbols-outlined text-[28px]">quiz</span>
        </div>
        <h4 class="text-sm font-bold text-slate-800 mb-1">Belum Ada FAQ</h4>
        <p class="text-xs text-slate-500 mb-4 max-w-sm mx-auto">
          Mulai tambahkan pertanyaan umum yang sering ditanyakan calon santri atau wali murid.
        </p>
        <button
          type="button"
          @click="openCreateModal"
          class="px-4 py-2.5 rounded-xl bg-[#0A5C4F] text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm"
        >
          <span class="material-symbols-outlined text-[16px]">add</span>
          <span>Tambah FAQ Pertama</span>
        </button>
      </div>

      <!-- FAQ Items List -->
      <div v-else class="divide-y divide-slate-100">
        <div
          v-for="(faq, index) in faqs"
          :key="faq.id"
          class="p-5 sm:p-6 hover:bg-slate-50/70 transition-colors group"
        >
          <div class="flex items-start gap-4">
            <!-- Order Controls (Up / Down) -->
            <div class="flex flex-col items-center gap-1 shrink-0 pt-0.5">
              <button
                type="button"
                @click="moveFaq(index, -1)"
                :disabled="index === 0 || savingOrder"
                class="w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition shadow-2xs"
                title="Pindah ke Atas"
              >
                <span class="material-symbols-outlined text-[16px]">arrow_upward</span>
              </button>
              <span class="text-[11px] font-mono font-bold text-slate-400">{{ index + 1 }}</span>
              <button
                type="button"
                @click="moveFaq(index, 1)"
                :disabled="index === faqs.length - 1 || savingOrder"
                class="w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition shadow-2xs"
                title="Pindah ke Bawah"
              >
                <span class="material-symbols-outlined text-[16px]">arrow_downward</span>
              </button>
            </div>

            <!-- Content Area -->
            <div class="flex-1 min-w-0 space-y-2">
              <div class="flex items-center flex-wrap gap-2">
                <!-- Status Badge (Clickable to toggle status) -->
                <button
                  type="button"
                  @click="togglePublishStatus(faq)"
                  class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border transition-all cursor-pointer"
                  :class="faq.isPublished
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                    : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'"
                  :title="faq.isPublished ? 'Klik untuk simpan sebagai Draft' : 'Klik untuk Publikasikan'"
                >
                  <span class="w-1.5 h-1.5 rounded-full" :class="faq.isPublished ? 'bg-emerald-500' : 'bg-amber-500'"></span>
                  <span>{{ faq.isPublished ? 'Diterbitkan' : 'Draft (Sembunyi)' }}</span>
                </button>

                <span class="text-xs text-slate-300">&bull;</span>
                <span class="text-[11px] text-slate-400 font-mono">ID #{{ faq.id }}</span>
              </div>

              <h4 class="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                {{ faq.question }}
              </h4>

              <p class="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                {{ faq.answer }}
              </p>
            </div>

            <!-- Actions (Edit & Delete) -->
            <div class="flex items-center gap-1.5 shrink-0 self-start sm:self-center">
              <button
                type="button"
                @click="openEditModal(faq)"
                class="w-9 h-9 rounded-xl border border-slate-200 bg-white hover:bg-emerald-50 hover:border-emerald-200 text-slate-600 hover:text-[#0A5C4F] flex items-center justify-center transition-all shadow-2xs"
                title="Edit FAQ"
              >
                <span class="material-symbols-outlined text-[18px]">edit</span>
              </button>

              <button
                type="button"
                @click="confirmDelete(faq)"
                class="w-9 h-9 rounded-xl border border-slate-200 bg-white hover:bg-rose-50 hover:border-rose-200 text-slate-600 hover:text-rose-600 flex items-center justify-center transition-all shadow-2xs"
                title="Hapus FAQ"
              >
                <span class="material-symbols-outlined text-[18px]">delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Live Preview Card of Front-End FAQ Accordion -->
    <div class="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6">
      <div class="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <span class="text-xs font-bold text-[#0A5C4F] uppercase tracking-wider block mb-0.5">Live Preview</span>
          <h3 class="text-base font-bold text-slate-900">Tampilan Accordion di Website Pengunjung</h3>
        </div>
        <NuxtLink
          to="/"
          target="_blank"
          class="text-xs font-bold text-[#0A5C4F] hover:underline flex items-center gap-1"
        >
          <span>Lihat Website Asli</span>
          <span class="material-symbols-outlined text-[14px]">open_in_new</span>
        </NuxtLink>
      </div>

      <div class="max-w-2xl mx-auto space-y-3">
        <div
          v-for="(faq, idx) in publishedFaqs"
          :key="faq.id"
          class="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden transition-all"
          :class="{ 'border-emerald-500 ring-1 ring-emerald-500/30': previewOpenIndex === idx }"
        >
          <button
            type="button"
            class="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-800 hover:text-[#0A5C4F] transition-colors"
            @click="previewOpenIndex = previewOpenIndex === idx ? null : idx"
          >
            <span>{{ faq.question }}</span>
            <span
              class="material-symbols-outlined text-slate-400 text-[18px] transition-transform duration-300"
              :class="{ 'rotate-180 text-[#0A5C4F]': previewOpenIndex === idx }"
            >
              expand_more
            </span>
          </button>
          <div
            v-show="previewOpenIndex === idx"
            class="px-5 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50"
          >
            {{ faq.answer }}
          </div>
        </div>

        <div v-if="publishedFaqs.length === 0" class="text-center py-6 text-xs text-slate-400">
          Tidak ada FAQ yang berstatus Diterbitkan untuk ditampilkan.
        </div>
      </div>
    </div>

    <!-- Modal Form Tambah / Edit FAQ -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="showModal"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          @click="showModal = false"
          @keydown.window.escape="showModal = false"
        >
          <div
            class="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden font-sans"
            @click.stop
          >
            <!-- Modal Header -->
            <div class="px-6 py-5 border-b border-gray-100 bg-gray-50/70 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-xl bg-emerald-100 text-[#0A5C4F] flex items-center justify-center shadow-sm">
                  <span class="material-symbols-outlined text-[20px]">
                    {{ isEditing ? 'edit_note' : 'add_circle' }}
                  </span>
                </div>
                <div>
                  <h3 class="text-base font-bold text-gray-800">
                    {{ isEditing ? 'Edit Pertanyaan FAQ' : 'Tambah FAQ Baru' }}
                  </h3>
                  <p class="text-xs text-gray-400">
                    {{ isEditing ? `Mengubah data pertanyaan ID #${form.id}` : 'Tambahkan pertanyaan umum baru ke katalog' }}
                  </p>
                </div>
              </div>
              <button
                type="button"
                @click="showModal = false"
                class="text-gray-400 hover:text-gray-700 p-1 rounded-lg transition-colors"
              >
                <span class="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <!-- Modal Form Body -->
            <form @submit.prevent="submitForm" class="p-6 space-y-4">
              <!-- Pertanyaan -->
              <div class="space-y-1.5">
                <label class="block text-slate-700 font-bold text-xs uppercase tracking-wider">
                  Pertanyaan (Question) <span class="text-rose-500">*</span>
                </label>
                <input
                  v-model="form.question"
                  type="text"
                  placeholder="Contoh: Apakah pembuatan website PPDB ini gratis?"
                  required
                  class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-sans focus:outline-none focus:bg-white focus:border-[#0A5C4F] focus:ring-2 focus:ring-[#0A5C4F]/15 transition-all shadow-2xs"
                />
              </div>

              <!-- Jawaban -->
              <div class="space-y-1.5">
                <label class="block text-slate-700 font-bold text-xs uppercase tracking-wider">
                  Jawaban (Answer) <span class="text-rose-500">*</span>
                </label>
                <textarea
                  v-model="form.answer"
                  rows="4"
                  placeholder="Tuliskan jawaban yang lengkap, jelas, dan ramah untuk calon santri atau wali murid..."
                  required
                  class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-sans focus:outline-none focus:bg-white focus:border-[#0A5C4F] focus:ring-2 focus:ring-[#0A5C4F]/15 transition-all shadow-2xs resize-none"
                ></textarea>
              </div>

              <!-- Status Publikasi Switch -->
              <div class="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <div class="space-y-0.5">
                  <span class="block text-xs font-bold text-slate-800">Status Publikasi</span>
                  <span class="block text-[11px] text-slate-500">
                    {{ form.isPublished ? 'Langsung tampil di website publik' : 'Disimpan sebagai draft (disembunyikan)' }}
                  </span>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" v-model="form.isPublished" class="sr-only peer" />
                  <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0A5C4F]"></div>
                </label>
              </div>

              <!-- Modal Actions -->
              <div class="flex items-center justify-end gap-2.5 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  @click="showModal = false"
                  class="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-bold transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  :disabled="submitting"
                  class="px-5 py-2.5 rounded-xl bg-[#0A5C4F] hover:bg-[#F4C430] hover:text-[#0A5C4F] text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5 active:translate-y-0.5 disabled:opacity-50"
                >
                  <span v-if="submitting" class="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span v-else class="material-symbols-outlined text-[16px]">save</span>
                  <span>{{ submitting ? 'Menyimpan...' : (isEditing ? 'Simpan Perubahan' : 'Tambah FAQ') }}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Modal Konfirmasi Hapus -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="showDeleteModal"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          @click="showDeleteModal = false"
          @keydown.window.escape="showDeleteModal = false"
        >
          <div
            class="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden font-sans"
            @click.stop
          >
            <div class="px-6 py-5 border-b border-gray-100 bg-gray-50/70 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shadow-sm">
                  <span class="material-symbols-outlined text-[20px]">delete_forever</span>
                </div>
                <div>
                  <h3 class="text-base font-bold text-gray-800">Hapus FAQ</h3>
                  <p class="text-xs text-gray-400">Konfirmasi penghapusan pertanyaan</p>
                </div>
              </div>
              <button type="button" @click="showDeleteModal = false" class="text-gray-400 hover:text-gray-700 p-1 rounded-lg">
                <span class="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div class="p-6 space-y-4">
              <div class="bg-rose-50 border border-rose-100 rounded-2xl p-4 text-xs text-slate-700 leading-relaxed">
                <p class="font-bold text-rose-800 mb-1">Pertanyaan berikut akan dihapus secara permanen:</p>
                <p class="font-medium text-slate-800 italic">"{{ faqToDelete?.question }}"</p>
              </div>

              <div class="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  @click="showDeleteModal = false"
                  class="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-bold transition-all"
                >
                  Batal
                </button>
                <button
                  type="button"
                  @click="executeDelete"
                  :disabled="deleting"
                  class="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-600/20 transition-all flex items-center gap-1.5 active:translate-y-0.5 disabled:opacity-50"
                >
                  <span v-if="deleting" class="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span v-else class="material-symbols-outlined text-[16px]">delete</span>
                  <span>{{ deleting ? 'Menghapus...' : 'Ya, Hapus Sekarang' }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

definePageMeta({ layout: 'admin', middleware: 'auth' })

interface FaqItem {
  id: number
  question: string
  answer: string
  orderIndex: number
  isPublished: boolean
  createdAt?: string
  updatedAt?: string
}

const authStore = useAuthStore()

const faqs = ref<FaqItem[]>([])
const loading = ref(true)
const submitting = ref(false)
const deleting = ref(false)
const savingOrder = ref(false)

const toastMessage = ref('')
const toastType = ref<'success' | 'error'>('success')

const showModal = ref(false)
const isEditing = ref(false)
const showDeleteModal = ref(false)
const faqToDelete = ref<FaqItem | null>(null)

const previewOpenIndex = ref<number | null>(0)

const form = reactive({
  id: 0,
  question: '',
  answer: '',
  isPublished: true,
})

const publishedFaqs = computed(() => faqs.value.filter((f) => f.isPublished))
const publishedCount = computed(() => publishedFaqs.value.length)
const draftCount = computed(() => faqs.value.length - publishedCount.value)

const showToast = (message: string, type: 'success' | 'error' = 'success') => {
  toastMessage.value = message
  toastType.value = type
  setTimeout(() => {
    if (toastMessage.value === message) toastMessage.value = ''
  }, 4000)
}

// Fetch FAQs (termasuk draft) dengan auth admin
const fetchFaqs = async () => {
  loading.value = true
  try {
    const data = await $fetch<FaqItem[]>('/api/faqs?all=true', {
      headers: authStore.authHeaders,
    })
    faqs.value = data || []
  } catch (err: any) {
    showToast(err?.data?.message || 'Gagal memuat data FAQ dari database', 'error')
  } finally {
    loading.value = false
  }
}

// Modal open handlers
const openCreateModal = () => {
  isEditing.value = false
  form.id = 0
  form.question = ''
  form.answer = ''
  form.isPublished = true
  showModal.value = true
}

const openEditModal = (faq: FaqItem) => {
  isEditing.value = true
  form.id = faq.id
  form.question = faq.question
  form.answer = faq.answer
  form.isPublished = faq.isPublished
  showModal.value = true
}

// Submit Create or Update
const submitForm = async () => {
  submitting.value = true
  try {
    if (isEditing.value) {
      const res = await $fetch<{ success: boolean; faq: FaqItem }>(`/api/faqs/${form.id}`, {
        method: 'PUT',
        headers: authStore.authHeaders,
        body: {
          question: form.question,
          answer: form.answer,
          isPublished: form.isPublished,
        },
      })
      const idx = faqs.value.findIndex((f) => f.id === form.id)
      if (idx !== -1 && res.faq) faqs.value[idx] = res.faq
      showToast('FAQ berhasil diperbarui!')
    } else {
      const res = await $fetch<{ success: boolean; faq: FaqItem }>('/api/faqs', {
        method: 'POST',
        headers: authStore.authHeaders,
        body: {
          question: form.question,
          answer: form.answer,
          isPublished: form.isPublished,
        },
      })
      if (res.faq) faqs.value.push(res.faq)
      showToast('FAQ baru berhasil ditambahkan!')
    }
    showModal.value = false
  } catch (err: any) {
    showToast(err?.data?.message || 'Gagal menyimpan FAQ', 'error')
  } finally {
    submitting.value = false
  }
}

// Toggle Publish Status
const togglePublishStatus = async (faq: FaqItem) => {
  const newStatus = !faq.isPublished
  try {
    await $fetch(`/api/faqs/${faq.id}`, {
      method: 'PUT',
      headers: authStore.authHeaders,
      body: { isPublished: newStatus },
    })
    faq.isPublished = newStatus
    showToast(newStatus ? 'FAQ kini berstatus Diterbitkan' : 'FAQ disimpan sebagai Draft')
  } catch (err: any) {
    showToast(err?.data?.message || 'Gagal mengubah status', 'error')
  }
}

// Reorder (Move Up/Down)
const moveFaq = async (index: number, direction: -1 | 1) => {
  const targetIndex = index + direction
  if (targetIndex < 0 || targetIndex >= faqs.value.length) return

  // Swap in array
  const temp = faqs.value[index]
  faqs.value[index] = faqs.value[targetIndex]
  faqs.value[targetIndex] = temp

  // Update orderIndex
  const reorderPayload = faqs.value.map((f, i) => ({
    id: f.id,
    orderIndex: i,
  }))

  savingOrder.value = true
  try {
    await $fetch('/api/faqs/reorder', {
      method: 'PUT',
      headers: authStore.authHeaders,
      body: reorderPayload,
    })
  } catch (err: any) {
    showToast('Gagal menyimpan urutan FAQ', 'error')
  } finally {
    savingOrder.value = false
  }
}

// Delete handlers
const confirmDelete = (faq: FaqItem) => {
  faqToDelete.value = faq
  showDeleteModal.value = true
}

const executeDelete = async () => {
  if (!faqToDelete.value) return
  deleting.value = true
  const id = faqToDelete.value.id

  try {
    await $fetch(`/api/faqs/${id}`, {
      method: 'DELETE',
      headers: authStore.authHeaders,
    })
    faqs.value = faqs.value.filter((f) => f.id !== id)
    showToast('FAQ berhasil dihapus!')
    showDeleteModal.value = false
  } catch (err: any) {
    showToast(err?.data?.message || 'Gagal menghapus FAQ', 'error')
  } finally {
    deleting.value = false
    faqToDelete.value = null
  }
}

onMounted(() => {
  authStore.init()
  fetchFaqs()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.97);
}
</style>
