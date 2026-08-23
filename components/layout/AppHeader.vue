<template>
  <header
    class="sticky top-0 z-50 bg-brand-cream/90 backdrop-blur-md border-b border-brand-green/10 transition-all duration-300"
    :class="{ 'shadow-md shadow-brand-green/5': isScrolled }"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <div
            class="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-green to-brand-green-light flex items-center justify-center shadow-lg shadow-brand-green/20 group-hover:shadow-brand-green/40 transition-all duration-300 group-hover:scale-105"
          >
            <span class="text-white text-xl">🕌</span>
          </div>
          <div class="hidden sm:block">
            <p class="font-display font-bold text-brand-green leading-tight text-sm">PSD Web PPDB Katalog</p>
            <p class="text-xs text-gray-500 font-body">Solusi Digital untuk Pesantren Modern</p>
          </div>
        </NuxtLink>

        <!-- Center: Search (desktop) -->
        <div class="hidden md:flex flex-1 max-w-sm mx-8">
          <SearchInput v-model="searchQuery" placeholder="Cari template..." @search="handleSearch" />
        </div>

        <!-- Right: Actions -->
        <div class="flex items-center gap-3">
          <!-- Template count badge -->
          <div class="hidden sm:flex items-center gap-2 text-sm text-gray-500">
            <span class="w-2 h-2 rounded-full bg-brand-green-light animate-pulse"></span>
            <span>{{ totalCount }} Template</span>
          </div>

          <!-- Admin button -->
          <template v-if="authStore.isAdmin">
            <NuxtLink to="/admin" class="btn-primary text-xs px-4 py-2">
              <Icon name="heroicons:squares-2x2" class="text-sm" />
              Dashboard
            </NuxtLink>
          </template>
          <template v-else>
            <NuxtLink
              to="/admin/login"
              class="flex items-center gap-1.5 text-sm text-gray-600 hover:text-brand-green transition-colors font-medium"
            >
              <Icon name="heroicons:lock-closed" class="text-sm" />
              Admin
            </NuxtLink>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useTemplatesStore } from '~/stores/templates'

const authStore = useAuthStore()
const templatesStore = useTemplatesStore()
const router = useRouter()

const isScrolled = ref(false)
const searchQuery = ref('')

const totalCount = computed(() => templatesStore.totalTemplates)

onMounted(() => {
  authStore.init()
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 10
  })
})

const handleSearch = (q: string) => {
  templatesStore.setFilter('search', q)
  if (router.currentRoute.value.path !== '/') {
    router.push('/')
  }
}

watch(searchQuery, (val) => {
  templatesStore.setFilter('search', val)
})
</script>
