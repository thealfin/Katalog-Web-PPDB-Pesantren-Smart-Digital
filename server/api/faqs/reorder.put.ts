import { requireAdminAuth } from '~/server/utils/db'
import { reorderFaqs } from '~/server/utils/faqs-store'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)

  const body = await readBody(event)
  const items = Array.isArray(body) ? body : body?.items

  if (!Array.isArray(items) || items.length === 0) {
    throw createError({
      statusCode: 400,
      message: 'Body harus berupa array item { id: number, orderIndex: number }',
    })
  }

  await reorderFaqs(items)

  return { success: true, message: 'Urutan FAQ berhasil disimpan' }
})
