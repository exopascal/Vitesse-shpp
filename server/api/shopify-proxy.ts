// Storefront API proxy for headless analytics.
// Shopify deprecated the _shopify_y / _shopify_s cookies (April 30, 2026). The tracking
// values now come back in the Server-Timing header of Storefront API responses
// (_y = uniqueToken, _s = visitToken). Proxying through our domain lets Shopify's
// new cookies (_shopify_analytics etc.) live first-party so returning visitors keep
// the same tokens.
// See: https://shopify.dev/docs/storefronts/headless/legacy/hydrogen/migrate/cookies-custom-setup

function parseServerTiming(header: string): Record<string, string> {
  const values: Record<string, string> = {}
  for (const entry of header.split(',')) {
    const match = entry.trim().match(/^([^;]+);\s*desc="?([^";]*)"?/)
    if (match) values[match[1].trim()] = match[2]
  }
  return values
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { domain, accessToken, apiVersion } = config.public.shopify as {
    domain: string
    accessToken: string
    apiVersion: string
  }

  if (!domain || !accessToken) {
    throw createError({ statusCode: 500, statusMessage: 'Shopify config missing' })
  }

  // Forward incoming cookies so Shopify recognises returning visitors
  const incomingCookies = getHeader(event, 'cookie') ?? ''

  const upstream = await fetch(
    `https://${domain}/api/${apiVersion || '2025-01'}/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': accessToken,
        ...(incomingCookies ? { cookie: incomingCookies } : {}),
      },
      body: JSON.stringify({ query: '{ shop { id } }' }),
    },
  )

  // Forward Shopify's Set-Cookie headers to the client (first-party domain)
  const cookies = upstream.headers.getSetCookie?.() ?? []
  for (const cookie of cookies) {
    appendResponseHeader(event, 'set-cookie', cookie)
  }

  // Response is visitor-specific — never cache it
  setResponseHeader(event, 'cache-control', 'no-store')

  const timing = parseServerTiming(upstream.headers.get('server-timing') ?? '')
  const json = (await upstream.json()) as { data?: { shop?: { id?: string } } }

  return {
    shopId: json?.data?.shop?.id ?? null,
    uniqueToken: timing._y ?? null,
    visitToken: timing._s ?? null,
    // Expiry timestamps (epoch seconds) for the tokens
    uniqueTokenExpiresAt: timing._ye ? Number(timing._ye) : null,
    visitTokenExpiresAt: timing._se ? Number(timing._se) : null,
  }
})
