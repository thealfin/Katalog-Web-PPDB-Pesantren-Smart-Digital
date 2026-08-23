<template>
  <div class="min-h-screen bg-gray-50 flex font-poppins">
    <!-- Sidebar Admin -->
    <aside class="w-64 bg-psd-green text-white flex-shrink-0 flex flex-col h-screen sticky top-0 overflow-hidden">
      <div class="p-6 border-b border-white/10">
        <NuxtLink to="/admin" class="block text-center">
          <img src="/LOGO PSD OFFICIAL.jpeg" alt="Logo" class="h-12 w-auto mx-auto mb-3 rounded-lg shadow-lg">
          <h2 class="font-bold text-lg uppercase tracking-wider">Admin Panel</h2>
        </NuxtLink>
      </div>
      
      <nav class="flex-1 min-h-0 overflow-y-auto p-4 space-y-1 custom-scrollbar">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
          active-class="sidebar-active !text-white !bg-white/10"
        >
          <Icon :name="item.icon" class="text-xl" />
          <span class="text-sm font-medium">{{ item.label }}</span>
        </NuxtLink>
      </nav>

      <div class="p-6 mt-auto border-t border-white/10 space-y-4">
        <button @click="logout" class="flex items-center text-sm text-red-300 hover:text-red-100 transition w-full group">
          <Icon name="heroicons:arrow-left-on-rectangle" class="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform" />
          Logout
        </button>
        <NuxtLink to="/" class="flex items-center text-sm text-gray-300 hover:text-white transition group">
          <Icon name="heroicons:arrow-uturn-left" class="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform" />
          Kembali ke Web
        </NuxtLink>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-h-screen">
      <!-- Top Bar -->
      <header class="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-10 sticky top-0 z-10">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">{{ pageTitle }}</h1>
          <p class="text-gray-500 text-xs mt-0.5">Pesantren Smart Digital • Katalog Web</p>
        </div>
        
        <div class="flex items-center gap-6">
          <div class="h-10 w-px bg-gray-200"></div>
          <div class="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100 shadow-sm">
            <div class="w-8 h-8 rounded-xl bg-psd-green flex items-center justify-center text-white font-bold text-sm">
              A
            </div>
            <div class="flex flex-col">
              <span class="text-xs font-bold text-gray-800 leading-none">Admin Utama</span>
              <span class="text-[10px] text-psd-green font-medium">Online</span>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 p-10">
        <div class="max-w-6xl mx-auto">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useRoute } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: 'heroicons:squares-2x2' },
  { to: '/admin/upload', label: 'Upload Template', icon: 'heroicons:cloud-arrow-up' },
  { to: '/', label: 'Katalog Live', icon: 'heroicons:globe-alt' },
]

const pageTitles: Record<string, string> = {
  '/admin': 'Dashboard Analytics',
  '/admin/upload': 'Upload Template Baru',
}

const pageTitle = computed(() => pageTitles[route.path] || 'Admin Panel')

const logout = async () => {
  if (confirm('Apakah Anda yakin ingin keluar?')) {
    authStore.logout()
    await router.push('/admin/login')
  }
}
</script>

<style>
.sidebar-active {
  border-left: 4px solid #F4C430;
}

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
</style>
