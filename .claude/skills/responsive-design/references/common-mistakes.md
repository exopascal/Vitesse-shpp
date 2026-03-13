# Common Mistakes

What to avoid and how to fix responsive design issues.

## Mistake 1: Desktop-First Approach

```vue
<!-- ❌ WRONG: Starts with desktop layout -->
<div class="grid-cols-4 md:grid-cols-1">
  <!-- This is backwards! Mobile gets 4 columns (breaks layout) -->
</div>

<!-- ✅ CORRECT: Mobile-first -->
<div class="grid-cols-1 md:grid-cols-4">
  <!-- Mobile gets 1 column, desktop gets 4 -->
</div>
```

## Mistake 2: Fixed Widths

```vue
<!-- ❌ WRONG: Fixed pixel width breaks responsiveness -->
<div style="width: 1200px">
  <!-- Will cause horizontal scroll on mobile! -->
</div>

<div class="w-[1200px]">
  <!-- Same problem with Tailwind arbitrary value -->
</div>

<!-- ✅ CORRECT: Use max-width with responsive padding -->
<div class="max-w-7xl mx-auto px-4 md:px-8">
  <!-- Adapts to screen size, never overflows -->
</div>
```

## Mistake 3: Tiny Touch Targets on Mobile

```vue
<!-- ❌ WRONG: Too small for mobile (< 44px) -->
<button class="px-2 py-1 text-xs">
  Click
</button>

<!-- ✅ CORRECT: 44px minimum (iOS guideline) -->
<button class="px-6 py-3 text-base min-h-[44px]">
  Click Me
</button>
```

## Mistake 4: No Responsive Padding

```vue
<!-- ❌ WRONG: Same padding on all screens -->
<div class="p-8">
  <!-- Too much padding on mobile (wastes space) -->
</div>

<!-- ✅ CORRECT: Smaller padding on mobile -->
<div class="p-4 md:p-8">
  <!-- 1rem on mobile, 2rem on desktop -->
</div>
```

## Mistake 5: Text Too Small on Mobile

```vue
<!-- ❌ WRONG: 12px text is hard to read on mobile -->
<p class="text-xs">
  This text is too small for mobile screens.
</p>

<!-- ✅ CORRECT: Minimum 14px (text-sm) on mobile -->
<p class="text-sm md:text-base">
  Readable on mobile, slightly larger on desktop.
</p>
```

## Mistake 6: No Responsive Images

```vue
<!-- ❌ WRONG: Fixed height breaks on different screens -->
<img src="..." alt="..." class="h-96">

<!-- ✅ CORRECT: Responsive height with max constraints -->
<img
  src="..." 
  alt="..." 
  class="
    w-full 
    h-auto 
    max-h-[300px] 
    md:max-h-[400px]
    object-cover
  "
>
```

## Mistake 7: Ignoring Touch Spacing

```vue
<!-- ❌ WRONG: Buttons too close on mobile -->
<div class="flex gap-1">
  <button>Action 1</button>
  <button>Action 2</button>
</div>

<!-- ✅ CORRECT: Adequate spacing (12px minimum) -->
<div class="flex flex-col gap-3 sm:flex-row sm:gap-4">
  <button>Action 1</button>
  <button>Action 2</button>
</div>
```

## Mistake 8: Not Testing at Key Breakpoints

```vue
<!-- ⚠️ PROBLEM: Only testing at 1920px -->
<!-- Mobile users see broken layout! -->

<!-- ✅ SOLUTION: Test at minimum 375px, 768px, 1440px -->
<!-- Better: Test at 360px, 375px, 414px, 768px, 1024px, 1366px, 1920px -->
```

## Quick Fix Checklist

- [ ] Start with mobile styles (no prefix)
- [ ] Add responsive prefixes for larger screens (md:, lg:)
- [ ] Use `max-w-*` instead of fixed widths
- [ ] Ensure touch targets >= 44px on mobile
- [ ] Use responsive padding (p-4 md:p-8)
- [ ] Keep text >= 14px (text-sm) on mobile
- [ ] Images use `w-full h-auto`
- [ ] Adequate spacing between interactive elements (12px+)
- [ ] Test at 375px, 768px, 1440px minimum
