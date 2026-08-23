export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  const templates = await readTemplates()

  const template = templates.find(t => t.slug === slug)

  if (!template) {
    throw createError({
      statusCode: 404,
      message: 'Template tidak ditemukan'
    })
  }

  return template
})
