import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    username: '',
    token: '',
    _loginAttempts: 0,
    _lockUntil: 0,
  }),

  getters: {
    isAdmin: (state) => state.isAuthenticated,
    isLocked: (state) => Date.now() < state._lockUntil,
    remainingLockTime: (state) => Math.ceil((state._lockUntil - Date.now()) / 1000),
    authHeaders: (state) => {
      const headers: Record<string, string> = {
        'x-admin-auth': 'true', // Fallback compatibility
      }
      if (state.token) {
        headers['Authorization'] = `Bearer ${state.token}`
      }
      return headers
    },
  },

  actions: {
    init() {
      if (process.client) {
        const stored = localStorage.getItem('psd_auth')
        if (stored) {
          try {
            const data = JSON.parse(stored)
            this.isAuthenticated = data.isAuthenticated || false
            this.username = data.username || ''
            this.token = data.token || ''
          } catch {
            this.isAuthenticated = false
            this.token = ''
          }
        }
      }
    },

    async login(username: string, password: string): Promise<{ success: boolean; message: string }> {
      // Rate limiting lokal
      if (this.isLocked) {
        return {
          success: false,
          message: `Terlalu banyak percobaan. Coba lagi dalam ${this.remainingLockTime} detik.`,
        }
      }

      try {
        const response: any = await $fetch('/api/auth/login', {
          method: 'POST',
          body: { username, password },
        })

        if (response.success) {
          this.isAuthenticated = true
          this.username = response.user?.username || username
          this.token = response.token || ''
          this._loginAttempts = 0
          this._lockUntil = 0

          if (process.client) {
            localStorage.setItem(
              'psd_auth',
              JSON.stringify({
                isAuthenticated: true,
                username: this.username,
                token: this.token,
              })
            )
          }

          return { success: true, message: 'Login berhasil!' }
        }

        return { success: false, message: 'Username atau password salah.' }
      } catch (error: any) {
        this._loginAttempts++

        if (this._loginAttempts >= 5) {
          this._lockUntil = Date.now() + 30000 // lock 30 seconds
          this._loginAttempts = 0
          return {
            success: false,
            message: 'Terlalu banyak percobaan. Akun dikunci 30 detik.',
          }
        }

        return {
          success: false,
          message: error?.data?.message || 'Username atau password salah.',
        }
      }
    },

    async logout() {
      try {
        await $fetch('/api/auth/logout', { method: 'POST' })
      } catch {
        // Abaikan jika offline
      }
      this.isAuthenticated = false
      this.username = ''
      this.token = ''
      if (process.client) {
        localStorage.removeItem('psd_auth')
      }
    },
  },
})
