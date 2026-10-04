import { requireAdminAuth } from '~/server/utils/db'
import { updateFaq } from '~/server/utils/faqs-store'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)

  const idParam = getRouterParam(event, 'id')
  const id = parseInt(idParam || '', 10)

  if (isNaN(id)) {
    throw createError({ statusCode: 400, message: 'ID FAQ tidak valid' })
  }

  const body = await readBody(event)
  const { question, answer, isPublished, orderIndex } = body || {}

  const updated = await updateFaq(id, {
    question: question !== undefined ? question.trim() : undefined,
    answer: answer !== undefined ? answer.trim() : undefined,
    isPublished: isPublished !== undefined ? Boolean(isPublished) : undefined,
    orderIndex: typeof orderIndex === 'number' ? orderIndex : undefined,
  })

  return { success: true, faq: updated, message: 'FAQ berhasil diperbarui' }
})
