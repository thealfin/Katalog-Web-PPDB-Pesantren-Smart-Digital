import { requireAdminAuth } from '~/server/utils/db'
import { isBlobConfigured, uploadBlob } from '~/server/utils/blob-storage'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)

  if (!isBlobConfigured()) {
    throw createError({
      statusCode: 503,
      message: 'Vercel Blob belum dikonfigurasi. Tambahkan BLOB_READ_WRITE_TOKEN di file .env.',
    })
  }

  const query = getQuery(event)
  const pathname = (query.path as string) || (query.pathname as string)

  if (!pathname) {
    throw createError({
      statusCode: 400,
      message: 'Parameter query ?pathname=<nama_path_file> wajib disertakan untuk metode PUT',
    })
  }

  const contentType = getRequestHeader(event, 'content-type') || 'application/octet-stream'
  const rawBody = await readRawBody(event, false)

  if (!rawBody || rawBody.length === 0) {
    throw createError({ statusCode: 400, message: 'Body request kosong' })
  }

  try {
    const blob = await uploadBlob(pathname, rawBody, {
      contentType,
      access: 'public',
      allowOverwrite: true,
    })

    return {
      success: true,
      method: 'PUT_OVERWRITE',
      file: {
        url: blob.url,
        pathname: blob.pathname,
        contentType: blob.contentType,
        size: rawBody.length,
      },
    }
  } catch (err: any) {
    throw createError({
      statusCode: err.statusCode || 500,
      message: `Gagal memperbarui file di Vercel Blob: ${err.message}`,
    })
  }
})
