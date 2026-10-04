import { requireAdminAuth } from '~/server/utils/db'
import { deleteFaq } from '~/server/utils/faqs-store'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)

  const idParam = getRouterParam(event, 'id')
  const id = parseInt(idParam || '', 10)

  if (isNaN(id)) {
    throw createError({ statusCode: 400, message: 'ID FAQ tidak valid' })
  }

  await deleteFaq(id)

  return { success: true, message: 'FAQ berhasil dihapus' }
})
