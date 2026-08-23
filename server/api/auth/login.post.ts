import { readFile, writeFile, copyFile, mkdir } from 'node:fs/promises'
import { join, extname } from 'node:path'
import { existsSync } from 'node:fs'

// Rate limiting for login
const loginAttempts = new Map<string, { count: number; resetAt: number }>()

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const { username, password } = body

  // IP-based rate limiting
  const ip = getRequestHeader(event, 'x-forwarded-for') || 'unknown'
  const attempts = loginAttempts.get(ip) || { count: 0, resetAt: Date.now() + 60000 }

  if (Date.now() > attempts.resetAt) {
    attempts.count = 0
    attempts.resetAt = Date.now() + 60000
  }

  if (attempts.count >= 5) {
    const remainingSecs = Math.ceil((attempts.resetAt - Date.now()) / 1000)
    throw createError({
      statusCode: 429,
      message: `Terlalu banyak percobaan. Coba lagi dalam ${remainingSecs} detik.`,
    })
  }

  if (username === config.adminUsername && password === config.adminPassword) {
    // Reset attempts on success
    loginAttempts.delete(ip)
    return { success: true, message: 'Login berhasil' }
  }

  // Increment failed attempts
  attempts.count++
  loginAttempts.set(ip, attempts)

  throw createError({
    statusCode: 401,
    message: 'Username atau password salah.',
  })
})
