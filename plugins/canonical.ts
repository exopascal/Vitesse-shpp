export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const route = useRoute()
  const siteUrl = (config.public.siteUrl as string).replace(/\/$/, '')

  const setCanonical = () => {
    const path = route.path
    useHead({
      link: [{ rel: 'canonical', href: `${siteUrl}${path}` }],
    })
  }

  setCanonical()
  const router = useRouter()
  router.afterEach(setCanonical)
})
