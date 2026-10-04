import { neon } from '@neondatabase/serverless'
import crypto from 'node:crypto'
import type { H3Event } from 'h3'
import templatesLocal from '~/data/templates.json'

let _sql: ReturnType<typeof neon> | null = null
let _tablesEnsured = false

/**
 * Mendapatkan instance client Neon SQL (parameterized query tagged template).
 */
export function getDb() {
  if (_sql) return _sql

  const config = useRuntimeConfig()
  const dbUrl =
    config.databaseUrl ||
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    ''

  if (!dbUrl) {
    console.warn('[DB] DATABASE_URL tidak dikonfigurasi. Fallback ke local files.')
    return null
  }

  _sql = neon(dbUrl)
  return _sql
}

/**
 * Password hashing menggunakan scrypt bawaan Node.js (memory-hard & resisten brute-force)
 */
export function hashPassword(password: string): { hash: string; salt: string } {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.scryptSync(password, salt, 64).toString('hex')
  return { hash, salt }
}

export function verifyPassword(password: string, hash: string, salt: string): boolean {
  try {
    const testHash = crypto.scryptSync(password, salt, 64).toString('hex')
    return crypto.timingSafeEqual(Buffer.from(testHash, 'hex'), Buffer.from(hash, 'hex'))
  } catch {
    return false
  }
}

/**
 * Token Session Kriptografis HMAC-SHA256 (Anti pemalsuan token)
 */
export function createSessionToken(payload: { username: string; role?: string; exp?: number }): string {
  const config = useRuntimeConfig()
  const secret = config.sessionSecret || process.env.NUXT_SESSION_SECRET || 'psd-secret-key-2026'
  
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url')
  const body = Buffer.from(
    JSON.stringify({
      username: payload.username,
      role: payload.role || 'admin',
      exp: payload.exp || Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 hari
    })
  ).toString('base64url')

  const signature = crypto
    .createHmac('sha256', secret)
    .update(`${header}.${body}`)
    .digest('base64url')

  return `${header}.${body}.${signature}`
}

export function verifySessionToken(token: string): { username: string; role: string } | null {
  try {
    if (!token || typeof token !== 'string') return null
    const parts = token.split('.')
    if (parts.length !== 3) return null

    const [header, body, signature] = parts
    const config = useRuntimeConfig()
    const secret = config.sessionSecret || process.env.NUXT_SESSION_SECRET || 'psd-secret-key-2026'

    const expectedSig = crypto
      .createHmac('sha256', secret)
      .update(`${header}.${body}`)
      .digest('base64url')

    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) {
      return null
    }

    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf-8'))
    if (payload.exp && Date.now() > payload.exp) {
      return null // Token expired
    }

    return { username: payload.username, role: payload.role }
  } catch {
    return null
  }
}

/**
 * Helper middleware untuk memeriksa otentikasi admin di server endpoint
 */
export function requireAdminAuth(event: H3Event) {
  // 1. Cek Header Authorization: Bearer <token>
  const authHeader = getRequestHeader(event, 'authorization')
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7).trim()
    const user = verifySessionToken(token)
    if (user) return user
  }

  // 2. Cek Cookie admin_token
  const cookieToken = getCookie(event, 'admin_token')
  if (cookieToken) {
    const user = verifySessionToken(cookieToken)
    if (user) return user
  }

  // 3. Fallback backward-compatibility x-admin-auth: true
  const legacyHeader = getRequestHeader(event, 'x-admin-auth')
  if (legacyHeader === 'true') {
    return { username: 'legacy-admin', role: 'admin' }
  }

  throw createError({
    statusCode: 401,
    message: 'Tidak terautentikasi. Silakan login terlebih dahulu.',
  })
}

/**
 * Mapping baris tabel PostgreSQL ke model Template (camelCase)
 */
export function mapRowToTemplate(row: any) {
  if (!row) return null
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description || '',
    theme: row.theme || '',
    colorPrimary: row.color_primary || '',
    colorScheme: row.color_scheme || '',
    style: row.style || '',
    pages: row.pages || 1,
    features: Array.isArray(row.features)
      ? row.features
      : typeof row.features === 'string'
      ? JSON.parse(row.features || '[]')
      : row.features || [],
    tags: Array.isArray(row.tags)
      ? row.tags
      : typeof row.tags === 'string'
      ? JSON.parse(row.tags || '[]')
      : row.tags || [],
    previewUrl: row.preview_url || '',
    previewImage: row.preview_image || '',
    zipPath: row.zip_path || '',
    zipUrl: row.zip_url || row.zip_path || '',
    isNew: Boolean(row.is_new),
    isFeatured: Boolean(row.is_featured),
    createdAt: row.created_at || '',
    updatedAt: row.updated_at || '',
  }
}

/**
 * Mapping baris tabel faqs PostgreSQL ke model FAQ (camelCase)
 */
export function mapRowToFaq(row: any) {
  if (!row) return null
  return {
    id: row.id,
    question: row.question,
    answer: row.answer,
    orderIndex: row.order_index ?? 0,
    isPublished: Boolean(row.is_published),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

/**
 * Memastikan tabel terbuat di Neon PostgreSQL & melakukan initial seed
 */
export async function ensureTables() {
  if (_tablesEnsured) return
  const sql = getDb()
  if (!sql) return

  try {
    // 1. Tabel templates
    await sql`
      CREATE TABLE IF NOT EXISTS templates (
        id VARCHAR(100) PRIMARY KEY,
        slug VARCHAR(150) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        theme VARCHAR(100),
        color_primary VARCHAR(50),
        color_scheme VARCHAR(100),
        style VARCHAR(100),
        pages INTEGER DEFAULT 1,
        features JSONB DEFAULT '[]'::jsonb,
        tags JSONB DEFAULT '[]'::jsonb,
        preview_url TEXT,
        preview_image TEXT,
        zip_path TEXT,
        zip_url TEXT,
        is_new BOOLEAN DEFAULT false,
        is_featured BOOLEAN DEFAULT false,
        created_at VARCHAR(50),
        updated_at VARCHAR(50)
      );
    `

    // 2. Tabel admin_users
    await sql`
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        salt VARCHAR(64) NOT NULL,
        name VARCHAR(100) DEFAULT 'Admin PSD',
        role VARCHAR(50) DEFAULT 'admin',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP WITH TIME ZONE
      );
    `

    // 3. Tabel faqs
    await sql`
      CREATE TABLE IF NOT EXISTS faqs (
        id SERIAL PRIMARY KEY,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        order_index INTEGER DEFAULT 0,
        is_published BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `

    // 4. Seed default admin jika kosong
    const config = useRuntimeConfig()
    const defaultUser = config.adminUsername || 'psdadmin'
    const defaultPass = config.adminPassword || 'ppdb2026secure!'

    const existingAdmin = await sql`SELECT id FROM admin_users WHERE username = ${defaultUser} LIMIT 1`
    if (existingAdmin.length === 0) {
      const { hash, salt } = hashPassword(defaultPass)
      await sql`
        INSERT INTO admin_users (username, password_hash, salt, name, role)
        VALUES (${defaultUser}, ${hash}, ${salt}, ${'Admin Utama PSD'}, ${'admin'})
        ON CONFLICT (username) DO NOTHING;
      `
    }

    _tablesEnsured = true
  } catch (err) {
    console.error('[DB] Gagal inisialisasi tabel di Neon:', err)
  }
}
