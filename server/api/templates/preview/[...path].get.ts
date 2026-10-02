import AdmZip from 'adm-zip'
import { join } from 'node:path'
import { existsSync, readFileSync } from 'node:fs'

// In-memory cache for ZIP buffers to avoid repeated fetches from Blob
const zipCache = new Map<string, { buffer: Buffer; cachedAt: number }>()
const CACHE_TTL_MS = 15 * 60 * 1000 // 15 minutes

const MIME_MAP: Record<string, string> = {
  html: 'text/html; charset=utf-8',
  htm: 'text/html; charset=utf-8',
  css: 'text/css; charset=utf-8',
  js: 'application/javascript; charset=utf-8',
  mjs: 'application/javascript; charset=utf-8',
  json: 'application/json; charset=utf-8',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
  svg: 'image/svg+xml',
  gif: 'image/gif',
  ico: 'image/x-icon',
  woff: 'font/woff',
  woff2: 'font/woff2',
  ttf: 'font/ttf',
  mp4: 'video/mp4',
  mp3: 'audio/mpeg',
  pdf: 'application/pdf',
}

export default defineEventHandler(async (event) => {
  const rawPath = getRouterParam(event, 'path') || ''
  const segments = rawPath.split('/').filter(Boolean)

  if (segments.length === 0) {
    throw createError({ statusCode: 400, message: 'Slug template tidak disertakan' })
  }

  const slug = segments[0]
  let filePath = segments.slice(1).join('/') || 'index.html'

  // Normalisasi & cegah directory traversal
  filePath = filePath.replace(/\\/g, '/').replace(/^(\.\.\/)+/, '').replace(/^\/+/, '')
  if (!filePath || filePath.endsWith('/')) filePath += 'index.html'

  const ext = filePath.split('.').pop()?.toLowerCase() || 'html'
  const mimeType = MIME_MAP[ext] || 'application/octet-stream'

  // 1. Cek file lokal di public/templates/${slug}/${filePath}
  const localTemplateDir = join(process.cwd(), 'public', 'templates', slug)
  const localFilePath = join(localTemplateDir, filePath)
  if (existsSync(localFilePath)) {
    try {
      const data = readFileSync(localFilePath)
      setHeader(event, 'Content-Type', mimeType)
      setHeader(event, 'Cache-Control', 'public, max-age=3600')
      setHeader(event, 'X-Frame-Options', 'SAMEORIGIN')
      return data
    } catch (e) {
      console.error(`Gagal membaca file lokal ${localFilePath}:`, e)
    }
  }

  // 2. Ambil metadata template dari store
  const templates = await readTemplates()
  const template = templates.find((t: any) => t.slug === slug)
  if (!template) {
    throw createError({ statusCode: 404, message: `Template "${slug}" tidak ditemukan` })
  }

  const zipUrl = template.zipUrl || template.zipPath
  if (!zipUrl) {
    throw createError({ statusCode: 404, message: 'Source ZIP template tidak ditemukan' })
  }

  // 3. Ambil buffer file ZIP (dari cache memori atau download dari URL)
  let zipBuffer: Buffer | null = null
  const cached = zipCache.get(slug)
  if (cached && Date.now() - cached.cachedAt < CACHE_TTL_MS) {
    zipBuffer = cached.buffer
  } else {
    if (zipUrl.startsWith('http://') || zipUrl.startsWith('https://')) {
      const res = await fetch(zipUrl)
      if (!res.ok) {
        throw createError({
          statusCode: 502,
          message: `Gagal mengunduh file template ZIP dari storage (${res.status} ${res.statusText})`,
        })
      }
      const arrayBuffer = await res.arrayBuffer()
      zipBuffer = Buffer.from(arrayBuffer)
    } else {
      // Path lokal relatif (misal: /templates/slug/source.zip)
      const localZipPath = join(process.cwd(), 'public', zipUrl.replace(/^\//, ''))
      if (existsSync(localZipPath)) {
        zipBuffer = readFileSync(localZipPath)
      }
    }

    if (zipBuffer) {
      zipCache.set(slug, { buffer: zipBuffer, cachedAt: Date.now() })
    }
  }

  if (!zipBuffer) {
    throw createError({ statusCode: 404, message: 'File ZIP template tidak dapat diakses' })
  }

  // 4. Ekstrak file yang diminta dari dalam ZIP menggunakan AdmZip
  try {
    const zip = new AdmZip(zipBuffer)
    const entries = zip.getEntries()

    // Cari entry yang cocok dengan filePath
    let targetEntry = zip.getEntry(filePath)

    if (!targetEntry) {
      // Cari jika zip memiliki root folder pembungkus (misal my-template/index.html)
      targetEntry = entries.find(
        (e) =>
          !e.isDirectory &&
          (e.entryName === filePath ||
            e.entryName.endsWith('/' + filePath) ||
            e.entryName.toLowerCase().endsWith('/' + filePath.toLowerCase())),
      )
    }

    // Jika yang dicari index.html tetapi belum ketemu, coba cari file .html apa saja yang relevan
    if (!targetEntry && (filePath === 'index.html' || filePath.endsWith('/index.html'))) {
      targetEntry = entries.find(
        (e) => !e.isDirectory && (e.entryName.endsWith('index.html') || e.entryName.endsWith('.html')),
      )
    }

    if (!targetEntry) {
      throw createError({
        statusCode: 404,
        message: `File "${filePath}" tidak ditemukan di dalam paket ZIP template`,
      })
    }

    const fileData = targetEntry.getData()

    setHeader(event, 'Content-Type', mimeType)
    setHeader(event, 'Cache-Control', 'public, max-age=3600')
    setHeader(event, 'X-Frame-Options', 'SAMEORIGIN')
    return fileData
  } catch (err: any) {
    if (err.statusCode) throw err
    throw createError({ statusCode: 500, message: `Gagal membaca isi file ZIP: ${err.message}` })
  }
})
