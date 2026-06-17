import { gsap } from 'gsap'
import { onBeforeUnmount, onMounted, unref } from 'vue'

type MaybeElement = HTMLElement | null | undefined

export function useGradientActionButtonAnimation(target: { value: MaybeElement } | MaybeElement) {
  let cleanup: (() => void) | null = null

  onMounted(() => {
    const raw = unref(target) as any
    // Bei einer aufgelösten Komponente (z. B. NuxtLink) ist die Template-Ref
    // die Komponenten-Instanz – das DOM-Element liegt dann unter $el.
    // Native Elemente (<a>, <button>) kommen direkt als DOM-Node.
    const element = (raw?.$el ?? raw) as MaybeElement
    if (!element || typeof element.querySelector !== 'function') {
      return
    }

    const overlay = element.querySelector<HTMLElement>('.gradient-action-button-overlay')
    if (!overlay) {
      return
    }

    const isInverse = element.dataset.gradientActionMode === 'inverse'

    gsap.set(element, { '--gradient-action-expand': '0px' })
    gsap.set(overlay, {
      opacity: isInverse ? 1 : 0,
      scaleX: isInverse ? 1 : 0.92,
      transformOrigin: '50% 50%',
    })

    if (isInverse) {
      element.classList.add('is-hovered')
    }

    const hoverIn = () => {
      if (element.matches(':disabled') || element.getAttribute('aria-disabled') === 'true') {
        return
      }

      gsap.killTweensOf(element)
      gsap.killTweensOf(overlay)

      if (isInverse) {
        element.classList.remove('is-hovered')
      } else {
        element.classList.add('is-hovered')
      }

      gsap.to(element, {
        '--gradient-action-expand': '10px',
        duration: 0.48,
        ease: 'expo.out',
      })

      gsap.to(overlay, {
        opacity: isInverse ? 0 : 1,
        scaleX: isInverse ? 0.92 : 1,
        duration: 0.52,
        ease: 'expo.out',
      })
    }

    const hoverOut = () => {
      gsap.killTweensOf(element)
      gsap.killTweensOf(overlay)

      gsap.to(element, {
        '--gradient-action-expand': '0px',
        duration: 0.38,
        ease: 'expo.out',
      })

      if (isInverse) {
        element.classList.add('is-hovered')
      }

      gsap.to(overlay, {
        opacity: isInverse ? 1 : 0,
        scaleX: isInverse ? 1 : 0.92,
        duration: 0.3,
        ease: 'power3.out',
        onComplete: () => {
          if (!isInverse) {
            element.classList.remove('is-hovered')
          }
        },
      })
    }

    element.addEventListener('mouseenter', hoverIn)
    element.addEventListener('mouseleave', hoverOut)
    element.addEventListener('focus', hoverIn)
    element.addEventListener('blur', hoverOut)

    cleanup = () => {
      element.removeEventListener('mouseenter', hoverIn)
      element.removeEventListener('mouseleave', hoverOut)
      element.removeEventListener('focus', hoverIn)
      element.removeEventListener('blur', hoverOut)
    }
  })

  onBeforeUnmount(() => {
    cleanup?.()
  })
}
