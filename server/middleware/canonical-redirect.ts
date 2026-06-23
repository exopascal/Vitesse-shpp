export default defineEventHandler((event) => {
  const host = getHeader(event, 'host') ?? ''

  // Redirect checkout subdomain to www
  if (host === 'checkout.vitesse-sports.de') {
    const url = getRequestURL(event)
    return sendRedirect(
      event,
      `https://www.vitesse-sports.de${url.pathname}${url.search}`,
      301
    )
  }
})
