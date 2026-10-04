import { requireAdminAuth } from '~/server/utils/db'
import { isBlobConfigured, deleteBlobs } from '~/server/utils/blob-storage'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)

  if (!isBlobConfigured()) {
    throw createError({
      statusCode: 503,
      message: 'Vercel Blob belum dikonfigurasi. Tambahkan BLOB_READ_WRITE_TOKEN di file .env.',
    })
  }

  const query = getQuery(event)
  let urlsToDelete: string[] = []

  if (query.url && typeof query.url === 'string') {
    urlsToDelete.push(query.url)
  }

  try {
    const body = await readBody(event)
    if (body) {
      if (typeof body.url === 'string') urlsToDelete.push(body.url)
      if (Array.isArray(body.urls)) urlsToDelete.push(...body.urls)
    }
  } catch {
    // Body kosong tidak masalah jika ada di query
  }

  urlsToDelete = Array.from(new Set(urlsToDelete.filter(Boolean)))

  if (urlsToDelete.length === 0) {
    throw createError({
      statusCode: 400,
      message: 'URL file yang ingin dihapus wajib disertakan di parameter query ?url= atau JSON body { urls: [...] }',
    })
  }

  try {
    const result = await deleteBlobs(urlsToDelete)
    return {
      success: true,
      method: 'DELETE',
      message: `${result.count || urlsToDelete.length} file berhasil dihapus dari Vercel Blob`,
      deleted: result.deleted || urlsToDelete,
    }
  } catch (err: any) {
    throw createError({
      statusCode: err.statusCode || 500,
      message: `Gagal menghapus file dari Vercel Blob: ${err.message}`,
    })
  }
})
