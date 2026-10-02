import { kv } from '@vercel/kv'
import { get, put } from '@vercel/blob'
import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { existsSync } from 'node:fs'
import templatesLocal from '~/data/templates.json'

const BLOB_KEY = 'templates.json'
const kvConfigured = () => !!process.env.KV_REST_API_URL

function mergeWithLocal(savedList: any[]): any[] {
  if (!Array.isArray(savedList)) return templatesLocal
  const savedSlugs = new Set(savedList.map((t: any) => t.slug))
  const missing = (templatesLocal as any[]).filter((t: any) => !savedSlugs.has(t.slug))
  return [...savedList, ...missing]
}

export async function readTemplates(): Promise<any[]> {
  if (process.env.NODE_ENV === 'production') {
    // 1. Prefer Vercel KV kalau dikonfigurasi
    if (kvConfigured()) {
      try {
        const kvData = await kv.get('templates')
        if (kvData && Array.isArray(kvData) && kvData.length > 0) {
          return mergeWithLocal(kvData)
        }
      } catch (e) {
        console.error('Vercel KV Error (read):', e)
      }
    }

    // 2. Baca dari Vercel Blob (public access)
    try {
      const blob = await get(BLOB_KEY, { access: 'public', useCache: false })
      if (blob && blob.stream) {
        const text = await new Response(blob.stream).text()
        const data = JSON.parse(text)
        if (Array.isArray(data) && data.length > 0) {
          return mergeWithLocal(data)
        }
      }
    } catch (e) {
      console.error('Vercel Blob Error (read):', e)
    }

    // 3. Fallback ke data templates.json lokal bawaan
    return templatesLocal
  }

  // LOKAL: baca file data/templates.json
  const dbPath = join(process.cwd(), 'data', 'templates.json')
  try {
    if (existsSync(dbPath)) {
      return JSON.parse(await readFile(dbPath, 'utf-8'))
    }
  } catch (e) {
    console.error('Local read error:', e)
  }
  return templatesLocal
}

export async function writeTemplates(list: any[]) {
  if (process.env.NODE_ENV === 'production') {
    // 1. Simpan ke Vercel KV jika ada
    if (kvConfigured()) {
      try {
        await kv.set('templates', list)
      } catch (e) {
        console.error('Vercel KV Error (write):', e)
      }
    }

    // 2. Simpan ke Vercel Blob dengan public access
    try {
      await put(BLOB_KEY, JSON.stringify(list, null, 2), {
        access: 'public',
        contentType: 'application/json',
        addRandomSuffix: false,
        allowOverwrite: true,
      })
      return
    } catch (e: any) {
      console.error('Vercel Blob Error (write):', e)
      throw createError({
        statusCode: 500,
        message: `Gagal menyimpan metadata ke Vercel Blob: ${e?.message || e}`,
      })
    }
  }

  // LOKAL: tulis ke data/templates.json
  const dbPath = join(process.cwd(), 'data', 'templates.json')
  await writeFile(dbPath, JSON.stringify(list, null, 2))
}

