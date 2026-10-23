// Proxies a minimal Storefront API request so Shopify sets _shopify_y / _shopify_s
// as first-party cookies on the storefront domain instead of myshopify.com.
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

  // Forward incoming cookies so Shopify can recognise returning visitors
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

  const json = (await upstream.json()) as { data?: { shop?: { id?: string } } }
  return { shopId: json?.data?.shop?.id ?? null }
})
