// Shopify token-based checkout URLs — must never be redirected
// Pattern: /cart/c/<token> or /checkouts/<token>
const SHOPIFY_CHECKOUT_PATTERN = /^\/(cart\/c\/|checkouts\/|payments\/|wallets\/)/

export default defineEventHandler((event) => {
  const host = getHeader(event, 'host') ?? ''

  if (host === 'checkout.vitesse-sports.de') {
    const url = getRequestURL(event)

    // Keep actual Shopify checkout/payment pages on checkout subdomain
    if (SHOPIFY_CHECKOUT_PATTERN.test(url.pathname)) return

    // Everything else → canonical www domain
    return sendRedirect(
      event,
      `https://www.vitesse-sports.de${url.pathname}${url.search}`,
      301
    )
  }
})
