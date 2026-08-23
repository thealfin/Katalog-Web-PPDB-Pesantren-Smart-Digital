import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    username: '',
    _loginAttempts: 0,
    _lockUntil: 0,
  }),

  getters: {
    isAdmin: (state) => state.isAuthenticated,
    isLocked: (state) => Date.now() < state._lockUntil,
    remainingLockTime: (state) => Math.ceil((state._lockUntil - Date.now()) / 1000),
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
          } catch {
            this.isAuthenticated = false
          }
        }
      }
    },

    async login(username: string, password: string): Promise<{ success: boolean; message: string }> {
      // Rate limiting
      if (this.isLocked) {
        return {
          success: false,
          message: `Terlalu banyak percobaan. Coba lagi dalam ${this.remainingLockTime} detik.`,
        }
      }

      try {
        const response = await $fetch('/api/auth/login', {
          method: 'POST',
          body: { username, password },
        })

        if (response.success) {
          this.isAuthenticated = true
          this.username = username
          this._loginAttempts = 0
          this._lockUntil = 0

          if (process.client) {
            localStorage.setItem('psd_auth', JSON.stringify({
              isAuthenticated: true,
              username,
            }))
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

    logout() {
      this.isAuthenticated = false
      this.username = ''
      if (process.client) {
        localStorage.removeItem('psd_auth')
      }
    },
  },
})
