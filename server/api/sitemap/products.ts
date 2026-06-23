import { defineSitemapEventHandler } from '#imports'

export default defineSitemapEventHandler(async () => {
  const config = useRuntimeConfig()
  const { domain, apiVersion, accessToken } = config.public.shopify as {
    domain: string
    apiVersion: string
    accessToken: string
  }

  if (!domain || !accessToken) return []

  const query = `
    query getSitemapProducts($cursor: String) {
      products(first: 250, after: $cursor) {
        pageInfo { hasNextPage endCursor }
        edges {
          node {
            handle
            updatedAt
            featuredImage { url }
          }
        }
      }
    }
  `

  const products: any[] = []
  let cursor: string | null = null

  do {
    const res = await $fetch<any>(`https://${domain}/api/${apiVersion}/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': accessToken,
      },
      body: JSON.stringify({ query, variables: { cursor } }),
    })

    const page = res?.data?.products
    if (!page) break

    products.push(...page.edges.map((e: any) => e.node))
    cursor = page.pageInfo.hasNextPage ? page.pageInfo.endCursor : null
  } while (cursor)

  return products.map((p) => ({
    loc: `/products/${p.handle}`,
    lastmod: p.updatedAt,
    changefreq: 'weekly' as const,
    priority: 0.8,
    images: p.featuredImage?.url
      ? [{ loc: p.featuredImage.url, title: p.handle }]
      : undefined,
  }))
})
