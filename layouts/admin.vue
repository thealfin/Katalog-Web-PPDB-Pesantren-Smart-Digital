<template>
  <div class="min-h-screen bg-slate-50 flex font-sans">
    <!-- Sidebar Admin -->
    <aside
      class="w-64 bg-[#0A5C4F] text-white flex-shrink-0 flex flex-col h-screen sticky top-0 overflow-hidden shadow-2xl relative border-r border-white/10"
      style="background-image: url('data:image/svg+xml,%3Csvg width=\'100\' height=\'20\' viewBox=\'0 0 100 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.735-5.197-1.575-8.244-2.653C65.666 14.195 59.554 11.968 50 11.968c-9.643 0-16.196 2.37-25.766 5.672-3.238 1.117-6.07 1.962-8.683 2.682h5.633zM28.452 8.35c3.06-.47 6.326-.743 9.77-.743 17.585 0 28.528 7.058 35.15 13.393h6.233c-7.77-7.61-20.252-14.393-41.383-14.393-4.717 0-9.124.443-13.155 1.144L28.452 8.35z\' fill=\'%23136f60\' fill-opacity=\'0.45\' fill-rule=\'evenodd\'/%3E%3C/svg%3E');"
    >
      <!-- Logo PSD & Branding -->
      <div class="p-6 border-b border-white/10 relative z-10">
        <NuxtLink to="/admin" class="flex flex-col items-center text-center group">
          <div class="w-14 h-14 rounded-full overflow-hidden mb-3 shadow-lg border-2 border-white ring-2 ring-[#F4C430]/30 bg-white group-hover:scale-105 transition-transform duration-300">
            <img src="/logo-psd.jpeg" alt="Logo PSD" class="w-full h-full object-cover">
          </div>
          <h2 class="font-bold text-base uppercase tracking-wider text-white">Admin Panel</h2>
          <span class="text-[11px] text-[#F4C430] font-medium tracking-wide">Katalog Web PPDB</span>
        </NuxtLink>
      </div>
      
      <!-- Navigation Items -->
      <nav class="flex-1 min-h-0 overflow-y-auto p-4 space-y-1.5 custom-scrollbar relative z-10">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 group font-sans text-xs font-semibold"
          active-class="sidebar-active !text-[#0A5C4F] !bg-[#F4C430] !font-bold shadow-md"
        >
          <span class="material-symbols-outlined text-[20px] transition-transform group-hover:scale-110">
            {{ item.icon }}
          </span>
          <span>{{ item.label }}</span>
        </NuxtLink>
      </nav>

      <!-- Bottom Actions -->
      <div class="p-5 mt-auto border-t border-white/10 relative z-10">
        <NuxtLink
          to="/"
          class="flex items-center gap-2.5 text-xs font-semibold text-white/80 hover:text-white hover:bg-white/10 px-3 py-2.5 rounded-xl transition w-full group"
        >
          <span class="material-symbols-outlined text-[18px] group-hover:-translate-x-0.5 transition-transform">arrow_back</span>
          <span>Kembali ke Web</span>
        </NuxtLink>
      </div>
    </aside>

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col min-h-screen">
      <!-- Top Bar -->
      <header class="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 sm:px-10 sticky top-0 z-20 shadow-sm">
        <div>
          <h1 class="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">{{ pageTitle }}</h1>
          <p class="text-slate-500 text-xs mt-0.5 font-medium">Pesantren Smart Digital &bull; Panel Manajemen PPDB</p>
        </div>
        
        <div class="flex items-center gap-4 sm:gap-6">
          <div class="h-8 w-px bg-slate-200 hidden sm:block"></div>
          
          <!-- Admin User Badge with PSD Logo -->
          <div class="flex items-center gap-3 bg-slate-50 px-3.5 py-1.5 rounded-2xl border border-slate-200 shadow-sm">
            <div class="w-8 h-8 rounded-full overflow-hidden border border-[#0A5C4F]/20 bg-white">
              <img src="/logo-psd.jpeg" alt="Admin" class="w-full h-full object-cover">
            </div>
            <div class="flex flex-col text-left">
              <span class="text-xs font-bold text-slate-800 leading-none">Admin Utama</span>
              <span class="text-[10px] text-[#0A5C4F] font-bold flex items-center gap-1 mt-0.5">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Online</span>
              </span>
            </div>
          </div>

          <!-- Top Bar Quick Logout Button -->
          <button
            type="button"
            @click="showLogoutModal = true"
            class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-rose-200/70 transition-all shadow-sm active:translate-y-0.5"
            title="Keluar dari Panel Admin"
          >
            <span class="material-symbols-outlined text-[16px]">logout</span>
            <span>Keluar</span>
          </button>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 p-6 sm:p-10">
        <div class="max-w-6xl mx-auto">
          <slot />
        </div>
      </main>
    </div>

    <!-- Modal Konfirmasi Logout (Apple-Style Glassmorphism matching Tambah Kategori) -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="showLogoutModal"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          @click="showLogoutModal = false"
          @keydown.window.escape="showLogoutModal = false"
        >
          <div
            class="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden font-sans"
            @click.stop
          >
            <!-- Modal Header -->
            <div class="px-6 py-5 border-b border-gray-100 bg-gray-50/70 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shadow-sm">
                  <span class="material-symbols-outlined text-[20px]">logout</span>
                </div>
                <div>
                  <h3 class="text-base font-bold text-gray-800 font-sans">Keluar Panel Admin</h3>
                  <p class="text-xs text-gray-400 font-sans">Konfirmasi sesi administrator</p>
                </div>
              </div>
              <button
                type="button"
                @click="showLogoutModal = false"
                class="text-gray-400 hover:text-gray-700 p-1 rounded-lg transition-colors"
              >
                <span class="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <!-- Modal Body -->
            <div class="p-6 space-y-5 font-sans">
              <div class="flex items-start gap-3.5 bg-rose-50/70 border border-rose-100/90 rounded-2xl p-4">
                <div class="w-8 h-8 rounded-lg bg-rose-100/80 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                  <span class="material-symbols-outlined text-[20px]">warning</span>
                </div>
                <div class="text-xs text-slate-600 leading-relaxed">
                  <p class="font-bold text-slate-800 text-sm mb-1">Apakah Anda yakin ingin keluar?</p>
                  Sesi login administrator Anda akan diakhiri. Anda perlu memasukkan kredensial username dan password kembali untuk mengelola katalog template PPDB.
                </div>
              </div>

              <!-- Actions -->
              <div class="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  @click="showLogoutModal = false"
                  :disabled="isLoggingOut"
                  class="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-bold transition-all disabled:opacity-50"
                >
                  Batal
                </button>
                <button
                  type="button"
                  @click="confirmLogout"
                  :disabled="isLoggingOut"
                  class="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-600/20 transition-all flex items-center gap-1.5 active:translate-y-0.5 disabled:opacity-50"
                >
                  <span v-if="isLoggingOut" class="inline-block w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span v-else class="material-symbols-outlined text-[16px]">logout</span>
                  <span>{{ isLoggingOut ? 'Mengeluarkan...' : 'Ya, Keluar Sekarang' }}</span>
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
import { useRoute, useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: 'dashboard' },
  { to: '/admin/upload', label: 'Upload Template', icon: 'cloud_upload' },
  { to: '/admin/faqs', label: 'Kelola FAQ', icon: 'quiz' },
  { to: '/', label: 'Katalog Live', icon: 'public' },
]

const pageTitles: Record<string, string> = {
  '/admin': 'Dashboard Analytics & Koleksi',
  '/admin/upload': 'Upload Template Baru',
  '/admin/faqs': 'Kelola Pertanyaan Umum (FAQ)',
}

const pageTitle = computed(() => pageTitles[route.path] || 'Admin Panel')

const showLogoutModal = ref(false)
const isLoggingOut = ref(false)

const logout = () => {
  showLogoutModal.value = true
}

const confirmLogout = async () => {
  isLoggingOut.value = true
  try {
    authStore.logout()
    await router.push('/admin/login')
  } finally {
    isLoggingOut.value = false
    showLogoutModal.value = false
  }
}
</script>

<style>
/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.4);
}

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
