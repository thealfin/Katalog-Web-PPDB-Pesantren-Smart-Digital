<template>
  <div class="min-h-screen bg-gradient-to-br from-[#0a1a0a] via-[#0f1f0f] to-[#0a1a0f] flex items-center justify-center px-4">
    <!-- Background glow -->
    <div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-green/10 rounded-full filter blur-3xl pointer-events-none"></div>

    <div class="relative w-full max-w-md">
      <!-- Card -->
      <div class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
        <!-- Logo -->
        <div class="text-center mb-8">
          <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-brand-green to-brand-green-light flex items-center justify-center shadow-xl shadow-brand-green/30">
            <span class="text-3xl">🕌</span>
          </div>
          <h1 class="font-display text-2xl font-bold text-white">Admin Login</h1>
          <p class="text-gray-400 text-sm mt-1">PSD Web PPDB Katalog</p>
        </div>

        <!-- Alert -->
        <Transition name="fade">
          <div
            v-if="errorMessage"
            class="mb-5 flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3"
          >
            <Icon name="heroicons:exclamation-circle" class="text-red-400 text-lg shrink-0" />
            <p class="text-red-300 text-sm">{{ errorMessage }}</p>
          </div>
        </Transition>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label for="username" class="block text-gray-300 text-sm font-medium mb-2">Username</label>
            <div class="relative">
              <Icon name="heroicons:user" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
              <input
                id="username"
                v-model="form.username"
                type="text"
                placeholder="psdadmin"
                autocomplete="username"
                required
                class="w-full pl-9 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 text-sm
                  focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-gray-300 text-sm font-medium mb-2">Password</label>
            <div class="relative">
              <Icon name="heroicons:lock-closed" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                autocomplete="current-password"
                required
                class="w-full pl-9 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 text-sm
                  focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all"
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                @click="showPassword = !showPassword"
              >
                <Icon :name="showPassword ? 'heroicons:eye-slash' : 'heroicons:eye'" class="text-sm" />
              </button>
            </div>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full py-3 bg-gradient-to-r from-brand-green to-brand-green-light text-white rounded-xl font-semibold text-sm
              hover:shadow-lg hover:shadow-brand-green/30 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed
              flex items-center justify-center gap-2 mt-2"
          >
            <Icon v-if="loading" name="heroicons:arrow-path" class="animate-spin text-sm" />
            <span>{{ loading ? 'Masuk...' : 'Masuk' }}</span>
          </button>
        </form>

        <!-- Back link -->
        <div class="mt-6 text-center">
          <NuxtLink to="/" class="text-gray-500 hover:text-gray-300 transition-colors text-sm flex items-center justify-center gap-1">
            <Icon name="heroicons:arrow-left" class="text-xs" />
            Kembali ke Katalog
          </NuxtLink>
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
