import { requireAdminAuth } from '~/server/utils/db'

export default defineEventHandler((event) => {
  const user = requireAdminAuth(event)
  return {
    authenticated: true,
    user,
  }
})
