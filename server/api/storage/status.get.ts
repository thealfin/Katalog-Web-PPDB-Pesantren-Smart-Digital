import { isBlobConfigured, listBlobs } from '~/server/utils/blob-storage'

export default defineEventHandler(async () => {
  const configured = isBlobConfigured()

  if (!configured) {
    return {
      success: false,
      configured: false,
      connected: false,
      store: 'store_MzTaOl2Xq7nUywvI',
      message:
        'BLOB_READ_WRITE_TOKEN belum disematkan di file .env lokal atau Vercel Environment Variables. Silakan salin token dari tab Quickstart / .env.local di dashboard Vercel Blob store_MzTaOl2Xq7nUywvI.',
    }
  }

  try {
    const listResult = await listBlobs({ limit: 5 })
    return {
      success: true,
      configured: true,
      connected: true,
      store: 'store_MzTaOl2Xq7nUywvI',
      totalBlobsPreview: listResult.blobs.length,
      hasMore: listResult.hasMore,
      sampleBlobs: listResult.blobs.map((b) => ({
        pathname: b.pathname,
        size: b.size,
        uploadedAt: b.uploadedAt,
        url: b.url,
      })),
      message: 'Koneksi ke Vercel Blob Storage store_MzTaOl2Xq7nUywvI aktif dan berfungsi normal.',
    }
  } catch (err: any) {
    return {
      success: false,
      configured: true,
      connected: false,
      store: 'store_MzTaOl2Xq7nUywvI',
      error: err.message,
      message: `Gagal menghubungi Vercel Blob: ${err.message}`,
    }
  }
})
