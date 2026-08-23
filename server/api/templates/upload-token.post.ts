import { handleUpload } from '@vercel/blob/client'

export default defineEventHandler(async (event) => {
  const authHeader = getRequestHeader(event, 'x-admin-auth')
  if (!authHeader || authHeader !== 'true') {
    throw createError({ statusCode: 401, message: 'Tidak terautentikasi' })
  }

  const body = await readBody(event)

  return await handleUpload({
    body,
    request: event.node.req,
    onBeforeGenerateToken: async (pathname, clientPayload) => {
      let meta: Record<string, any> = {}
      try {
        meta = JSON.parse(clientPayload || '{}')
      } catch {
        throw createError({ statusCode: 400, message: 'Payload tidak valid' })
      }

      if (!meta.name || !meta.slug) {
        throw createError({ statusCode: 400, message: 'Nama dan Slug wajib diisi' })
      }

      return {
        allowedContentTypes: [
          'application/zip',
          'application/x-zip-compressed',
          'application/octet-stream',
          'image/png',
          'image/jpeg',
          'image/webp',
        ],
        maximumSizeInBytes: 200 * 1024 * 1024,
        validUntil: Date.now() + 10 * 60 * 1000,
        allowOverwrite: true,
        addRandomSuffix: false,
      }
    },
  })
})
