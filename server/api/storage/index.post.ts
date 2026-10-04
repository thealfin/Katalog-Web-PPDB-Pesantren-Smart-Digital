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

  const formData = await readMultipartFormData(event)
  if (!formData || formData.length === 0) {
    throw createError({ statusCode: 400, message: 'Tidak ada file atau form-data yang dikirim' })
  }

  const pathField = formData.find((f) => f.name === 'path' || f.name === 'pathname')
  const fileField = formData.find((f) => f.name === 'file' || (f.filename && f.data))

  if (!fileField || !fileField.data) {
    throw createError({ statusCode: 400, message: 'Field file wajib disertakan' })
  }

  const filename = fileField.filename || 'uploaded-file'
  const customPath = pathField?.data?.toString() || ''
  const destinationPath = customPath ? `${customPath.replace(/^\/+|\/+$/g, '')}/${filename}` : filename

  try {
    const blob = await uploadBlob(destinationPath, fileField.data, {
      contentType: fileField.type || 'application/octet-stream',
      access: 'public',
      allowOverwrite: true,
    })

    return {
      success: true,
      method: 'POST_UPLOAD',
      file: {
        url: blob.url,
        pathname: blob.pathname,
        contentType: blob.contentType,
        size: fileField.data.length,
      },
    }
  } catch (err: any) {
    throw createError({
      statusCode: err.statusCode || 500,
      message: `Gagal upload ke Vercel Blob: ${err.message}`,
    })
  }
})
