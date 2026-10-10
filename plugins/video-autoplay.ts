export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('autoplay-on-visible', {
    getSSRProps() {
      return {}
    },
    mounted(el: HTMLVideoElement) {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              el.play().catch(() => {})
            } else {
              el.pause()
            }
          }
        },
        { threshold: 0.25 },
      )
      observer.observe(el)
      ;(el as any)._autoplayObserver = observer
    },
    unmounted(el: HTMLVideoElement) {
      ;(el as any)._autoplayObserver?.disconnect()
    },
  })
})
