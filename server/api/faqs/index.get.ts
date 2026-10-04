import { readFaqs } from '~/server/utils/faqs-store'
import { verifySessionToken } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const wantAll = query.all === 'true'

  let includeDrafts = false
  if (wantAll) {
    // Cek apakah request memiliki auth admin valid
    const authHeader = getRequestHeader(event, 'authorization')
    const cookieToken = getCookie(event, 'admin_token')
    const legacyHeader = getRequestHeader(event, 'x-admin-auth')

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const user = verifySessionToken(authHeader.substring(7))
      if (user) includeDrafts = true
    } else if (cookieToken && verifySessionToken(cookieToken)) {
      includeDrafts = true
    } else if (legacyHeader === 'true') {
      includeDrafts = true
    }
  }

  const faqs = await readFaqs(includeDrafts)
  return faqs
})
