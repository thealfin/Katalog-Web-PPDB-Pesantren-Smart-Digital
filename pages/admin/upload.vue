<template>
  <div class="max-w-4xl animate-fade-in">
    <!-- Success Alert -->
    <Transition name="fade">
      <div v-if="successMsg" class="mb-8 flex items-center gap-4 bg-emerald-50 border border-emerald-200 rounded-2xl px-6 py-5 shadow-sm">
        <div class="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
          <Icon name="heroicons:check" class="text-white text-xl" />
        </div>
        <div>
          <p class="text-emerald-900 font-bold text-base">Upload Berhasil!</p>
          <p class="text-emerald-700 text-sm opacity-80">{{ successMsg }}</p>
        </div>
      </div>
    </Transition>

    <!-- Error Alert -->
    <Transition name="fade">
      <div v-if="errorMsg" class="mb-8 flex items-center gap-4 bg-rose-50 border border-rose-200 rounded-2xl px-6 py-5 shadow-sm">
        <div class="w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center shrink-0">
          <Icon name="heroicons:exclamation-triangle" class="text-white text-xl" />
        </div>
        <p class="text-rose-900 font-bold text-sm">{{ errorMsg }}</p>
      </div>
    </Transition>

    <!-- Form -->
    <form class="space-y-8" @submit.prevent="handleUpload">
      <!-- Basic Info -->
      <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="px-8 py-6 border-b border-gray-50 bg-gray-50/50">
          <h3 class="text-gray-800 font-bold flex items-center gap-2">
            <Icon name="heroicons:information-circle" class="text-psd-green text-lg" />
            Informasi Dasar Template
          </h3>
        </div>
        <div class="p-8 space-y-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="block text-gray-700 font-semibold text-sm">Nama Template <span class="text-rose-500">*</span></label>
              <input
                v-model="form.name"
                type="text"
                placeholder="Contoh: Hijau Emerald"
                required
                class="admin-input-new"
                @input="generateSlug"
              />
            </div>
            <div class="space-y-2">
              <label class="block text-gray-700 font-semibold text-sm">Slug (URL Otomatis) <span class="text-rose-500">*</span></label>
              <input v-model="form.slug" type="text" placeholder="hijau-emerald" required class="admin-input-new bg-gray-50 cursor-not-allowed" readonly />
            </div>
          </div>
          <div class="space-y-2">
            <label class="block text-gray-700 font-semibold text-sm">Deskripsi Singkat <span class="text-rose-500">*</span></label>
            <textarea
              v-model="form.description"
              rows="3"
              placeholder="Jelaskan keunggulan template ini..."
              required
              class="admin-input-new resize-none"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Theme & Colors -->
      <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="px-8 py-6 border-b border-gray-50 bg-gray-50/50">
          <h3 class="text-gray-800 font-bold flex items-center gap-2">
            <Icon name="heroicons:swatch" class="text-psd-green text-lg" />
            Visual & Skema Warna
          </h3>
        </div>
        <div class="p-8">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div class="space-y-2">
              <label class="block text-gray-700 font-semibold text-sm">Warna Utama</label>
              <div class="flex items-center gap-3">
                <input v-model="form.colorPrimary" type="color" class="w-12 h-12 rounded-xl cursor-pointer border-2 border-gray-100 p-1" />
                <input v-model="form.colorPrimary" type="text" class="admin-input-new font-mono text-xs" placeholder="#0A5C4F" />
              </div>
            </div>
            <div class="space-y-2">
              <label class="block text-gray-700 font-semibold text-sm">Kategori Warna <span class="text-rose-500">*</span></label>
              <select v-model="form.colorScheme" required class="admin-input-new">
                <option value="">Pilih warna...</option>
                <option v-for="c in colorSchemes" :key="c.value" :value="c.value">{{ c.label }}</option>
              </select>
            </div>
            <div class="space-y-2">
              <label class="block text-gray-700 font-semibold text-sm">Gaya Desain <span class="text-rose-500">*</span></label>
              <select v-model="form.style" required class="admin-input-new">
                <option value="">Pilih gaya...</option>
                <option value="minimal">Minimalist</option>
                <option value="classic">Classic Islamic</option>
                <option value="modern">Modern Glass</option>
                <option value="formal">Executive Formal</option>
              </select>
            </div>
          </div>
          <div class="mt-6 space-y-2">
            <label class="block text-gray-700 font-semibold text-sm">Nama Tema <span class="text-rose-500">*</span></label>
            <input v-model="form.theme" type="text" placeholder="Contoh: Modern Hijau Glass" required class="admin-input-new" />
          </div>
        </div>
      </div>

      <!-- File Assets -->
      <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="px-8 py-6 border-b border-gray-50 bg-gray-50/50">
          <h3 class="text-gray-800 font-bold flex items-center gap-2">
            <Icon name="heroicons:folder-open" class="text-psd-green text-lg" />
            File & Aset Template
          </h3>
        </div>
        <div class="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Preview Image -->
          <div class="space-y-3">
            <label class="block text-gray-700 font-semibold text-sm">Preview Gambar (Thumbnail)</label>
            <div
              class="relative group border-2 border-dashed border-gray-200 rounded-3xl p-4 transition-all hover:border-psd-green/40 hover:bg-psd-green/[0.02]"
              @click="$refs.previewInput.click()"
              @dragover.prevent
              @drop.prevent="handleImageDrop"
            >
              <div v-if="previewImageUrl" class="relative rounded-2xl overflow-hidden aspect-video border border-gray-100 shadow-sm">
                <img :src="previewImageUrl" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span class="text-white text-xs font-bold px-3 py-1 bg-white/20 backdrop-blur-md rounded-full">Ganti Gambar</span>
                </div>
              </div>
              <div v-else class="py-8 text-center flex flex-col items-center justify-center cursor-pointer">
                <div class="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4 text-gray-400 group-hover:text-psd-green group-hover:bg-psd-green/10 transition-colors">
                  <Icon name="heroicons:photo" class="text-3xl" />
                </div>
                <p class="text-gray-800 font-bold text-sm">Klik untuk upload</p>
                <p class="text-gray-400 text-xs mt-1">PNG, JPG atau WebP (Max 2MB)</p>
              </div>
            </div>
            <input ref="previewInput" type="file" accept="image/*" class="hidden" @change="handleImageChange" />
          </div>

          <!-- ZIP File -->
          <div class="space-y-3">
            <label class="block text-gray-700 font-semibold text-sm">Source Code (ZIP) <span class="text-rose-500">*</span></label>
            <div
              class="relative group border-2 border-dashed border-gray-200 rounded-3xl p-4 transition-all hover:border-psd-green/40 hover:bg-psd-green/[0.02]"
              :class="{ 'border-psd-green/40 bg-psd-green/[0.02]': zipFile }"
              @click="$refs.zipInput.click()"
              @dragover.prevent
              @drop.prevent="handleZipDrop"
            >
              <div v-if="zipFile" class="py-10 text-center flex flex-col items-center justify-center cursor-pointer">
                <div class="w-16 h-16 rounded-2xl bg-psd-green flex items-center justify-center mb-4 text-white shadow-lg shadow-psd-green/20">
                  <Icon name="heroicons:archive-box" class="text-3xl" />
                </div>
                <p class="text-psd-green font-bold text-sm">{{ zipFile.name }}</p>
                <p class="text-gray-400 text-xs mt-1">{{ formatBytes(zipFile.size) }} • Siap diupload</p>
              </div>
              <div v-else class="py-8 text-center flex flex-col items-center justify-center cursor-pointer">
                <div class="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4 text-gray-400 group-hover:text-psd-green group-hover:bg-psd-green/10 transition-colors">
                  <Icon name="heroicons:archive-box" class="text-3xl" />
                </div>
                <p class="text-gray-800 font-bold text-sm">Pilih File ZIP</p>
                <p class="text-gray-400 text-xs mt-1">Harus berisi file index.html</p>
              </div>
            </div>
            <input ref="zipInput" type="file" accept=".zip" class="hidden" @change="handleZipChange" />
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center justify-end gap-4 pt-4">
        <NuxtLink to="/admin" class="px-8 py-3.5 text-gray-500 font-bold hover:text-gray-800 transition-colors">Batal</NuxtLink>
        <button
          type="submit"
          :disabled="uploading"
          class="bg-psd-green text-white px-10 py-3.5 rounded-2xl font-bold hover:bg-[#084a40] transition-all shadow-lg shadow-psd-green/20 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Icon v-if="uploading" name="heroicons:arrow-path" class="animate-spin text-xl" />
          <Icon v-else name="heroicons:cloud-arrow-up" class="text-xl" />
          {{ uploading ? 'Proses Upload...' : 'Publish Template Sekarang' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { upload } from '@vercel/blob/client'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const authStore = useAuthStore()

const form = reactive({
  name: '',
  slug: '',
  description: '',
  theme: '',
  colorPrimary: '#0A5C4F',
  colorScheme: '',
  style: '',
  tags: '',
  features: 'Hero, Profil, Keunggulan, Program, Galeri, Testimoni, Pendaftaran, Lokasi',
  isNew: true,
  isFeatured: false,
})

const previewImageFile = ref<File | null>(null)
const previewImageUrl = ref('')
const zipFile = ref<File | null>(null)
const uploading = ref(false)
const successMsg = ref('')
const errorMsg = ref('')

const previewInput = ref<HTMLInputElement>()
const zipInput = ref<HTMLInputElement>()

const colorSchemes = [
  { value: 'green', label: 'Hijau (Green)' },
  { value: 'blue', label: 'Biru (Blue)' },
  { value: 'gold', label: 'Emas (Gold)' },
  { value: 'maroon', label: 'Marun (Maroon)' },
  { value: 'teal', label: 'Tosca (Teal)' },
  { value: 'gray', label: 'Abu-abu (Gray)' },
  { value: 'purple', label: 'Ungu (Purple)' },
  { value: 'orange', label: 'Oranye (Orange)' },
  { value: 'brown', label: 'Coklat (Brown)' },
]

const generateSlug = () => {
  form.slug = form.name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

const handleImageChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  if (file.size > 2 * 1024 * 1024) {
    errorMsg.value = 'Gambar terlalu besar (maksimal 2MB)'
    return
  }
  previewImageFile.value = file
  previewImageUrl.value = URL.createObjectURL(file)
}

const handleImageDrop = (e: DragEvent) => {
  const file = e.dataTransfer?.files?.[0]
  if (file && file.type.startsWith('image/')) {
    previewImageFile.value = file
    previewImageUrl.value = URL.createObjectURL(file)
  }
}

const handleZipChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  if (file.size > 200 * 1024 * 1024) {
    errorMsg.value = 'File ZIP terlalu besar (maksimal 200MB)'
    return
  }
  zipFile.value = file
}

const handleZipDrop = (e: DragEvent) => {
  const file = e.dataTransfer?.files?.[0]
  if (file && file.name.endsWith('.zip')) zipFile.value = file
}

const formatBytes = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

const handleUpload = async () => {
  if (!zipFile.value) {
    errorMsg.value = 'File ZIP wajib diupload'
    return
  }

  uploading.value = true
  errorMsg.value = ''
  successMsg.value = ''

  try {
    const isProd = import.meta.env.PROD
    let zipUrl = ''
    let imageUrl = ''

    if (isProd) {
      // PRODUCTION: upload langsung dari browser ke Vercel Blob.
      // File tidak melewati serverless function, jadi aman dari limit 4.5MB.
      const clientPayload = JSON.stringify({
        name: form.name,
        slug: form.slug,
        description: form.description,
        theme: form.theme,
        colorPrimary: form.colorPrimary,
        colorScheme: form.colorScheme,
        style: form.style,
        tags: form.tags,
        features: form.features,
      })

      const zipResult = await upload(`templates/${form.slug}/source.zip`, zipFile.value, {
        access: 'public',
        multipart: true,
        contentType: 'application/zip',
        handleUploadUrl: '/api/templates/upload-token',
        clientPayload,
        headers: { 'x-admin-auth': 'true' },
      })
      zipUrl = zipResult.url

      if (previewImageFile.value) {
        const imgResult = await upload(`templates/${form.slug}/preview.png`, previewImageFile.value, {
          access: 'public',
          multipart: true,
          handleUploadUrl: '/api/templates/upload-token',
          clientPayload,
          headers: { 'x-admin-auth': 'true' },
        })
        imageUrl = imgResult.url
      }
    }

    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('slug', form.slug)
    formData.append('description', form.description)
    formData.append('theme', form.theme)
    formData.append('colorPrimary', form.colorPrimary)
    formData.append('colorScheme', form.colorScheme)
    formData.append('style', form.style)
    formData.append('tags', form.tags)
    formData.append('features', form.features)
    if (!zipUrl) formData.append('zipFile', zipFile.value)
    if (zipUrl) formData.append('zipUrl', zipUrl)
    if (imageUrl) formData.append('previewImageUrl', imageUrl)
    if (previewImageFile.value && !imageUrl) formData.append('previewImage', previewImageFile.value)

    await $fetch('/api/templates/upload', {
      method: 'POST',
      body: formData,
      headers: { 'x-admin-auth': 'true' },
    })
    successMsg.value = `Template "${form.name}" telah berhasil dipublikasikan!`
    // Reset form
    Object.assign(form, {
      name: '', slug: '', description: '', theme: '',
      colorPrimary: '#0A5C4F', colorScheme: '', style: '',
      tags: '', isNew: true, isFeatured: false,
    })
    zipFile.value = null
    previewImageFile.value = null
    previewImageUrl.value = ''
  } catch (e: any) {
    errorMsg.value = e?.data?.message || 'Terjadi kesalahan saat mengupload. Silakan coba lagi.'
  } finally {
    uploading.value = false
  }
}
</script>

<style scoped>
.admin-input-new {
  @apply w-full px-5 py-3.5 bg-white border border-gray-200 rounded-2xl text-gray-800 placeholder-gray-400 text-sm
    focus:outline-none focus:border-psd-green focus:ring-4 focus:ring-psd-green/5 transition-all duration-300;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

