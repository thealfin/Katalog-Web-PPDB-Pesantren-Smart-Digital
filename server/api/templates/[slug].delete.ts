export default defineEventHandler(async (event) => {
  const authHeader = getRequestHeader(event, 'x-admin-auth')
  if (!authHeader || authHeader !== 'true') {
    throw createError({ statusCode: 401, message: 'Tidak terautentikasi' })
  }

  const slug = getRouterParam(event, 'slug')

  const templates = await readTemplates()
  const idx = templates.findIndex((t: any) => t.slug === slug)
  if (idx === -1) throw createError({ statusCode: 404, message: 'Template tidak ditemukan' })

  templates.splice(idx, 1)
  await writeTemplates(templates)

  return { success: true, message: `Template "${slug}" berhasil dihapus` }
})
