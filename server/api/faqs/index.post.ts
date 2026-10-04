import { requireAdminAuth } from '~/server/utils/db'
import { createFaq } from '~/server/utils/faqs-store'

export default defineEventHandler(async (event) => {
  requireAdminAuth(event)

  const body = await readBody(event)
  const { question, answer, isPublished, orderIndex } = body || {}

  if (!question || !question.trim()) {
    throw createError({ statusCode: 400, message: 'Pertanyaan (question) wajib diisi' })
  }
  if (!answer || !answer.trim()) {
    throw createError({ statusCode: 400, message: 'Jawaban (answer) wajib diisi' })
  }

  const created = await createFaq({
    question: question.trim(),
    answer: answer.trim(),
    isPublished: isPublished !== false,
    orderIndex: typeof orderIndex === 'number' ? orderIndex : undefined,
  })

  return { success: true, faq: created, message: 'FAQ berhasil ditambahkan' }
})
