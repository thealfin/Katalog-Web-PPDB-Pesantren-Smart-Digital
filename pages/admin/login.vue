<template>
  <div
    class="min-h-screen bg-[#0A5C4F] flex items-center justify-center p-4 relative overflow-hidden font-sans"
    style="background-image: url('data:image/svg+xml,%3Csvg width=\'100\' height=\'20\' viewBox=\'0 0 100 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.735-5.197-1.575-8.244-2.653C65.666 14.195 59.554 11.968 50 11.968c-9.643 0-16.196 2.37-25.766 5.672-3.238 1.117-6.07 1.962-8.683 2.682h5.633zM28.452 8.35c3.06-.47 6.326-.743 9.77-.743 17.585 0 28.528 7.058 35.15 13.393h6.233c-7.77-7.61-20.252-14.393-41.383-14.393-4.717 0-9.124.443-13.155 1.144L28.452 8.35z\' fill=\'%23136f60\' fill-opacity=\'0.45\' fill-rule=\'evenodd\'/%3E%3C/svg%3E');"
  >
    <!-- Background Ambient Glow Accents (Matching Landing Page & Ecosystem) -->
    <div class="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>
    <div class="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-[#F4C430]/15 blur-3xl pointer-events-none"></div>

    <div class="relative w-full max-w-md z-10">
      <!-- Apple-Style Window Card Frame -->
      <div class="bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/30 backdrop-blur-xl">
        <!-- Apple macOS Window Header (Red, Yellow, Green Traffic Light Dots) -->
        <div class="bg-[#1E222B] px-5 py-3.5 border-b border-slate-700/80 flex items-center justify-between">
          <!-- 3 Apple Dots -->
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/80 shadow-sm inline-block" title="Tutup"></span>
            <span class="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/80 shadow-sm inline-block" title="Minimalkan"></span>
            <span class="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/80 shadow-sm inline-block" title="Perbesar"></span>
          </div>

          <!-- Apple Window Address Pill -->
          <div class="bg-black/35 border border-white/10 rounded-lg px-3 py-1 flex items-center gap-1.5 shadow-inner">
            <span class="material-symbols-outlined text-emerald-400 text-[13px]">lock</span>
            <span class="text-[11px] font-mono text-slate-300 tracking-tight">admin.ppdb.ponpes.id</span>
          </div>

          <!-- Empty placeholder for balance -->
          <div class="w-12"></div>
        </div>

        <!-- Window Body (Login Form) -->
        <div class="p-6 sm:p-8">
          <!-- Official PSD Logo & Title -->
          <div class="text-center mb-6">
            <div class="w-16 h-16 rounded-full overflow-hidden mx-auto mb-3 shadow-lg border-2 border-white ring-4 ring-[#0A5C4F]/10 bg-white">
              <img
                src="/logo-psd.jpeg"
                alt="Logo Pesantren Smart Digital"
                class="w-full h-full object-cover"
              />
            </div>
            <h1 class="font-sans text-2xl font-extrabold text-slate-900 tracking-tight">
              Admin Login
            </h1>
            <p class="font-sans text-xs text-slate-500 mt-1">
              Portal Manajemen Katalog Web PPDB Pesantren
            </p>
          </div>

          <!-- Error Alert -->
          <Transition name="fade">
            <div
              v-if="errorMessage"
              class="mb-5 flex items-center gap-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl px-4 py-3 text-xs font-semibold shadow-sm"
            >
              <span class="material-symbols-outlined text-rose-500 text-[18px] shrink-0">error</span>
              <p class="font-sans">{{ errorMessage }}</p>
            </div>
          </Transition>

          <!-- Login Form -->
          <form @submit.prevent="handleLogin" class="space-y-4">
            <!-- Username Input -->
            <div>
              <label for="username" class="block font-sans text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Username
              </label>
              <div class="relative">
                <span class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[20px] pointer-events-none">
                  person
                </span>
                <input
                  id="username"
                  v-model="form.username"
                  type="text"
                  placeholder="psdadmin"
                  autocomplete="username"
                  required
                  class="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 text-sm font-sans focus:outline-none focus:bg-white focus:border-[#0A5C4F] focus:ring-2 focus:ring-[#0A5C4F]/15 transition-all shadow-sm"
                />
              </div>
            </div>

            <!-- Password Input -->
            <div>
              <label for="password" class="block font-sans text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div class="relative">
                <span class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[20px] pointer-events-none">
                  lock
                </span>
                <input
                  id="password"
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="••••••••"
                  autocomplete="current-password"
                  required
                  class="w-full pl-11 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 text-sm font-sans focus:outline-none focus:bg-white focus:border-[#0A5C4F] focus:ring-2 focus:ring-[#0A5C4F]/15 transition-all shadow-sm"
                />
                <button
                  type="button"
                  class="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 transition-colors"
                  @click="showPassword = !showPassword"
                  title="Lihat / Sembunyikan Password"
                >
                  <span class="material-symbols-outlined text-[20px]">
                    {{ showPassword ? 'visibility_off' : 'visibility' }}
                  </span>
                </button>
              </div>
            </div>

            <!-- Submit Button (Hero Green with Gold Hover) -->
            <button
              type="submit"
              :disabled="loading"
              class="w-full py-3.5 px-4 bg-[#0A5C4F] text-white rounded-xl font-sans font-extrabold text-xs hover:bg-[#F4C430] hover:text-[#0A5C4F] hover:shadow-lg transition-all duration-300 shadow-md disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4 active:translate-y-0.5"
            >
              <span v-if="loading" class="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
              <span>{{ loading ? 'Memverifikasi...' : 'Masuk ke Dashboard' }}</span>
              <span v-if="!loading" class="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </form>

          <!-- Back Link to Catalog -->
          <div class="mt-6 pt-5 border-t border-slate-100 text-center">
            <NuxtLink
              to="/"
              class="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#0A5C4F] transition-colors font-sans"
            >
              <span class="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>Kembali ke Halaman Katalog</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

definePageMeta({ layout: false })

const authStore = useAuthStore()
const router = useRouter()

// Redirect if already logged in
onMounted(() => {
  authStore.init()
  if (authStore.isAuthenticated) router.push('/admin')
})

const form = reactive({ username: '', password: '' })
const loading = ref(false)
const showPassword = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  errorMessage.value = ''
  loading.value = true

  const result = await authStore.login(form.username, form.password)

  loading.value = false

  if (result.success) {
    await router.push('/admin')
  } else {
    errorMessage.value = result.message
  }
}

useSeoMeta({
  title: 'Admin Login — PSD Web PPDB Katalog',
  description: 'Halaman masuk administrator katalog template website PPDB pesantren.',
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
