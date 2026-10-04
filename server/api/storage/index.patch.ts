import { requireAdminAuth } from '~/server/utils/db'
import { isBlobConfigured, copyBlob, deleteBlobs } from '~/server/utils/blob-storage'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)

  if (!isBlobConfigured()) {
    throw createError({
      statusCode: 503,
      message: 'Vercel Blob belum dikonfigurasi. Tambahkan BLOB_READ_WRITE_TOKEN di file .env.',
    })
  }

  const body = await readBody(event)
  const { fromUrl, toPathname, keepSource } = body || {}

  if (!fromUrl || !toPathname) {
    throw createError({
      statusCode: 400,
      message: 'Parameter "fromUrl" dan "toPathname" wajib diisi pada body request',
    })
  }

  try {
    // 1. Copy blob ke destination path baru
    const newBlob = await copyBlob(fromUrl, toPathname)

    // 2. Jika tidak meminta keepSource, hapus file lama (efek rename/move)
    if (!keepSource) {
      await deleteBlobs(fromUrl)
    }

    return {
      success: true,
      method: 'PATCH_RENAME_OR_MOVE',
      operation: keepSource ? 'COPIED' : 'MOVED',
      oldUrl: fromUrl,
      newUrl: newBlob.url,
      pathname: newBlob.pathname,
    }
  } catch (err: any) {
    throw createError({
      statusCode: err.statusCode || 500,
      message: `Gagal memodifikasi file di Vercel Blob: ${err.message}`,
    })
  }
})
