import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { existsSync } from 'node:fs'
import templatesLocal from '~/data/templates.json'
import { getDb, ensureTables, mapRowToTemplate } from './db'

/**
 * Membaca semua template dari Neon DB (dengan fallback ke templates.json)
 */
export async function readTemplates(): Promise<any[]> {
  try {
    await ensureTables()
    const sql = getDb()

    if (sql) {
      const rows = await sql`
        SELECT * FROM templates
        ORDER BY created_at DESC, id DESC
      `

      if (rows && rows.length > 0) {
        return rows.map(mapRowToTemplate)
      }

      // Jika tabel kosong di Neon, seed otomatis dari data/templates.json
      if (Array.isArray(templatesLocal) && templatesLocal.length > 0) {
        console.log('[DB] Seeding templates ke Neon DB...')
        for (const t of templatesLocal as any[]) {
          await saveTemplate(t)
        }
        const seededRows = await sql`
          SELECT * FROM templates
          ORDER BY created_at DESC, id DESC
        `
        return seededRows.map(mapRowToTemplate)
      }
    }
  } catch (err) {
    console.error('[DB] Gagal membaca templates dari Neon DB:', err)
  }

  // Fallback lokal jika DB tidak aktif
  const dbPath = join(process.cwd(), 'data', 'templates.json')
  try {
    if (existsSync(dbPath)) {
      return JSON.parse(await readFile(dbPath, 'utf-8'))
    }
  } catch (e) {
    console.error('Local fallback read error:', e)
  }

  return templatesLocal
}

/**
 * Mengambil satu template berdasarkan slug langsung dari database
 */
export async function getTemplateBySlug(slug: string): Promise<any | null> {
  try {
    await ensureTables()
    const sql = getDb()
    if (sql) {
      const rows = await sql`
        SELECT * FROM templates
        WHERE slug = ${slug}
        LIMIT 1
      `
      if (rows && rows.length > 0) {
        return mapRowToTemplate(rows[0])
      }
    }
  } catch (err) {
    console.error(`[DB] Gagal mengambil template slug=${slug}:`, err)
  }

  // Fallback
  const all = await readTemplates()
  return all.find((t) => t.slug === slug) || null
}

/**
 * Menyimpan atau memperbarui template tunggal ke Neon DB
 */
export async function saveTemplate(t: any): Promise<any> {
  const sql = getDb()
  const templateId = t.id || `template-${Date.now()}`
  const now = new Date().toISOString().split('T')[0]

  if (sql) {
    await sql`
      INSERT INTO templates (
        id, slug, name, description, theme, color_primary, color_scheme, style,
        pages, features, tags, preview_url, preview_image, zip_path, zip_url,
        is_new, is_featured, created_at, updated_at
      ) VALUES (
        ${templateId},
        ${t.slug},
        ${t.name},
        ${t.description || ''},
        ${t.theme || ''},
        ${t.colorPrimary || ''},
        ${t.colorScheme || ''},
        ${t.style || ''},
        ${t.pages || 1},
        ${JSON.stringify(t.features || [])}::jsonb,
        ${JSON.stringify(t.tags || [])}::jsonb,
        ${t.previewUrl || ''},
        ${t.previewImage || ''},
        ${t.zipPath || ''},
        ${t.zipUrl || t.zipPath || ''},
        ${!!t.isNew},
        ${!!t.isFeatured},
        ${t.createdAt || now},
        ${t.updatedAt || now}
      )
      ON CONFLICT (slug) DO UPDATE SET
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        theme = EXCLUDED.theme,
        color_primary = EXCLUDED.color_primary,
        color_scheme = EXCLUDED.color_scheme,
        style = EXCLUDED.style,
        pages = EXCLUDED.pages,
        features = EXCLUDED.features,
        tags = EXCLUDED.tags,
        preview_url = EXCLUDED.preview_url,
        preview_image = EXCLUDED.preview_image,
        zip_path = EXCLUDED.zip_path,
        zip_url = EXCLUDED.zip_url,
        is_new = EXCLUDED.is_new,
        is_featured = EXCLUDED.is_featured,
        updated_at = EXCLUDED.updated_at;
    `
  }

  // Simpan juga salinan ke file data/templates.json untuk development lokal
  try {
    const dbPath = join(process.cwd(), 'data', 'templates.json')
    if (existsSync(dbPath)) {
      const raw = await readFile(dbPath, 'utf-8')
      const currentList: any[] = JSON.parse(raw)
      const filtered = currentList.filter((item) => item.slug !== t.slug)
      filtered.unshift({
        ...t,
        id: templateId,
        createdAt: t.createdAt || now,
        updatedAt: t.updatedAt || now,
      })
      await writeFile(dbPath, JSON.stringify(filtered, null, 2))
    }
  } catch (localErr) {
    // Non-fatal pada environment serverless
  }

  return t
}

/**
 * Menghapus template berdasarkan slug dari Neon DB
 */
export async function deleteTemplate(slug: string): Promise<boolean> {
  const sql = getDb()
  if (sql) {
    await sql`DELETE FROM templates WHERE slug = ${slug}`
  }

  // Update file lokal juga
  try {
    const dbPath = join(process.cwd(), 'data', 'templates.json')
    if (existsSync(dbPath)) {
      const raw = await readFile(dbPath, 'utf-8')
      const currentList: any[] = JSON.parse(raw)
      const filtered = currentList.filter((item) => item.slug !== slug)
      await writeFile(dbPath, JSON.stringify(filtered, null, 2))
    }
  } catch (localErr) {
    // Non-fatal
  }

  return true
}

/**
 * Menulis seluruh list templates (backward compatibility)
 */
export async function writeTemplates(list: any[]) {
  const sql = getDb()
  if (sql) {
    for (const t of list) {
      await saveTemplate(t)
    }
  } else {
    const dbPath = join(process.cwd(), 'data', 'templates.json')
    await writeFile(dbPath, JSON.stringify(list, null, 2))
  }
}
