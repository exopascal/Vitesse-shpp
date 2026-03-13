/**
 * Sitemap API Route - Products
 *
 * Generates sitemap URLs for all products in the e-commerce store
 * Fetches products from Shopify/database and returns them in sitemap format
 */

import { defineSitemapEventHandler } from '#imports'

export default defineSitemapEventHandler(async (e) => {
  // TODO: Replace with actual product fetching from Shopify
  // For now, return empty array - implement based on your data source

  const config = useRuntimeConfig()

  // Example: Fetch products from Shopify
  // const products = await fetchProductsFromShopify(config.public.shopify)

  // Placeholder - replace with actual product data
  const products: any[] = []

  return products.map((product) => ({
    loc: `/products/${product.handle}`,
    lastmod: product.updatedAt || new Date().toISOString(),
    changefreq: 'weekly' as const,
    priority: 0.8,

    // Optional: Add images
    // images: product.images?.map((img: any) => ({
    //   loc: img.url,
    //   title: product.title
    // }))
  }))
})

/**
 * Example implementation with Shopify:
 *
 * async function fetchProductsFromShopify(shopifyConfig: any) {
 *   const { domain, apiVersion, accessToken } = shopifyConfig
 *
 *   const response = await fetch(
 *     `https://${domain}/admin/api/${apiVersion}/products.json`,
 *     {
 *       headers: {
 *         'X-Shopify-Access-Token': accessToken
 *       }
 *     }
 *   )
 *
 *   const data = await response.json()
 *   return data.products
 * }
 */
