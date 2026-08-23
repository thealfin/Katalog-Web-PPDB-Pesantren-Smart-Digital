import { kv } from '@vercel/kv'
import { get, put } from '@vercel/blob'
import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { existsSync } from 'node:fs'
import templatesLocal from '~/data/templates.json'

const BLOB_KEY = 'templates.json'
const kvConfigured = () => !!process.env.KV_REST_API_URL

export async function readTemplates(): Promise<any[]> {
  if (process.env.NODE_ENV === 'production') {
    // 1. Prefer Vercel KV kalau dikonfigurasi
    if (kvConfigured()) {
      try {
        const kvData = await kv.get('templates')
        if (kvData && Array.isArray(kvData)) return kvData
      } catch (e) {
        console.error('Vercel KV Error (read):', e)
      }
    }
    // 2. Fallback: simpan daftar template sebagai JSON di Vercel Blob
    try {
      const blob = await get(BLOB_KEY, { access: 'private', useCache: false })
      if (blob) {
        const text = await new Response(blob.stream).text()
        const data = JSON.parse(text)
        if (Array.isArray(data)) return data
      }
    } catch (e) {
      console.error('Vercel Blob Error (read):', e)
    }
    // 3. Terakhir: data bawaan
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
    if (kvConfigured()) {
      try {
        await kv.set('templates', list)
        return
      } catch (e) {
        console.error('Vercel KV Error (write):', e)
      }
    }
    await put(BLOB_KEY, JSON.stringify(list), {
      access: 'private',
      contentType: 'application/json',
      addRandomSuffix: false,
      allowOverwrite: true,
    })
    return
  }

  // LOKAL: tulis ke data/templates.json
  const dbPath = join(process.cwd(), 'data', 'templates.json')
  await writeFile(dbPath, JSON.stringify(list, null, 2))
}
