export default defineEventHandler((event) => {
  const cookies = parseCookies(event)
  if (!cookies.uid) throw createError({
    statusCode: 401,
    statusMessage: 'UNAUTHORIZED',
  })
})
