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

  const slug = getRouterParam(event, 'slug')
  if (!slug) throw createError({ statusCode: 400, message: 'Slug tidak ditemukan' })

  const formData = await readMultipartFormData(event)
  if (!formData) throw createError({ statusCode: 400, message: 'Form data kosong' })

  // Helper untuk ambil field
  const getField = (name: string) => formData.find((f) => f.name === name)?.data?.toString()

  const name = getField('name')
  const description = getField('description')
  const theme = getField('theme')
  const colorScheme = getField('colorScheme')
  const colorPrimary = getField('colorPrimary')
  const style = getField('style')
  const features = getField('features')?.split(',').map((f) => f.trim()) || []
  const tags = getField('tags')?.split(',').map((t) => t.trim()) || []

  const isFeatured = getField('isFeatured') === 'true'
  const isNew = getField('isNew') === 'true'

  const zipFile = formData.find((f) => f.name === 'zipFile')
  const previewImage = formData.find((f) => f.name === 'previewImage')
  const zipUrlFromClient = getField('zipUrl')
  const imageUrlFromClient = getField('previewImageUrl')

  const isProd = process.env.NODE_ENV === 'production'

  // --- 2. AMBIL DATA LAMA ---
  const currentTemplates = await readTemplates()

  const index = currentTemplates.findIndex((t) => t.slug === slug)
  if (index === -1) throw createError({ statusCode: 404, message: 'Template tidak ditemukan' })

  const template = { ...currentTemplates[index] }

  // --- 3. UPDATE METADATA ---
  if (name) template.name = name
  if (description) template.description = description
  if (theme) template.theme = theme
  if (colorScheme) template.colorScheme = colorScheme
  if (colorPrimary) template.colorPrimary = colorPrimary
  if (style) template.style = style
  template.features = features
  template.tags = tags
  template.isFeatured = isFeatured
  template.isNew = isNew
  template.updatedAt = new Date().toISOString().split('T')[0]

  // --- 4. UPDATE FILE (OPSIONAL) ---
  if (isProd) {
    // File baru sudah diupload langsung dari browser (client-side upload).
    if (zipUrlFromClient) template.zipUrl = zipUrlFromClient
    if (imageUrlFromClient) template.previewImage = imageUrlFromClient

    if (zipFile && zipFile.data.length > 0) {
      const zipBlob = await put(`templates/${slug}/${zipFile.filename || 'source.zip'}`, zipFile.data, {
        access: 'public',
        contentType: 'application/zip',
      })
      template.zipUrl = zipBlob.url
    }
    if (previewImage && previewImage.data.length > 0) {
      const imgBlob = await put(`templates/${slug}/${previewImage.filename || 'preview.png'}`, previewImage.data, {
        access: 'public',
      })
      template.previewImage = imgBlob.url
    }
  } else {
    const templateDir = join(process.cwd(), 'public', 'templates', slug)
    if (!existsSync(templateDir)) await mkdir(templateDir, { recursive: true })

    if (zipFile && zipFile.data.length > 0) {
      await writeFile(join(templateDir, 'source.zip'), zipFile.data)
      template.zipUrl = `/templates/${slug}/source.zip`
    }
    if (previewImage && previewImage.data.length > 0) {
      await writeFile(join(templateDir, 'preview.png'), previewImage.data)
      template.previewImage = `/templates/${slug}/preview.png`
    }
  }

  // --- 5. SIMPAN ---
  currentTemplates[index] = template
  await writeTemplates(currentTemplates)

  return { success: true, template }
})
