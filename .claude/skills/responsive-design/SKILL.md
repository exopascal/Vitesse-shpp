---
name: responsive-design
description: Mobile-first responsive design patterns for all breakpoints. Use when implementing responsive layouts, testing component responsiveness, or ensuring mobile compatibility. Covers Tailwind breakpoints (sm, md, lg, xl), touch-friendly design (44px minimum), common patterns (stacked to side-by-side, grid columns, hidden/visible), and testing at key widths (375px, 768px, 1440px).
---

# Responsive Design Patterns

Mobile-first, responsive layouts across all breakpoints.

## Core Principle

**Mobile-first approach**: Design for mobile devices first, then progressively enhance for larger screens.

## Breakpoint Strategy

**See `references/breakpoints.md` for complete details:**

### Tailwind Breakpoints
```css
Mobile (default):     0px - 639px
Tablet (sm:):        640px+
Laptop (md:):        768px+
Desktop (lg:):      1024px+
Large Desktop (xl:): 1280px+
```

### Testing Widths
```
Mobile:  375px, 360px, 414px
Tablet:  768px, 834px, 1024px
Desktop: 1366px, 1440px, 1920px
```

## Mobile-First Implementation

**Basic pattern:**

```vue
<div class="
  grid
  grid-cols-1       /* Mobile: 1 column */
  sm:grid-cols-2    /* Tablet: 2 columns */
  lg:grid-cols-3    /* Desktop: 3 columns */
  gap-4             /* Mobile: 1rem gap */
  md:gap-6          /* Laptop: 1.5rem gap */
  p-4               /* Mobile: 1rem padding */
  md:p-8            /* Laptop: 2rem padding */
">
  <Card v-for="item in items" :key="item.id" />
</div>
```

## Common Responsive Patterns

**See `references/common-patterns.md` for complete examples:**

1. **Stacked to Side-by-Side** - `flex-col md:flex-row`
2. **Hidden/Visible** - `hidden md:block` / `block md:hidden`
3. **Grid Column Variations** - `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`
4. **Container Max-Width** - `max-w-7xl mx-auto px-4 md:px-8`
5. **Hero Section Responsive** - Height, text alignment, CTA layout
6. **Card Grid Responsive** - 1/2/3/4 columns across breakpoints
7. **Image Responsive** - `w-full h-auto object-cover`

## Typography Scaling

```vue
<h1 class="
  text-3xl          /* Mobile: 30px */
  md:text-4xl       /* Laptop: 36px */
  lg:text-5xl       /* Desktop: 48px */
  xl:text-6xl       /* Large: 60px */
  font-bold
  leading-tight
  md:leading-none
">
  {{ title }}
</h1>

<p class="
  text-base         /* Mobile: 16px */
  md:text-lg        /* Laptop+: 18px */
  leading-normal
">
  {{ description }}
</p>
```

## Touch-Friendly Mobile Design

**Minimum touch target**: 44px × 44px (iOS guideline)

```vue
<!-- ✅ CORRECT: 44px minimum -->
<button class="
  min-h-[44px]
  min-w-[44px]
  px-6
  py-3
  text-base
">
  Click Me
</button>

<!-- ❌ WRONG: Too small -->
<button class="px-2 py-1 text-xs">
  Tiny Button
</button>
```

**Spacing between interactive elements**: Minimum 12px

```vue
<div class="
  flex
  flex-col          /* Stack on mobile */
  gap-3             /* 12px between buttons */
  sm:flex-row
  sm:gap-4
">
  <button>Action 1</button>
  <button>Action 2</button>
</div>
```

## Container Patterns

**See `references/container-patterns.md` for examples:**

### Full-Width Container
```vue
<section class="w-full bg-primary py-12 md:py-16">
  <div class="max-w-7xl mx-auto px-4 md:px-8">
    <!-- Constrained content -->
  </div>
</section>
```

### Constrained Container
```vue
<div
  class="container mx-auto px-4 md:px-8"
  :style="{ maxWidth: 'var(--container-max-width)' }"
>
  <!-- Content -->
</div>
```

## Testing Checklist

**Mobile:**
- [ ] 375px (iPhone SE, most common)
- [ ] 360px (Android phones)
- [ ] 414px (iPhone 11/XR)

**Tablet:**
- [ ] 768px (iPad portrait)
- [ ] 834px (iPad Pro 11")
- [ ] 1024px (iPad landscape)

**Desktop:**
- [ ] 1366px (Common laptop)
- [ ] 1440px (MacBook)
- [ ] 1920px (Full HD)

**Verify:**
- [ ] Text readable (not too small/large)
- [ ] Images scale appropriately
- [ ] Touch targets 44px minimum (mobile)
- [ ] No horizontal scroll
- [ ] No content cut off
- [ ] Spacing balanced
- [ ] Layout doesn't break
- [ ] Navigation works (hamburger/full menu)
- [ ] Forms usable (inputs large enough)
- [ ] Buttons easy to tap (mobile)

## Common Mistakes

**See `references/common-mistakes.md` for details:**

### ❌ Desktop-First Approach
```vue
<!-- WRONG: Starts with desktop -->
<div class="grid-cols-4 md:grid-cols-1">
```

### ❌ Fixed Widths
```vue
<!-- WRONG: Breaks responsiveness -->
<div style="width: 1200px">

<!-- CORRECT: Max-width with padding -->
<div class="max-w-7xl mx-auto px-4 md:px-8">
```

### ❌ Tiny Touch Targets
```vue
<!-- WRONG: Too small for mobile -->
<button class="px-2 py-1 text-xs">

<!-- CORRECT: 44px minimum -->
<button class="px-6 py-3 text-base min-h-[44px]">
```

### ❌ No Responsive Padding
```vue
<!-- WRONG: Same padding everywhere -->
<div class="p-8">

<!-- CORRECT: Smaller on mobile -->
<div class="p-4 md:p-8">
```

## Responsive Utilities Reference

**See `references/utilities-reference.md` for complete list:**

```
Display:    hidden md:block, block md:hidden
Flexbox:    flex-col md:flex-row
Grid:       grid-cols-1 md:grid-cols-2 lg:grid-cols-3
Sizing:     w-full md:w-1/2, h-64 md:h-80
Spacing:    p-4 md:p-8, gap-3 md:gap-6
Typography: text-base md:text-lg lg:text-xl
Alignment:  text-center md:text-left
```

## Quick Reference

**Mobile-First Process:**
```
1. Design for mobile (375px)
2. Add tablet styles (sm:, 640px+)
3. Add laptop styles (md:, 768px+)
4. Add desktop styles (lg:, 1024px+)
5. Test all breakpoints
```

**Breakpoints:**
```
Base:    0px - 639px    (mobile)
sm:      640px+         (tablet)
md:      768px+         (laptop)
lg:      1024px+        (desktop)
xl:      1280px+        (large desktop)
```

**Touch Targets:**
```
Minimum: 44px × 44px (mobile)
Spacing: 12px between elements
```

## References

- `references/breakpoints.md` - Breakpoint strategy and testing widths
- `references/common-patterns.md` - 7 responsive patterns with examples
- `references/container-patterns.md` - Full-width and constrained containers
- `references/common-mistakes.md` - What to avoid and how to fix
- `references/utilities-reference.md` - Complete Tailwind utility list

## Related Skills

- `design-tokens` - Use design tokens in components
- `component-design` - Create responsive components
- `frontend-aesthetics` - Visual design principles
