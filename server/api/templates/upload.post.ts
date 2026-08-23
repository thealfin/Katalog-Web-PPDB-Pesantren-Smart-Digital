import { put } from '@vercel/blob'
import { writeFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { existsSync } from 'node:fs'

export default defineEventHandler(async (event) => {
  // 1. Cek Auth
  const authHeader = getRequestHeader(event, 'x-admin-auth')
  if (!authHeader || authHeader !== 'true') {
    throw createError({ statusCode: 401, message: 'Tidak terautentikasi' })
  }

  const formData = await readMultipartFormData(event)
  if (!formData) throw createError({ statusCode: 400, message: 'Form data kosong' })

  // Helper untuk ambil field
  const getField = (name: string) => formData.find((f) => f.name === name)?.data?.toString()

  const name = getField('name')
  const slug = getField('slug')
  const description = getField('description')
  const theme = getField('theme')
  const colorScheme = getField('colorScheme')
  const colorPrimary = getField('colorPrimary') || '#166534'
  const style = getField('style')
  const features = getField('features')?.split(',').map((f) => f.trim()) || []
  const tags = getField('tags')?.split(',').map((t) => t.trim()) || []

  const zipFile = formData.find((f) => f.name === 'zipFile')
  const previewImage = formData.find((f) => f.name === 'previewImage')
  const zipUrlFromClient = getField('zipUrl')
  const imageUrlFromClient = getField('previewImageUrl')

  if (!name || !slug || (!zipFile && !zipUrlFromClient)) {
    throw createError({ statusCode: 400, message: 'Nama, Slug, dan File ZIP wajib diisi' })
  }

  const isProd = process.env.NODE_ENV === 'production'
  let zipUrl = zipUrlFromClient || ''
  let imageUrl = imageUrlFromClient || ''

  // --- 2. PENYIMPANAN FILE ---
  if (isProd) {
    // A. PRODUCTION: Pakai Vercel Blob
    // File sudah diupload langsung dari browser (client-side upload) untuk
    // menghindari limit 4.5MB request body Vercel Function. Di sini hanya
    // butuh URL-nya. Tetap dukung upload lewat server untuk kompatibilitas.
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
    // B. LOKAL: Pakai File System
    const templateDir = join(process.cwd(), 'public', 'templates', slug)
    if (!existsSync(templateDir)) await mkdir(templateDir, { recursive: true })

    const zipPath = join(templateDir, 'source.zip')
    await writeFile(zipPath, zipFile.data)
    zipUrl = `/templates/${slug}/source.zip`

    if (previewImage) {
      const imgPath = join(templateDir, 'preview.png')
      await writeFile(imgPath, previewImage.data)
      imageUrl = `/templates/${slug}/preview.png`
    }
  }

  // --- 3. PENYIMPANAN DATA (METADATA) ---
  const newTemplate = {
    id: Date.now(),
    name,
    slug,
    description,
    theme,
    colorPrimary,
    colorScheme,
    style,
    features,
    tags,
    zipUrl,
    previewImage: imageUrl,
    createdAt: new Date().toISOString().split('T')[0],
    isNew: true,
    isFeatured: false,
  }

  let currentTemplates: any[] = await readTemplates()
  // Filter if already exists (slug unique)
  currentTemplates = currentTemplates.filter((t) => t.slug !== slug)
  currentTemplates.unshift(newTemplate)
  await writeTemplates(currentTemplates)

  return { success: true, template: newTemplate }
})
