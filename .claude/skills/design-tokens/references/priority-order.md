# Styling Priority Order

Detailed explanation of the mandatory styling priority.

## The Hierarchy

```
1. Design Tokens (CSS Custom Properties) ← HIGHEST PRIORITY
   ↓
2. Tailwind Utilities (Token-Based)
   ↓
3. Custom CSS (Token-Based, Rare)
   ↓
❌ NEVER: Hardcoded Values ← FORBIDDEN
```

---

## Level 1: Design Tokens (Highest Priority)

**What**: CSS Custom Properties defined in `assets/css/global.css`

**When to use**: Whenever possible, especially for:
- Dynamic styles (`:style` bindings)
- Complex calculations
- Gradients and special effects
- Component-specific overrides

**Examples:**
```vue
<template>
  <!-- ✅ CORRECT: Direct token usage -->
  <div :style="{
    color: 'var(--color-primary)',
    padding: 'var(--spacing-6)',
    fontFamily: 'var(--font-display)',
    fontSize: 'var(--text-2xl)',
    backgroundColor: 'var(--color-surface)',
    borderRadius: 'var(--border-radius-lg)',
    boxShadow: 'var(--shadow-md)',
    transition: 'var(--transition-normal)'
  }">
    Content
  </div>

  <!-- ✅ CORRECT: Gradient tokens -->
  <div :style="{ backgroundImage: 'var(--gradient-hero)' }">
    Hero Content
  </div>

  <!-- ✅ CORRECT: Semantic spacing -->
  <section :style="{
    padding: 'var(--spacing-section) 0',
    maxWidth: 'var(--container-max-width)'
  }">
    Section Content
  </section>
</template>

<style scoped>
/* ✅ CORRECT: Tokens in custom CSS */
.custom-button {
  background-color: var(--color-accent);
  color: var(--color-text-inverse);
  padding: var(--spacing-3) var(--spacing-6);
  border-radius: var(--border-radius-lg);
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  transition: var(--transition-normal);
  box-shadow: var(--shadow-md);
}

.custom-button:hover {
  background-color: var(--color-accent-hover);
  box-shadow: var(--shadow-lg);
}
</style>
```

**Why highest priority?**
- Single source of truth
- Easy theme changes (update once, applies everywhere)
- Explicit and traceable
- Works across all styling methods

---

## Level 2: Tailwind Utilities (Token-Based)

**What**: Tailwind CSS utility classes that reference design tokens via `tailwind.config.js`

**When to use**: For most component styling (preferred method)
- Static layouts
- Responsive designs
- Common patterns
- Rapid development

**Examples:**
```vue
<template>
  <!-- ✅ CORRECT: Token-based Tailwind -->
  <div class="
    bg-primary
    text-white
    p-6
    rounded-lg
    shadow-md
    font-display
    text-2xl
    font-bold
    transition-normal
    hover:bg-primary-dark
    hover:shadow-lg
  ">
    Button
  </div>

  <!-- ✅ CORRECT: Responsive with tokens -->
  <div class="
    grid
    grid-cols-1
    md:grid-cols-2
    lg:grid-cols-3
    gap-4
    md:gap-6
    lg:gap-8
    p-4
    md:p-8
    lg:p-12
  ">
    Cards
  </div>

  <!-- ✅ CORRECT: Complex layout with tokens -->
  <section class="
    relative
    w-full
    bg-surface
    border-t
    border-border
    py-section
  ">
    <div class="container mx-auto px-4 md:px-8">
      <h2 class="font-display text-4xl md:text-5xl font-bold mb-6">
        Headline
      </h2>
    </div>
  </section>
</template>
```

**Why second priority?**
- Clean markup (no inline styles)
- Responsive design utilities (sm:, md:, lg:, xl:)
- Pseudo-classes (hover:, focus:, active:)
- Developer-friendly (autocomplete, documentation)

**Behind the scenes:**
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',        // ← References token
        'primary-dark': 'var(--color-primary-dark)',
        accent: 'var(--color-accent)',
        surface: 'var(--color-surface)',
        // ...
      },
      spacing: {
        // '4' → var(--spacing-4) → 1rem
        // '6' → var(--spacing-6) → 1.5rem
        // '8' → var(--spacing-8) → 2rem
      },
      fontSize: {
        // 'text-2xl' → var(--text-2xl) → 1.5rem
      }
    }
  }
}
```

---

## Level 3: Custom CSS (Token-Based, Rare)

**What**: Custom CSS written in `<style>` blocks or external stylesheets

**When to use**: Only when Tailwind can't achieve the effect:
- Complex animations
- Multi-step gradients
- Pseudo-elements (::before, ::after)
- Complex selectors (`:nth-child`, `:has()`)
- Keyframe animations

**IMPORTANT**: Still use design tokens!

**Examples:**
```vue
<style scoped>
/* ✅ CORRECT: Custom CSS with tokens */
.hero-gradient {
  background: linear-gradient(
    135deg,
    var(--color-primary) 0%,
    var(--color-accent) 100%
  );
  padding: var(--spacing-section) 0;
}

/* ✅ CORRECT: Complex animation */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

.animated-button {
  background-color: var(--color-accent);
  padding: var(--spacing-3) var(--spacing-6);
  border-radius: var(--border-radius-lg);
  animation: pulse var(--transition-slow) infinite;
}

/* ✅ CORRECT: Pseudo-elements with tokens */
.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--gradient-accent);
  border-radius: var(--border-radius-md) var(--border-radius-md) 0 0;
}

/* ✅ CORRECT: Complex selectors */
.pricing-grid > .pricing-card:nth-child(2) {
  border: 2px solid var(--color-accent);
  box-shadow: var(--shadow-xl);
  transform: scale(1.05);
}
</style>
```

**Why third priority?**
- Less maintainable (scattered across components)
- No responsive utilities (need media queries)
- More verbose
- Use only when necessary

---

## Level ❌: Hardcoded Values (FORBIDDEN)

**What**: Direct values like `#3b82f6`, `24px`, `'Inter'`

**When to use**: **NEVER**

**Why forbidden?**
- Breaks visual consistency
- Makes theme changes impossible
- Duplicates values (maintenance nightmare)
- No single source of truth
- Violates architecture principles

**Examples of FORBIDDEN code:**
```vue
<!-- ❌ WRONG: Hardcoded color -->
<div style="color: #3b82f6; background-color: #ffffff">

<!-- ❌ WRONG: Hardcoded spacing -->
<div style="padding: 24px; margin-top: 64px">

<!-- ❌ WRONG: Hardcoded font -->
<h1 style="font-family: 'Inter', sans-serif; font-size: 48px">

<!-- ❌ WRONG: Hardcoded shadow -->
<div style="box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1)">

<!-- ❌ WRONG: Arbitrary Tailwind values -->
<div class="text-[#3b82f6] p-[24px] font-['Inter'] text-[48px]">

<!-- ❌ WRONG: Hardcoded in custom CSS -->
<style>
.bad-button {
  background-color: #ff6b6b;
  padding: 16px 32px;
  font-size: 18px;
  border-radius: 8px;
}
</style>
```

---

## Decision Tree

```
Need to style a component?
  │
  ├─→ Simple, static styles + responsive?
  │   YES → Use Tailwind utilities (Level 2)
  │   Example: <div class="bg-primary text-white p-6 rounded-lg">
  │
  ├─→ Dynamic styles (props, computed)?
  │   YES → Use :style with tokens (Level 1)
  │   Example: <div :style="{ color: `var(--color-${variant})` }">
  │
  ├─→ Complex effect (animations, gradients, pseudo-elements)?
  │   YES → Use custom CSS with tokens (Level 3)
  │   Example:
  │   <style>
  │   .gradient { background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%); }
  │   </style>
  │
  └─→ None of the above?
      → STILL use tokens! Find the right token or create a new one.
      → NEVER hardcode values!
```

---

## Mixing Levels (Allowed)

You can mix levels in the same component:

```vue
<template>
  <!-- Level 2: Tailwind utilities -->
  <div class="relative p-6 rounded-lg shadow-md bg-surface">
    <!-- Level 1: Dynamic token -->
    <h2 :style="{ color: `var(--color-${headingColor})` }" class="text-2xl font-bold mb-4">
      {{ title }}
    </h2>

    <!-- Level 2: Tailwind utilities -->
    <p class="text-base text-muted leading-relaxed">
      {{ description }}
    </p>

    <!-- Level 3: Custom animation -->
    <div class="animated-border"></div>
  </div>
</template>

<style scoped>
/* Level 3: Custom CSS with tokens */
@keyframes border-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animated-border {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--color-accent);
  animation: border-pulse var(--transition-slow) infinite;
}
</style>
```

---

## Summary

| Priority | Method | When to Use | Token Usage |
|----------|--------|-------------|-------------|
| **1 (Highest)** | Design Tokens<br>`var(--*)` | Dynamic styles, calculations, gradients | Direct usage |
| **2 (Preferred)** | Tailwind Utilities<br>`bg-primary` | Static layouts, responsive, common patterns | Via config |
| **3 (Rare)** | Custom CSS<br>`<style>` | Complex effects, animations, pseudo-elements | Direct usage |
| **❌ (Forbidden)** | Hardcoded Values<br>`#hex, 24px` | **NEVER** | None (breaks architecture) |

**Golden Rule**: Always use design tokens, regardless of styling method!
