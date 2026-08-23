<template>
  <div class="max-w-4xl animate-fade-in">
    <!-- Header -->
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h2 class="text-gray-800 text-2xl font-bold">Edit Template</h2>
        <p class="text-gray-500 text-sm">Ubah detail atau perbarui aset template <strong>{{ originalName }}</strong></p>
      </div>
      <NuxtLink to="/admin" class="text-sm text-gray-500 hover:text-psd-green flex items-center gap-1 transition-colors">
        <Icon name="heroicons:arrow-left" /> Kembali ke Daftar
      </NuxtLink>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="py-20 text-center">
      <Icon name="heroicons:arrow-path" class="animate-spin text-4xl text-psd-green mb-4" />
      <p class="text-gray-500">Memuat data template...</p>
    </div>

    <!-- Form -->
    <form v-else class="space-y-8" @submit.prevent="handleUpdate">
      <!-- Basic Info -->
      <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="px-8 py-6 border-b border-gray-50 bg-gray-50/50">
          <h3 class="text-gray-800 font-bold flex items-center gap-2">
            <Icon name="heroicons:information-circle" class="text-psd-green text-lg" />
            Informasi Dasar
          </h3>
        </div>
        <div class="p-8 space-y-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="block text-gray-700 font-semibold text-sm">Nama Template</label>
              <input v-model="form.name" type="text" required class="admin-input-new" />
            </div>
            <div class="space-y-2">
              <label class="block text-gray-700 font-semibold text-sm">Slug (Tidak dapat diubah)</label>
              <input :value="slug" type="text" readonly class="admin-input-new bg-gray-50 cursor-not-allowed opacity-70" />
            </div>
          </div>
          <div class="space-y-2">
            <label class="block text-gray-700 font-semibold text-sm">Deskripsi Singkat</label>
            <textarea v-model="form.description" rows="3" required class="admin-input-new resize-none"></textarea>
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
        <div class="p-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div class="space-y-2">
            <label class="block text-gray-700 font-semibold text-sm">Warna Utama</label>
            <div class="flex items-center gap-3">
              <input v-model="form.colorPrimary" type="color" class="w-12 h-12 rounded-xl cursor-pointer border-2 border-gray-100 p-1" />
              <input v-model="form.colorPrimary" type="text" class="admin-input-new font-mono text-xs" />
            </div>
          </div>
          <div class="space-y-2">
            <label class="block text-gray-700 font-semibold text-sm">Kategori Warna</label>
            <select v-model="form.colorScheme" required class="admin-input-new">
              <option v-for="c in colorSchemes" :key="c.value" :value="c.value">{{ c.label }}</option>
            </select>
          </div>
          <div class="space-y-2">
            <label class="block text-gray-700 font-semibold text-sm">Gaya Desain</label>
            <select v-model="form.style" required class="admin-input-new">
              <option value="minimal">Minimalist</option>
              <option value="classic">Classic Islamic</option>
              <option value="modern">Modern Glass</option>
              <option value="formal">Executive Formal</option>
            </select>
          </div>
          <div class="sm:col-span-3 space-y-2">
            <label class="block text-gray-700 font-semibold text-sm">Nama Tema</label>
            <input v-model="form.theme" type="text" required class="admin-input-new" />
          </div>
        </div>
      </div>

      <!-- Status & Tags -->
      <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="px-8 py-6 border-b border-gray-50 bg-gray-50/50">
          <h3 class="text-gray-800 font-bold flex items-center gap-2">
            <Icon name="heroicons:tag" class="text-psd-green text-lg" />
            Status & Tagging
          </h3>
        </div>
        <div class="p-8 space-y-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="block text-gray-700 font-semibold text-sm">Fitur (Pisah koma)</label>
              <input v-model="form.features" type="text" class="admin-input-new" />
            </div>
            <div class="space-y-2">
              <label class="block text-gray-700 font-semibold text-sm">Tags (Pisah koma)</label>
              <input v-model="form.tags" type="text" class="admin-input-new" />
            </div>
          </div>
          <div class="flex items-center gap-8">
            <label class="flex items-center gap-3 cursor-pointer group">
              <input v-model="form.isNew" type="checkbox" class="w-5 h-5 rounded-lg accent-psd-green" />
              <span class="text-gray-700 font-medium text-sm group-hover:text-psd-green transition-colors">Tandai sebagai Baru ✨</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer group">
              <input v-model="form.isFeatured" type="checkbox" class="w-5 h-5 rounded-lg accent-psd-green" />
              <span class="text-gray-700 font-medium text-sm group-hover:text-psd-green transition-colors">Tandai sebagai Unggulan ⭐</span>
            </label>
          </div>
        </div>
      </div>

      <!-- File Assets -->
      <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="px-8 py-6 border-b border-gray-50 bg-gray-50/50">
          <h3 class="text-gray-800 font-bold flex items-center gap-2">
            <Icon name="heroicons:cloud-arrow-up" class="text-psd-green text-lg" />
            Perbarui Aset (Opsional)
          </h3>
        </div>
        <div class="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Preview Image -->
          <div class="space-y-3">
            <label class="block text-gray-700 font-semibold text-sm">Ganti Gambar Preview</label>
            <div
              class="relative group border-2 border-dashed border-gray-200 rounded-3xl p-4 transition-all hover:border-psd-green/40 hover:bg-psd-green/[0.02]"
              @click="$refs.previewInput.click()"
            >
              <div v-if="previewImageUrl" class="relative rounded-2xl overflow-hidden aspect-video">
                <img :src="previewImageUrl" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span class="text-white text-xs font-bold px-3 py-1 bg-white/20 backdrop-blur-md rounded-full">Ganti Gambar</span>
                </div>
              </div>
              <div v-else class="py-8 text-center flex flex-col items-center justify-center cursor-pointer">
                <Icon name="heroicons:photo" class="text-3xl text-gray-400 group-hover:text-psd-green transition-colors" />
                <p class="text-gray-800 font-bold text-sm mt-2">Klik untuk ganti</p>
                <p class="text-gray-400 text-xs mt-1">Hanya jika ingin mengubah preview</p>
              </div>
            </div>
            <input ref="previewInput" type="file" accept="image/*" class="hidden" @change="handleImageChange" />
          </div>

          <!-- ZIP File -->
          <div class="space-y-3">
            <label class="block text-gray-700 font-semibold text-sm">Ganti File ZIP Template</label>
            <div
              class="relative group border-2 border-dashed border-gray-200 rounded-3xl p-4 transition-all hover:border-psd-green/40 hover:bg-psd-green/[0.02]"
              @click="$refs.zipInput.click()"
            >
              <div v-if="zipFile" class="py-10 text-center flex flex-col items-center justify-center">
                <div class="w-12 h-12 rounded-xl bg-psd-green flex items-center justify-center text-white mb-3 shadow-lg shadow-psd-green/20">
                  <Icon name="heroicons:archive-box" class="text-2xl" />
                </div>
                <p class="text-psd-green font-bold text-sm">{{ zipFile.name }}</p>
                <p class="text-gray-400 text-xs mt-1">Siap menggantikan file lama</p>
              </div>
              <div v-else class="py-8 text-center flex flex-col items-center justify-center cursor-pointer">
                <Icon name="heroicons:archive-box-arrow-down" class="text-3xl text-gray-400 group-hover:text-psd-green transition-colors" />
                <p class="text-gray-800 font-bold text-sm mt-2">Upload ZIP Baru</p>
                <p class="text-gray-400 text-xs mt-1">Hanya jika ingin update source code</p>
              </div>
            </div>
            <input ref="zipInput" type="file" accept=".zip" class="hidden" @change="handleZipChange" />
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center justify-end gap-4 pt-4 pb-12">
        <NuxtLink to="/admin" class="px-8 py-3.5 text-gray-500 font-bold hover:text-gray-800 transition-colors">Batal</NuxtLink>
        <button
          type="submit"
          :disabled="updating"
          class="bg-psd-green text-white px-10 py-3.5 rounded-2xl font-bold hover:bg-[#084a40] transition-all shadow-lg shadow-psd-green/20 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Icon v-if="updating" name="heroicons:arrow-path" class="animate-spin text-xl" />
          <Icon v-else name="heroicons:check-circle" class="text-xl" />
          {{ updating ? 'Menyimpan...' : 'Simpan Perubahan' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { upload } from '@vercel/blob/client'

const route = useRoute()
const router = useRouter()
const slug = route.params.slug as string

definePageMeta({ layout: 'admin', middleware: 'auth' })

const loading = ref(true)
const updating = ref(false)
const originalName = ref('')

const form = reactive({
  name: '',
  description: '',
  theme: '',
  colorPrimary: '',
  colorScheme: '',
  style: '',
  features: '',
  tags: '',
  isNew: false,
  isFeatured: false,
})

const previewImageFile = ref<File | null>(null)
const previewImageUrl = ref('')
const zipFile = ref<File | null>(null)

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

// Fetch existing data
onMounted(async () => {
  try {
    const data: any = await $fetch(`/api/templates/${slug}`)
    Object.assign(form, {
      name: data.name,
      description: data.description,
      theme: data.theme,
      colorPrimary: data.colorPrimary,
      colorScheme: data.colorScheme,
      style: data.style,
      features: data.features.join(', '),
      tags: data.tags.join(', '),
      isNew: data.isNew,
      isFeatured: data.isFeatured,
    })
    originalName.value = data.name
    previewImageUrl.value = data.previewImage
  } catch (e) {
    alert('Gagal memuat data template')
    router.push('/admin')
  } finally {
    loading.value = false
  }
})

const handleImageChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    previewImageFile.value = file
    previewImageUrl.value = URL.createObjectURL(file)
  }
}

const handleZipChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) zipFile.value = file
}

const handleUpdate = async () => {
  updating.value = true

  try {
    const isProd = import.meta.env.PROD
    let zipUrl = ''
    let imageUrl = ''

    if (isProd) {
      const clientPayload = JSON.stringify({
        name: form.name,
        slug,
        description: form.description,
        theme: form.theme,
        colorPrimary: form.colorPrimary,
        colorScheme: form.colorScheme,
        style: form.style,
        tags: form.tags,
        features: form.features,
      })

      if (zipFile.value) {
        const zipResult = await upload(`templates/${slug}/source.zip`, zipFile.value, {
          access: 'public',
          multipart: true,
          contentType: 'application/zip',
          handleUploadUrl: '/api/templates/upload-token',
          clientPayload,
          headers: { 'x-admin-auth': 'true' },
        })
        zipUrl = zipResult.url
      }

      if (previewImageFile.value) {
        const imgResult = await upload(`templates/${slug}/preview.png`, previewImageFile.value, {
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
    formData.append('description', form.description)
    formData.append('theme', form.theme)
    formData.append('colorPrimary', form.colorPrimary)
    formData.append('colorScheme', form.colorScheme)
    formData.append('style', form.style)
    formData.append('features', form.features)
    formData.append('tags', form.tags)
    formData.append('isNew', String(form.isNew))
    formData.append('isFeatured', String(form.isFeatured))

    if (zipUrl) formData.append('zipUrl', zipUrl)
    if (imageUrl) formData.append('previewImageUrl', imageUrl)
    if (previewImageFile.value && !imageUrl) formData.append('previewImage', previewImageFile.value)
    if (zipFile.value && !zipUrl) formData.append('zipFile', zipFile.value)

    await $fetch(`/api/templates/${slug}`, {
      method: 'PUT',
      body: formData,
      headers: { 'x-admin-auth': 'true' },
    })
    alert('Template berhasil diperbarui!')
    router.push('/admin')
  } catch (e: any) {
    alert(e?.data?.message || 'Gagal memperbarui template')
  } finally {
    updating.value = false
  }
}
</script>

<style scoped>
.admin-input-new {
  @apply w-full px-5 py-3.5 bg-white border border-gray-200 rounded-2xl text-gray-800 placeholder-gray-400 text-sm
    focus:outline-none focus:border-psd-green focus:ring-4 focus:ring-psd-green/5 transition-all duration-300;
}
</style>
