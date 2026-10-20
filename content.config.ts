import { defineContentConfig, defineCollection, z } from '@nuxt/content'

// Nur der Blog wird von @nuxt/content indexiert.
// content/products und content/seo bleiben bewusst außen vor (eigene Workflows).
export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/**',
      schema: z.object({
        title: z.string(),
        subhead: z.string().optional(),
        description: z.string().optional(),
        category: z.string().optional(),
        date: z.string().optional(),
        heroImage: z.string().optional(),
        heroImageAlt: z.string().optional(),
        headerHighlight: z.string().optional(),
        tags: z.array(z.string()).optional(),
      }),
    }),
  },
})
