import { getDb, ensureTables, verifyPassword, hashPassword, createSessionToken } from '~/server/utils/db'

// In-memory IP rate limiting
const loginAttempts = new Map<string, { count: number; resetAt: number }>()

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const { username, password } = body

  if (!username || !password) {
    throw createError({
      statusCode: 400,
      message: 'Username dan password wajib diisi',
    })
  }

  // 1. IP-based rate limiting
  const ip =
    getRequestHeader(event, 'x-forwarded-for')?.split(',')[0].trim() ||
    getRequestHeader(event, 'x-real-ip') ||
    '127.0.0.1'

  const attempts = loginAttempts.get(ip) || { count: 0, resetAt: Date.now() + 60000 }

  if (Date.now() > attempts.resetAt) {
    attempts.count = 0
    attempts.resetAt = Date.now() + 60000
  }

  if (attempts.count >= 5) {
    const remainingSecs = Math.ceil((attempts.resetAt - Date.now()) / 1000)
    throw createError({
      statusCode: 429,
      message: `Terlalu banyak percobaan gagal. Silakan tunggu ${remainingSecs} detik.`,
    })
  }

  await ensureTables()
  const sql = getDb()

  let authenticatedUser: { username: string; name: string; role: string } | null = null

  // 2. Query Neon DB dengan Parameterized Query (Anti SQL Injection)
  if (sql) {
    try {
      const rows = await sql`
        SELECT id, username, password_hash, salt, name, role
        FROM admin_users
        WHERE username = ${username}
        LIMIT 1
      `

      if (rows && rows.length > 0) {
        const dbUser = rows[0]
        const isValid = verifyPassword(password, dbUser.password_hash, dbUser.salt)
        if (isValid) {
          authenticatedUser = {
            username: dbUser.username,
            name: dbUser.name || 'Admin',
            role: dbUser.role || 'admin',
          }

          // Update last_login secara asynchronous
          sql`
            UPDATE admin_users
            SET last_login = CURRENT_TIMESTAMP
            WHERE id = ${dbUser.id}
          `.catch((err) => console.error('Failed to update last_login:', err))
        }
      }
    } catch (err) {
      console.error('[AUTH] Database query error:', err)
    }
  }

  // 3. Fallback jika user belum di database tapi cocok dengan environment variable (.env)
  if (!authenticatedUser) {
    const envUser = config.adminUsername || 'psdadmin'
    const envPass = config.adminPassword || 'ppdb2026secure!'

    if (username === envUser && password === envPass) {
      authenticatedUser = {
        username: envUser,
        name: 'Admin Utama PSD',
        role: 'admin',
      }

      // Auto-sinkronisasi ke Neon DB jika ada koneksi
      if (sql) {
        try {
          const { hash, salt } = hashPassword(password)
          await sql`
            INSERT INTO admin_users (username, password_hash, salt, name, role)
            VALUES (${envUser}, ${hash}, ${salt}, ${'Admin Utama PSD'}, ${'admin'})
            ON CONFLICT (username) DO UPDATE SET
              password_hash = EXCLUDED.password_hash,
              salt = EXCLUDED.salt,
              last_login = CURRENT_TIMESTAMP;
          `
        } catch (syncErr) {
          console.error('[AUTH] Failed to auto-sync admin to Neon DB:', syncErr)
        }
      }
    }
  }

  // 4. Hasil Verifikasi
  if (authenticatedUser) {
    // Reset percobaan gagal jika login sukses
    loginAttempts.delete(ip)

    // Buat session token kriptografis HMAC SHA-256
    const token = createSessionToken({
      username: authenticatedUser.username,
      role: authenticatedUser.role,
    })

    // Pasang HTTP-Only Cookie untuk keamanan maksimal
    setCookie(event, 'admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 hari
      path: '/',
    })

    return {
      success: true,
      token,
      user: authenticatedUser,
      message: 'Login berhasil',
    }
  }

  // Increment failed attempts jika salah
  attempts.count++
  loginAttempts.set(ip, attempts)

  throw createError({
    statusCode: 401,
    message: 'Username atau password salah.',
  })
})
