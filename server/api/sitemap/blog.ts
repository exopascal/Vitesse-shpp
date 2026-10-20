import { defineSitemapEventHandler } from '#imports'
import { queryCollection } from '@nuxt/content/server'

export default defineSitemapEventHandler(async (event) => {
  const posts = await queryCollection(event, 'blog').all()

  return [
    { loc: '/blog' },
    ...posts.map((post: { path: string; date?: string }) => ({
      loc: post.path,
      lastmod: post.date,
    })),
  ]
})
