const SHOPIFY_PATHS = ['/cart', '/checkouts', '/orders', '/account', '/payments', '/wallets']

export default defineEventHandler((event) => {
  const host = getHeader(event, 'host') ?? ''

  if (host === 'checkout.vitesse-sports.de') {
    const url = getRequestURL(event)

    // Never redirect Shopify-owned paths — these are served by Shopify directly
    if (SHOPIFY_PATHS.some((p) => url.pathname.startsWith(p))) return

    return sendRedirect(
      event,
      `https://www.vitesse-sports.de${url.pathname}${url.search}`,
      301
    )
  }
})
