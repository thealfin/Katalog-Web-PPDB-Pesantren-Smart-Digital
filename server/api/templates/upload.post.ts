import { put } from '@vercel/blob'
import { writeFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { existsSync } from 'node:fs'
import AdmZip from 'adm-zip'

export default defineEventHandler(async (event) => {
  // 1. Cek Auth
  const authHeader = getRequestHeader(event, 'x-admin-auth')
  if (!authHeader || authHeader !== 'true') {
    throw createError({ statusCode: 401, message: 'Tidak terautentikasi' })
  }

  const contentType = getRequestHeader(event, 'content-type') || ''
  const isProd = process.env.NODE_ENV === 'production'

  let name = ''
  let slug = ''
  let description = ''
  let theme = ''
  let colorScheme = ''
  let colorPrimary = '#0A5C4F'
  let style = ''
  let features: string[] = []
  let tags: string[] = []
  let zipUrl = ''
  let imageUrl = ''

  let zipFile: { filename?: string; data: Buffer } | undefined
  let previewImage: { filename?: string; data: Buffer } | undefined

  if (contentType.includes('application/json')) {
    // A. Payload JSON (misal saat client-side Vercel Blob upload sudah selesai)
    const body = await readBody(event)
    name = body.name
    slug = body.slug
    description = body.description
    theme = body.theme
    colorScheme = body.colorScheme
    colorPrimary = body.colorPrimary || '#0A5C4F'
    style = body.style
    features = Array.isArray(body.features)
      ? body.features
      : (body.features || '').split(',').map((f: string) => f.trim()).filter(Boolean)
    tags = Array.isArray(body.tags)
      ? body.tags
      : (body.tags || '').split(',').map((t: string) => t.trim()).filter(Boolean)
    zipUrl = body.zipUrl || ''
    imageUrl = body.previewImageUrl || body.previewImage || ''
  } else {
    // B. Payload Multipart FormData
    const formData = await readMultipartFormData(event)
    if (!formData) throw createError({ statusCode: 400, message: 'Form data kosong' })

    const getField = (fieldName: string) => formData.find((f) => f.name === fieldName)?.data?.toString()

    name = getField('name') || ''
    slug = getField('slug') || ''
    description = getField('description') || ''
    theme = getField('theme') || ''
    colorScheme = getField('colorScheme') || ''
    colorPrimary = getField('colorPrimary') || '#0A5C4F'
    style = getField('style') || ''
    features = (getField('features') || '').split(',').map((f) => f.trim()).filter(Boolean)
    tags = (getField('tags') || '').split(',').map((t) => t.trim()).filter(Boolean)

    const rawZip = formData.find((f) => f.name === 'zipFile')
    if (rawZip && rawZip.data && rawZip.data.length > 0) {
      zipFile = { filename: rawZip.filename, data: rawZip.data }
    }

    const rawImg = formData.find((f) => f.name === 'previewImage')
    if (rawImg && rawImg.data && rawImg.data.length > 0) {
      previewImage = { filename: rawImg.filename, data: rawImg.data }
    }

    zipUrl = getField('zipUrl') || ''
    imageUrl = getField('previewImageUrl') || ''
  }

  if (!name || !slug || (!zipFile && !zipUrl)) {
    throw createError({ statusCode: 400, message: 'Nama, Slug, dan File ZIP wajib diisi' })
  }

  // --- 2. PENYIMPANAN FILE ---
  if (isProd) {
    // PRODUCTION: Gunakan Vercel Blob (access: public)
    if (zipFile) {
      const zipBlob = await put(`templates/${slug}/${zipFile.filename || 'source.zip'}`, zipFile.data, {
        access: 'public',
        contentType: 'application/zip',
      })
      zipUrl = zipBlob.url
    }

    if (previewImage) {
      const imgBlob = await put(`templates/${slug}/${previewImage.filename || 'preview.png'}`, previewImage.data, {
        access: 'public',
      })
      imageUrl = imgBlob.url
    }
  } else {
    // LOKAL: Gunakan File System & Ekstrak ZIP agar preview lokal langsung aktif
    const templateDir = join(process.cwd(), 'public', 'templates', slug)
    if (!existsSync(templateDir)) await mkdir(templateDir, { recursive: true })

    if (zipFile) {
      const zipPath = join(templateDir, 'source.zip')
      await writeFile(zipPath, zipFile.data)
      zipUrl = `/templates/${slug}/source.zip`

      // Ekstrak isi ZIP untuk live preview lokal
      try {
        const zip = new AdmZip(zipFile.data)
        zip.extractAllTo(templateDir, true)
      } catch (e) {
        console.error('Peringatan: Gagal mengekstrak isi ZIP di lokal:', e)
      }
    }

    if (previewImage) {
      const imgPath = join(templateDir, 'preview.png')
      await writeFile(imgPath, previewImage.data)
      imageUrl = `/templates/${slug}/preview.png`
    }
  }

  // --- 3. PENYIMPANAN DATA (METADATA) ---
  const newTemplate = {
    id: `template-${Date.now()}`,
    slug,
    name,
    description,
    theme,
    colorPrimary,
    colorScheme,
    style,
    pages: 1,
    features,
    tags,
    previewUrl: `/api/templates/preview/${slug}/index.html`,
    previewImage: imageUrl || `/templates/${slug}/preview.png`,
    zipPath: zipUrl,
    zipUrl: zipUrl,
    createdAt: new Date().toISOString().split('T')[0],
    isNew: true,
    isFeatured: false,
    updatedAt: new Date().toISOString().split('T')[0],
  }

  let currentTemplates: any[] = await readTemplates()
  // Filter slug yang sama (slug unik)
  currentTemplates = currentTemplates.filter((t) => t.slug !== slug)
  currentTemplates.unshift(newTemplate)
  await writeTemplates(currentTemplates)

  return { success: true, template: newTemplate }
})
