import { getTemplateBySlug } from '~/server/utils/templates-store'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) throw createError({ statusCode: 400, message: 'Slug tidak valid' })

  const template = await getTemplateBySlug(slug)

  if (!template) {
    throw createError({
      statusCode: 404,
      message: 'Template tidak ditemukan',
    })
  }

  return template
})
