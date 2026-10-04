import { put, del, list, head, copy } from '@vercel/blob'

/**
 * Mengecek apakah BLOB_READ_WRITE_TOKEN sudah dikonfigurasi
 */
export function isBlobConfigured(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN
}

/**
 * Upload file ke Vercel Blob
 */
export async function uploadBlob(
  pathname: string,
  data: Buffer | string | Blob | ArrayBuffer,
  options: {
    contentType?: string
    access?: 'public'
    allowOverwrite?: boolean
    addRandomSuffix?: boolean
  } = {}
) {
  if (!isBlobConfigured()) {
    throw createError({
      statusCode: 500,
      message:
        'BLOB_READ_WRITE_TOKEN belum dikonfigurasi di environment. Silakan tambahkan token Vercel Blob Anda ke .env.',
    })
  }

  // Normalisasi path agar tidak ada double slash atau awalan slash
  const cleanPath = pathname.replace(/^\/+/, '')

  const blob = await put(cleanPath, data, {
    access: options.access || 'public',
    contentType: options.contentType,
    allowOverwrite: options.allowOverwrite ?? true,
    addRandomSuffix: options.addRandomSuffix ?? false,
  })

  return blob
}

/**
 * Menghapus satu atau banyak blob berdasarkan URL publik atau pathname
 */
export async function deleteBlobs(urls: string | string[]) {
  if (!isBlobConfigured()) return { success: false, message: 'Blob token not configured' }

  const targetUrls = Array.isArray(urls) ? urls : [urls]
  const validBlobUrls = targetUrls.filter(
    (u) => typeof u === 'string' && (u.includes('vercel-storage.com') || u.startsWith('http'))
  )

  if (validBlobUrls.length === 0) {
    return { success: true, count: 0, message: 'Tidak ada URL blob yang valid untuk dihapus' }
  }

  await del(validBlobUrls)
  return { success: true, count: validBlobUrls.length, deleted: validBlobUrls }
}

/**
 * Mendapatkan daftar file yang ada di Vercel Blob Store
 */
export async function listBlobs(options: {
  prefix?: string
  limit?: number
  cursor?: string
} = {}) {
  if (!isBlobConfigured()) {
    throw createError({
      statusCode: 500,
      message: 'BLOB_READ_WRITE_TOKEN belum dikonfigurasi.',
    })
  }

  const result = await list({
    prefix: options.prefix,
    limit: options.limit || 50,
    cursor: options.cursor,
  })

  return result
}

/**
 * Mendapatkan metadata file (size, content-type, uploadedAt) dari Vercel Blob
 */
export async function getBlobMetadata(url: string) {
  if (!isBlobConfigured()) {
    throw createError({ statusCode: 500, message: 'BLOB_READ_WRITE_TOKEN belum dikonfigurasi.' })
  }

  return await head(url)
}

/**
 * Menyalin atau memindahkan file di dalam Vercel Blob
 */
export async function copyBlob(fromUrl: string, toPathname: string) {
  if (!isBlobConfigured()) {
    throw createError({ statusCode: 500, message: 'BLOB_READ_WRITE_TOKEN belum dikonfigurasi.' })
  }

  const cleanPath = toPathname.replace(/^\/+/, '')
  return await copy(fromUrl, cleanPath, { access: 'public' })
}
