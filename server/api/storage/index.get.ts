import { isBlobConfigured, listBlobs, getBlobMetadata } from '~/server/utils/blob-storage'

export default defineEventHandler(async (event) => {
  if (!isBlobConfigured()) {
    throw createError({
      statusCode: 503,
      message:
        'Vercel Blob Storage belum dikonfigurasi. Tambahkan BLOB_READ_WRITE_TOKEN di file .env Anda.',
    })
  }

  const query = getQuery(event)

  // 1. Jika query meminta info/metadata dari URL tertentu (HEAD metadata)
  if (query.url && typeof query.url === 'string') {
    try {
      const meta = await getBlobMetadata(query.url)
      return {
        success: true,
        method: 'GET_METADATA',
        metadata: meta,
      }
    } catch (err: any) {
      throw createError({
        statusCode: err.statusCode || 404,
        message: `Gagal mengambil metadata file: ${err.message}`,
      })
    }
  }

  // 2. Default: List blobs (daftar file di storage)
  try {
    const prefix = typeof query.prefix === 'string' ? query.prefix : undefined
    const limit = query.limit ? parseInt(query.limit as string, 10) : 50
    const cursor = typeof query.cursor === 'string' ? query.cursor : undefined

    const result = await listBlobs({ prefix, limit, cursor })

    return {
      success: true,
      method: 'GET_LIST',
      blobs: result.blobs,
      hasMore: result.hasMore,
      cursor: result.cursor,
    }
  } catch (err: any) {
    throw createError({
      statusCode: err.statusCode || 500,
      message: `Gagal memuat daftar file dari Vercel Blob: ${err.message}`,
    })
  }
})
