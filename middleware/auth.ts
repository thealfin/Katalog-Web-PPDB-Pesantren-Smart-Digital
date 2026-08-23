import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()

  // Initialize auth from localStorage on client
  if (process.client) {
    authStore.init()
  }

  if (!authStore.isAuthenticated) {
    return navigateTo('/admin/login')
  }
})
