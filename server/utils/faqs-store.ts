import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { existsSync } from 'node:fs'
import faqsLocal from '~/data/faqs.json'
import { getDb, ensureTables, mapRowToFaq } from './db'

export interface FaqItem {
  id: number
  question: string
  answer: string
  orderIndex: number
  isPublished: boolean
  createdAt?: string
  updatedAt?: string
}

/**
 * Membaca daftar FAQ dari Neon DB (dengan fallback ke data/faqs.json)
 */
export async function readFaqs(includeDrafts = false): Promise<FaqItem[]> {
  try {
    await ensureTables()
    const sql = getDb()

    if (sql) {
      let rows: any[] = []
      if (includeDrafts) {
        rows = await sql`
          SELECT * FROM faqs
          ORDER BY order_index ASC, id ASC
        `
      } else {
        rows = await sql`
          SELECT * FROM faqs
          WHERE is_published = true
          ORDER BY order_index ASC, id ASC
        `
      }

      if (rows && rows.length > 0) {
        return rows.map(mapRowToFaq) as FaqItem[]
      }

      // Jika tabel di Neon kosong, seed dari faqs.json lokal
      if (Array.isArray(faqsLocal) && faqsLocal.length > 0) {
        console.log('[DB] Seeding FAQs ke Neon DB...')
        for (const f of faqsLocal as any[]) {
          await sql`
            INSERT INTO faqs (question, answer, order_index, is_published)
            VALUES (${f.question}, ${f.answer}, ${f.orderIndex ?? 0}, ${f.isPublished ?? true})
          `
        }
        const seeded = await sql`SELECT * FROM faqs ORDER BY order_index ASC, id ASC`
        return seeded.map(mapRowToFaq) as FaqItem[]
      }
    }
  } catch (err) {
    console.error('[DB] Gagal membaca FAQs dari Neon DB:', err)
  }

  // Fallback ke data/faqs.json
  const dbPath = join(process.cwd(), 'data', 'faqs.json')
  try {
    if (existsSync(dbPath)) {
      const parsed: FaqItem[] = JSON.parse(await readFile(dbPath, 'utf-8'))
      if (!includeDrafts) {
        return parsed.filter((f) => f.isPublished !== false)
      }
      return parsed
    }
  } catch (e) {
    console.error('Local fallback read error for faqs:', e)
  }

  return includeDrafts ? (faqsLocal as FaqItem[]) : (faqsLocal as FaqItem[]).filter((f) => f.isPublished !== false)
}

/**
 * Menyinkronkan seluruh daftar FAQ ke file lokal data/faqs.json (sebagai backup)
 */
async function syncLocalBackup() {
  try {
    const sql = getDb()
    if (!sql) return
    const rows = await sql`SELECT * FROM faqs ORDER BY order_index ASC, id ASC`
    const items = rows.map(mapRowToFaq)
    const dbPath = join(process.cwd(), 'data', 'faqs.json')
    await writeFile(dbPath, JSON.stringify(items, null, 2))
  } catch {
    // Non-fatal
  }
}

/**
 * Menambahkan FAQ baru ke Neon DB
 */
export async function createFaq(data: {
  question: string
  answer: string
  orderIndex?: number
  isPublished?: boolean
}): Promise<FaqItem> {
  await ensureTables()
  const sql = getDb()
  if (!sql) {
    throw createError({ statusCode: 500, message: 'Database tidak terhubung' })
  }

  let nextOrder = data.orderIndex
  if (nextOrder === undefined || nextOrder === null) {
    const maxOrderRes = await sql`SELECT COALESCE(MAX(order_index), -1) as max_order FROM faqs`
    nextOrder = (maxOrderRes[0]?.max_order ?? -1) + 1
  }

  const isPublished = data.isPublished !== false

  const rows = await sql`
    INSERT INTO faqs (question, answer, order_index, is_published)
    VALUES (${data.question}, ${data.answer}, ${nextOrder}, ${isPublished})
    RETURNING *;
  `

  await syncLocalBackup()
  return mapRowToFaq(rows[0]) as FaqItem
}

/**
 * Memperbarui FAQ yang ada di Neon DB
 */
export async function updateFaq(
  id: number,
  data: {
    question?: string
    answer?: string
    orderIndex?: number
    isPublished?: boolean
  }
): Promise<FaqItem> {
  await ensureTables()
  const sql = getDb()
  if (!sql) {
    throw createError({ statusCode: 500, message: 'Database tidak terhubung' })
  }

  const existing = await sql`SELECT * FROM faqs WHERE id = ${id} LIMIT 1`
  if (existing.length === 0) {
    throw createError({ statusCode: 404, message: 'FAQ tidak ditemukan' })
  }

  const current = existing[0]
  const question = data.question ?? current.question
  const answer = data.answer ?? current.answer
  const orderIndex = data.orderIndex ?? current.order_index
  const isPublished = data.isPublished !== undefined ? data.isPublished : current.is_published

  const rows = await sql`
    UPDATE faqs
    SET question = ${question},
        answer = ${answer},
        order_index = ${orderIndex},
        is_published = ${isPublished},
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
    RETURNING *;
  `

  await syncLocalBackup()
  return mapRowToFaq(rows[0]) as FaqItem
}

/**
 * Menghapus FAQ dari Neon DB
 */
export async function deleteFaq(id: number): Promise<boolean> {
  await ensureTables()
  const sql = getDb()
  if (!sql) {
    throw createError({ statusCode: 500, message: 'Database tidak terhubung' })
  }

  await sql`DELETE FROM faqs WHERE id = ${id}`
  await syncLocalBackup()
  return true
}

/**
 * Mengatur urutan (reorder) FAQ
 */
export async function reorderFaqs(items: { id: number; orderIndex: number }[]): Promise<boolean> {
  await ensureTables()
  const sql = getDb()
  if (!sql) return false

  for (const item of items) {
    await sql`
      UPDATE faqs
      SET order_index = ${item.orderIndex},
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${item.id}
    `
  }

  await syncLocalBackup()
  return true
}
