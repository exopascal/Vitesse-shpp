export default defineNuxtRouteMiddleware((to) => {
  const config = useRuntimeConfig()
  const siteUrl = (config.public.siteUrl as string).replace(/\/$/, '')
  useHead({
    link: [{ rel: 'canonical', href: `${siteUrl}${to.path}` }],
  })
})
