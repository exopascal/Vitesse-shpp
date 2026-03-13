/**
 * E-Commerce Product Schema.org Helper
 *
 * Creates structured data for products, offers, ratings, FAQs, and breadcrumbs
 * Based on Schema.org specifications for e-commerce
 */

export interface ProductSchemaData {
  name: string
  description: string
  image: string | string[]
  sku?: string
  brand?: string
  price: number
  priceCurrency?: string
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder' | 'Discontinued'
  condition?: 'NewCondition' | 'UsedCondition' | 'RefurbishedCondition'
  url?: string

  // Optional: Ratings
  ratingValue?: number
  ratingCount?: number
  reviewCount?: number
}

export interface FAQItem {
  question: string
  answer: string
}

export interface BreadcrumbItem {
  name: string
  url: string
}

/**
 * Create Product Schema with Offer
 * @param product Product data
 * @returns JSON-LD Product schema
 */
export function createProductSchema(product: ProductSchemaData) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: Array.isArray(product.image) ? product.image : [product.image],
  }

  // Add optional fields
  if (product.sku) schema.sku = product.sku
  if (product.brand) {
    schema.brand = {
      '@type': 'Brand',
      name: product.brand
    }
  }

  // Offer
  schema.offers = {
    '@type': 'Offer',
    price: product.price.toFixed(2),
    priceCurrency: product.priceCurrency || 'EUR',
    availability: `https://schema.org/${product.availability || 'InStock'}`,
    itemCondition: `https://schema.org/${product.condition || 'NewCondition'}`,
  }

  if (product.url) {
    schema.offers.url = product.url
  }

  // Aggregate Rating (if provided)
  if (product.ratingValue && product.ratingCount) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: product.ratingValue.toFixed(1),
      ratingCount: product.ratingCount,
      reviewCount: product.reviewCount || product.ratingCount,
      bestRating: '5',
      worstRating: '1'
    }
  }

  return schema
}

/**
 * Create FAQ Schema
 * @param faqs Array of FAQ items
 * @returns JSON-LD FAQ schema
 */
export function createFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
}

/**
 * Create Breadcrumb Schema
 * @param items Breadcrumb items
 * @returns JSON-LD BreadcrumbList schema
 */
export function createBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}

/**
 * Create Organization Schema
 * @param orgData Organization data
 * @returns JSON-LD Organization schema
 */
export function createOrganizationSchema(orgData: {
  name: string
  url: string
  logo?: string
  description?: string
  contactPoint?: {
    telephone: string
    contactType: string
    email?: string
  }
}) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: orgData.name,
    url: orgData.url,
  }

  if (orgData.logo) {
    schema.logo = orgData.logo
  }

  if (orgData.description) {
    schema.description = orgData.description
  }

  if (orgData.contactPoint) {
    schema.contactPoint = {
      '@type': 'ContactPoint',
      telephone: orgData.contactPoint.telephone,
      contactType: orgData.contactPoint.contactType,
      email: orgData.contactPoint.email
    }
  }

  return schema
}

/**
 * Create WebSite Schema with Search Action
 * @param siteData Site data
 * @returns JSON-LD WebSite schema
 */
export function createWebSiteSchema(siteData: {
  name: string
  url: string
  searchUrl?: string
}) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteData.name,
    url: siteData.url
  }

  if (siteData.searchUrl) {
    schema.potentialAction = {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteData.searchUrl}?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  }

  return schema
}

/**
 * Convert schema object to JSON-LD string for use in <script type="application/ld+json">
 * @param schema Schema object
 * @returns Formatted JSON-LD string
 */
export function schemaToString(schema: any): string {
  return JSON.stringify(schema, null, 2)
}

/**
 * Example: Complete Product Page with all schemas
 *
 * Usage in Nuxt component:
 *
 * <script setup>
 * import { createProductSchema, createFAQSchema, createBreadcrumbSchema, schemaToString } from '~/utils/schemas/productSchema'
 *
 * const productSchema = createProductSchema({
 *   name: 'Premium Running Shoes',
 *   description: 'High-performance running shoes with advanced cushioning',
 *   image: ['https://example.com/shoe-1.jpg', 'https://example.com/shoe-2.jpg'],
 *   sku: 'RUN-001',
 *   brand: 'EXOPEK Sport',
 *   price: 129.99,
 *   priceCurrency: 'EUR',
 *   availability: 'InStock',
 *   ratingValue: 4.8,
 *   ratingCount: 245
 * })
 *
 * const faqSchema = createFAQSchema([
 *   { question: 'Wie fällt die Größe aus?', answer: 'Die Schuhe fallen normal aus...' },
 *   { question: 'Sind sie wasserdicht?', answer: 'Ja, sie haben eine wasserabweisende Membran...' }
 * ])
 *
 * const breadcrumbSchema = createBreadcrumbSchema([
 *   { name: 'Home', url: 'https://shop.exopek.de/' },
 *   { name: 'Sport', url: 'https://shop.exopek.de/categories/sport' },
 *   { name: 'Running Shoes', url: 'https://shop.exopek.de/categories/running-shoes' }
 * ])
 *
 * useHead({
 *   script: [
 *     { type: 'application/ld+json', innerHTML: schemaToString(productSchema) },
 *     { type: 'application/ld+json', innerHTML: schemaToString(faqSchema) },
 *     { type: 'application/ld+json', innerHTML: schemaToString(breadcrumbSchema) }
 *   ]
 * })
 * </script>
 */
