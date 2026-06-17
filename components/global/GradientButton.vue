<template>
  <component
    ref="buttonRef"
    :is="tag"
    v-bind="componentProps"
    class="gradient-button gradient-action-button"
    :data-gradient-action-mode="inverse ? 'inverse' : 'default'"
    :class="[
      `gradient-button-${size}`,
      `gradient-button-variant-${variant}`,
      {
        'gradient-button-block': block,
        'gradient-button-disabled': isDisabled,
      },
    ]"
  >
    <span class="gradient-action-button-ui" aria-hidden="true">
      <span class="gradient-action-button-overlay"></span>
    </span>
    <span class="gradient-button-label gradient-action-button-content gradient-action-button-label">
      <slot>{{ label }}</slot>
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed, ref, resolveComponent } from 'vue'
import { useGradientActionButtonAnimation } from '~/composables/useGradientActionButtonAnimation'

// NuxtLink muss als aufgelöste Komponente verwendet werden – der String
// 'NuxtLink' wird von <component :is> nicht zuverlässig aufgelöst und würde
// als totes <nuxtlink>-Element gerendert (kein href, keine Navigation).
const NuxtLink = resolveComponent('NuxtLink')

type ButtonSize = 'sm' | 'md' | 'lg'
type ButtonVariant = 'default' | 'tapex' | 'torque' | 'exopek' | 'sportreact' | 'witty' | 'tunturi'

const props = withDefaults(
  defineProps<{
    label?: string
    to?: string
    href?: string
    type?: 'button' | 'submit' | 'reset'
    size?: ButtonSize
    variant?: ButtonVariant
    block?: boolean
    disabled?: boolean
    inverse?: boolean
  }>(),
  {
    label: '',
    to: '',
    href: '',
    type: 'button',
    size: 'md',
    variant: 'default',
    block: false,
    disabled: false,
    inverse: false,
  }
)

const isDisabled = computed(() => props.disabled)
const buttonRef = ref<HTMLElement | null>(null)

useGradientActionButtonAnimation(buttonRef)

const tag = computed(() => {
  if (props.to) {
    return NuxtLink
  }

  if (props.href) {
    return 'a'
  }

  return 'button'
})

const componentProps = computed(() => {
  if (props.to) {
    return {
      to: props.to,
      'aria-disabled': isDisabled.value ? 'true' : undefined,
      tabindex: isDisabled.value ? -1 : undefined,
    }
  }

  if (props.href) {
    return {
      href: props.href,
      'aria-disabled': isDisabled.value ? 'true' : undefined,
      tabindex: isDisabled.value ? -1 : undefined,
    }
  }

  return {
    type: props.type,
    disabled: isDisabled.value,
  }
})
</script>

<style scoped>
.gradient-button {
  position: relative;
  display: inline-flex;
  width: fit-content;
  max-width: 100%;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-width: 13rem;
  padding: 0;
  border: 0;
  border-radius: 1.05rem;
  color: #fff;
  text-decoration: none;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease,
    filter 180ms ease;
  cursor: pointer;
  overflow: hidden;
}

.gradient-button::before {
  content: '';
  position: absolute;
  inset: 1px;
  border-radius: calc(1.05rem - 1px);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0));
  pointer-events: none;
}

.gradient-button:hover {
  transform: translateY(-1px);
  filter: saturate(1.04);
}

.gradient-button:focus-visible {
  outline: 3px solid rgba(102, 179, 243, 0.45);
  outline-offset: 3px;
}

.gradient-button-label {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  letter-spacing: -0.02em;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.14);
}

.gradient-button-sm {
  min-height: 2.9rem;
  padding: 0 calc(1.2rem + var(--gradient-action-expand));
}

.gradient-button-sm .gradient-button-label {
  font-size: 0.95rem;
}

.gradient-button-md {
  min-height: 3.35rem;
  padding: 0 calc(1.65rem + var(--gradient-action-expand));
}

.gradient-button-md .gradient-button-label {
  font-size: 1rem;
}

.gradient-button-lg {
  min-height: 3.9rem;
  padding: 0 calc(2rem + var(--gradient-action-expand));
}

.gradient-button-lg .gradient-button-label {
  font-size: 1.1rem;
}

.gradient-button-block {
  display: flex;
  width: 100%;
}

.gradient-button-disabled {
  opacity: 0.55;
  pointer-events: none;
  box-shadow: none;
}
</style>
