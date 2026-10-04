import { requireAdminAuth } from '~/server/utils/db'
import { deleteTemplate, getTemplateBySlug } from '~/server/utils/templates-store'
import { deleteBlobs } from '~/server/utils/blob-storage'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)

  const slug = getRouterParam(event, 'slug')
  if (!slug) throw createError({ statusCode: 400, message: 'Slug tidak valid' })

  const existing = await getTemplateBySlug(slug)
  if (!existing) throw createError({ statusCode: 404, message: 'Template tidak ditemukan' })

  // 1. Bersihkan file fisik di Vercel Blob jika menggunakan Cloud Storage
  const urlsToDelete = [existing.zipUrl, existing.zipPath, existing.previewImage].filter(
    (u) => typeof u === 'string' && u.includes('vercel-storage.com')
  )

  if (urlsToDelete.length > 0) {
    try {
      await deleteBlobs(urlsToDelete)
    } catch (blobErr) {
      console.error('[STORAGE] Gagal menghapus file dari Vercel Blob:', blobErr)
    }
  }

  // 2. Hapus data metadata template dari database Neon
  await deleteTemplate(slug)

  return { success: true, message: `Template "${slug}" berhasil dihapus dari database dan storage.` }
})
