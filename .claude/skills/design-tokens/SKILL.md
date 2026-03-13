---
name: design-tokens
description: Enforce strict design token usage via Tailwind utilities across all components. Design tokens ensure visual consistency, maintainability, and prevent hardcoded values. Use when styling components or reviewing code. Covers Tailwind-first approach, all token categories (colors, typography, spacing, shadows, radius), and code review checklist.
---

# Design Tokens Usage (Tailwind-First)

Enforce strict design token usage for visual consistency.

## Core Principle

**ALL styling MUST use Tailwind utilities that reference design tokens from `assets/css/global.css`.**

No exceptions. No hardcoded values. Tailwind + Design tokens = single source of truth.

---

## Priority Order (MANDATORY)

**Tailwind-First Approach:**

```
1. Tailwind Utilities (Token-Based) ⭐ PRIMARY
   └─> bg-brand, text-heading, p-6, rounded-xl
   └─> All utilities reference design tokens via tailwind.config.js
   └─> ALWAYS prefer Tailwind classes

2. CSS Custom Properties (Only for Complex/Dynamic Cases)
   └─> :style="{ backgroundColor: customColor }"
   └─> Use only when Tailwind isn't sufficient (e.g., dynamic user colors)

3. Custom CSS Classes (RARE - Gradients, Animations)
   └─> .bg-gradient-warm, .hover-glow
   └─> Defined in global.css, still use tokens internally
   └─> Only for effects not possible with Tailwind

❌ NEVER: Hardcoded values
   └─> bg-[#3b82f6], p-[24px], font-['Inter']
   └─> FORBIDDEN - Always use semantic Tailwind classes
```

---

## Available Tailwind Classes (Token-Based)

All Tailwind utilities automatically reference design tokens from `global.css` via `tailwind.config.js`.

### Colors

**Brand Colors:**
```vue
<!-- ✅ CORRECT - Tailwind classes -->
<div class="bg-brand text-white">
<div class="bg-brand-light text-brand-dark">

<!-- ❌ WRONG - Hardcoded arbitrary values -->
<div class="bg-[#dc2626] text-[#ffffff]">
```

**Semantic Text Colors:**
```vue
<h1 class="text-heading">        <!-- var(--color-text-primary) -->
<p class="text-body">            <!-- var(--color-text-secondary) -->
<span class="text-muted">        <!-- var(--color-text-tertiary) -->
```

**Background Colors:**
```vue
<div class="bg-surface-primary">    <!-- var(--color-bg-primary) -->
<div class="bg-surface-secondary">  <!-- var(--color-bg-secondary) -->
<div class="bg-surface-elevated">   <!-- var(--color-bg-elevated) -->
```

**Available Color Classes:**
- `bg-brand`, `text-brand`, `border-brand`
- `bg-surface-primary`, `bg-surface-secondary`, `bg-surface-tertiary`
- `text-heading`, `text-body`, `text-muted`, `text-disabled`
- `text-success`, `text-warning`, `text-error`

### Typography

**Font Families:**
```vue
<!-- ✅ CORRECT -->
<h1 class="font-display">  <!-- Headlines -->
<p class="font-body">      <!-- Body text -->

<!-- ❌ WRONG -->
<h1 class="font-['Comfortaa']">
```

**Font Sizes:**
```vue
<h1 class="text-5xl">      <!-- 3rem / 48px -->
<p class="text-base">      <!-- 1rem / 16px -->
<span class="text-sm">     <!-- 0.875rem / 14px -->
```

**Font Weights:**
```vue
<h1 class="font-bold">     <!-- 700 -->
<p class="font-medium">    <!-- 500 -->
<span class="font-light">  <!-- 300 -->
```

### Spacing

**Padding & Margin:**
```vue
<!-- ✅ CORRECT - Uses spacing scale -->
<div class="p-6">         <!-- 1.5rem / 24px -->
<div class="px-4 py-8">   <!-- x: 1rem, y: 2rem -->
<div class="mt-12">       <!-- 3rem / 48px -->

<!-- ❌ WRONG - Arbitrary values -->
<div class="p-[24px]">
<div class="mt-[48px]">
```

**Gap (Flexbox/Grid):**
```vue
<div class="flex gap-4">
<div class="grid gap-6">
```

### Shadows, Radius, Transitions

**Box Shadows:**
```vue
<div class="shadow-sm">   <!-- Subtle shadow -->
<div class="shadow-md">   <!-- Medium shadow -->
<div class="shadow-xl">   <!-- Large shadow -->
```

**Border Radius:**
```vue
<div class="rounded-lg">   <!-- 0.75rem / 12px -->
<div class="rounded-xl">   <!-- 1rem / 16px -->
<div class="rounded-full"> <!-- 50% / perfect circle -->
```

**Transitions:**
```vue
<button class="transition-all duration-300 hover:scale-105">
```

---

## Common Use Cases (Tailwind-First)

### Button Styling
```vue
<!-- ✅ CORRECT - Pure Tailwind -->
<button class="bg-brand text-white px-6 py-3 rounded-lg font-semibold transition-all hover:bg-brand-light hover:shadow-lg shadow-md">
  {{ text }}
</button>

<!-- Also valid with custom gradient class -->
<button class="bg-gradient-primary text-white px-6 py-3 rounded-lg font-bold shadow-md hover:shadow-xl">
  {{ text }}
</button>
```

### Card Styling
```vue
<!-- ✅ CORRECT - Tailwind utilities -->
<div class="bg-surface-secondary p-6 rounded-xl shadow-md border border-gray-700">
  <slot />
</div>

<!-- Product card example -->
<div class="bg-surface-tertiary p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
  <img class="rounded-lg mb-4" :src="product.image" />
  <h3 class="text-heading font-bold text-xl mb-2">{{ product.name }}</h3>
  <p class="text-body mb-4">{{ product.description }}</p>
  <div class="flex items-center justify-between">
    <span class="text-brand font-bold text-2xl">{{ product.price }}€</span>
    <button class="bg-brand text-white px-4 py-2 rounded-lg">Add to Cart</button>
  </div>
</div>
```

### Hero Section
```vue
<!-- ✅ CORRECT - Tailwind + custom gradient class -->
<section class="bg-gradient-hero py-20 md:py-32 min-h-[600px] flex items-center">
  <div class="container mx-auto px-4">
    <h1 class="font-display text-5xl md:text-6xl font-black text-white leading-tight mb-6">
      {{ title }}
    </h1>
    <p class="text-white text-xl mb-8 max-w-2xl">
      {{ subtitle }}
    </p>
    <button class="bg-white text-brand px-8 py-4 rounded-xl font-bold hover:shadow-2xl transition-all">
      Shop Now
    </button>
  </div>
</section>
```

### Product Grid
```vue
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <ProductCard v-for="product in products" :key="product.id" :product="product" />
</div>
```

---

## Tailwind Integration Details

**How it works:**

All Tailwind utilities automatically reference design tokens via `tailwind.config.js`:

```javascript
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        brand: 'var(--color-brand-primary)',
        'brand-light': 'var(--color-brand-secondary)',
        'brand-dark': 'var(--color-brand-dark)',
        // Semantic colors
        heading: 'var(--color-text-primary)',
        body: 'var(--color-text-secondary)',
        muted: 'var(--color-text-tertiary)',
      },
      fontFamily: {
        display: 'var(--font-family-display)',
        body: 'var(--font-family-primary)'
      },
      // ... all other tokens
    }
  }
}
```

**Result:** Every Tailwind class uses design tokens under the hood!

```vue
<!-- When you write: -->
<div class="bg-brand text-heading p-6">

<!-- Tailwind generates: -->
.bg-brand { background-color: var(--color-brand-primary); }
.text-heading { color: var(--color-text-primary); }
.p-6 { padding: 1.5rem; }  /* From Tailwind's spacing scale */
```

---

## When to Use CSS Custom Properties (Rare)

**Only use `:style` bindings for:**

1. **Dynamic/User-Controlled Colors:**
```vue
<!-- User can customize product color -->
<div :style="{ backgroundColor: product.customColor }">
```

2. **Computed/Calculated Values:**
```vue
<div :style="{ width: `${progress}%` }">
```

3. **Complex Gradients (not predefined):**
```vue
<div :style="{ backgroundImage: `linear-gradient(${angle}deg, ${color1}, ${color2})` }">
```

**For everything else:** Use Tailwind classes!

---

## Code Review Checklist

**Before committing, verify:**

- [ ] ✅ Uses Tailwind classes (not arbitrary values)
- [ ] ✅ No hardcoded hex colors (`bg-[#3b82f6]`)
- [ ] ✅ No hardcoded pixel values (`p-[24px]`)
- [ ] ✅ No hardcoded font names (`font-['Inter']`)
- [ ] ✅ Semantic classes used (`text-heading` not `text-gray-900`)
- [ ] ✅ Responsive breakpoints applied (`md:`, `lg:`)
- [ ] ✅ `:style` only for dynamic/computed values
- [ ] ✅ Custom CSS classes only for gradients/animations

---

## Common Mistakes & Fixes

### ❌ Mistake #1: Arbitrary Color Values
```vue
<!-- ❌ WRONG -->
<div class="bg-[#dc2626] text-[#ffffff]">

<!-- ✅ CORRECT -->
<div class="bg-brand text-white">
```

### ❌ Mistake #2: Arbitrary Spacing
```vue
<!-- ❌ WRONG -->
<div class="p-[24px] mt-[64px]">

<!-- ✅ CORRECT -->
<div class="p-6 mt-16">
```

### ❌ Mistake #3: Custom Font Names
```vue
<!-- ❌ WRONG -->
<h1 class="font-['Comfortaa'] text-[48px]">

<!-- ✅ CORRECT -->
<h1 class="font-display text-5xl">
```

### ❌ Mistake #4: Inline Styles (Non-Dynamic)
```vue
<!-- ❌ WRONG -->
<div style="color: var(--color-brand-primary); padding: 1.5rem">

<!-- ✅ CORRECT -->
<div class="text-brand p-6">
```

### ❌ Mistake #5: Missing Responsive Classes
```vue
<!-- ❌ WRONG - Not responsive -->
<div class="text-5xl p-6">

<!-- ✅ CORRECT - Mobile-first responsive -->
<div class="text-3xl md:text-4xl lg:text-5xl p-4 md:p-6">
```

---

## Quick Reference (Tailwind Classes)

**Colors:**
```vue
<!-- Brand -->
<div class="bg-brand text-white">
<div class="bg-brand-light border-brand-dark">

<!-- Semantic Text -->
<h1 class="text-heading">
<p class="text-body">
<span class="text-muted">

<!-- Backgrounds -->
<div class="bg-surface-primary">
<div class="bg-surface-secondary">
```

**Typography:**
```vue
<h1 class="font-display text-5xl font-bold">
<p class="font-body text-base">
<span class="text-sm font-medium">
```

**Spacing:**
```vue
<div class="p-6 mt-8 gap-4">
<div class="px-4 py-12">
```

**Layout:**
```vue
<div class="container mx-auto">
<div class="grid grid-cols-3 gap-6">
<div class="flex items-center justify-between">
```

**Effects:**
```vue
<div class="shadow-md rounded-xl">
<button class="transition-all hover:scale-105">
<div class="bg-gradient-primary">
```

---

## Priority Order Summary

```
1. Tailwind Classes ⭐ PRIMARY
   └─> bg-brand, text-heading, p-6, rounded-xl
   └─> ALWAYS use these first

2. Custom CSS Classes (Gradients/Animations)
   └─> .bg-gradient-hero, .hover-glow
   └─> Defined in global.css, use sparingly

3. :style Bindings (Dynamic Only)
   └─> :style="{ backgroundColor: product.color }"
   └─> Only for computed/user values

❌ NEVER: Hardcoded arbitrary values
   └─> bg-[#3b82f6], p-[24px], font-['Inter']
```

---

## Summary

**Design tokens ensure visual consistency across the e-commerce platform:**

✅ **DO:**
- Use Tailwind classes: `bg-brand`, `text-heading`, `p-6`
- Apply responsive breakpoints: `md:text-4xl`, `lg:grid-cols-3`
- Use custom gradient classes: `.bg-gradient-primary`
- Use `:style` for dynamic values only

❌ **DON'T:**
- Use arbitrary values: `bg-[#dc2626]`, `p-[24px]`
- Hardcode fonts: `font-['Comfortaa']`
- Use inline styles for static values
- Skip responsive classes

**Result:** Maintainable, consistent, theme-ready styling!
