# Adding New Design Tokens

Step-by-step guide for adding new design tokens.

## When to Add New Tokens

**✅ Add a new token when:**
- You need a value used in 3+ places
- It's part of the design system (color, spacing, etc.)
- It should be consistent across components
- You want theme-ability (dark mode, brand variations)

**❌ Don't add a token when:**
- Value is used only once (component-specific)
- It's a one-off calculation
- It's too specific to generalize

---

## Step-by-Step Process

### Step 1: Add to `assets/css/global.css`

**Location**: `/assets/css/global.css`

**Example: Adding a tertiary color**

```css
/* assets/css/global.css */
:root {
  /* Existing tokens... */

  /* Brand Colors */
  --color-primary: #dc2626;
  --color-secondary: #1f2937;

  /* ✨ NEW TOKEN */
  --color-tertiary: #0ea5e9;         /* Sky blue */
  --color-tertiary-light: #38bdf8;   /* Lighter sky blue */
  --color-tertiary-dark: #0369a1;    /* Darker sky blue */
}
```

**Example: Adding a new spacing token**

```css
:root {
  /* Existing spacing... */
  --spacing-32: 8rem;

  /* ✨ NEW TOKEN */
  --spacing-section-large: 10rem;    /* 160px - for extra large sections */
}
```

**Example: Adding a new gradient**

```css
:root {
  /* Existing gradients... */
  --gradient-hero: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);

  /* ✨ NEW TOKEN */
  --gradient-tertiary: linear-gradient(135deg, var(--color-tertiary) 0%, var(--color-tertiary-light) 100%);
}
```

---

### Step 2: Update Tailwind Config (if needed)

**Location**: `tailwind.config.js`

**Only needed if you want Tailwind utility classes for the new token.**

**Example: Adding tertiary color to Tailwind**

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',

        // ✨ NEW TOKEN
        tertiary: 'var(--color-tertiary)',
        'tertiary-light': 'var(--color-tertiary-light)',
        'tertiary-dark': 'var(--color-tertiary-dark)'
      }
    }
  }
}
```

**Now you can use:**
```vue
<div class="bg-tertiary text-white">Tertiary Background</div>
<button class="bg-tertiary hover:bg-tertiary-dark">Button</button>
```

**Example: Adding semantic spacing to Tailwind**

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      spacing: {
        // Existing spacing...

        // ✨ NEW TOKEN
        'section-lg': 'var(--spacing-section-large)'
      }
    }
  }
}
```

**Now you can use:**
```vue
<section class="py-section-lg">Extra Large Section</section>
```

---

### Step 3: Document the Token

**Add to this skill's documentation:**

Update `references/token-catalog.md` with:
- Token name
- Value
- Purpose/usage
- Examples

**Example:**

```markdown
### Tertiary Color

```css
--color-tertiary: #0ea5e9;         /* Sky blue - for info/secondary actions */
--color-tertiary-light: #38bdf8;   /* Lighter variant */
--color-tertiary-dark: #0369a1;    /* Darker variant */
```

**Usage:**
```vue
<div :style="{ backgroundColor: 'var(--color-tertiary)' }">Info Box</div>
<div class="bg-tertiary">Info Box</div>
```

**When to use:** Secondary actions, info states, alternative CTAs
```

---

### Step 4: Restart Dev Server

Design token changes require server restart:

```bash
# Stop dev server (Ctrl+C)
# Restart
yarn dev
```

---

### Step 5: Use in Components

**Using with inline styles:**
```vue
<template>
  <div :style="{
    backgroundColor: 'var(--color-tertiary)',
    padding: 'var(--spacing-section-large)'
  }">
    Content
  </div>
</template>
```

**Using with Tailwind:**
```vue
<template>
  <div class="bg-tertiary py-section-lg">
    Content
  </div>
</template>
```

**Using in custom CSS:**
```vue
<style scoped>
.info-box {
  background-color: var(--color-tertiary);
  padding: var(--spacing-section-large);
  border-radius: var(--border-radius-lg);
}
</style>
```

---

## Real-World Examples

### Example 1: Adding a Success Color Variant

**Problem**: Need success-light and success-dark variants

**Step 1: Add to global.css**
```css
:root {
  --color-success: #10b981;

  /* ✨ NEW */
  --color-success-light: #34d399;
  --color-success-dark: #059669;
}
```

**Step 2: Add to tailwind.config.js**
```javascript
colors: {
  success: 'var(--color-success)',
  'success-light': 'var(--color-success-light)',
  'success-dark': 'var(--color-success-dark)'
}
```

**Step 3: Restart server**
```bash
yarn dev
```

**Step 4: Use in component**
```vue
<div class="bg-success-light text-success-dark border-2 border-success">
  Success message!
</div>
```

---

### Example 2: Adding a Compact Spacing Scale

**Problem**: Need smaller spacing for tight layouts

**Step 1: Add to global.css**
```css
:root {
  /* ✨ NEW */
  --spacing-0-5: 0.125rem;   /* 2px */
  --spacing-1-5: 0.375rem;   /* 6px */
  --spacing-2-5: 0.625rem;   /* 10px */
}
```

**Step 2: Add to tailwind.config.js**
```javascript
spacing: {
  0.5: 'var(--spacing-0-5)',
  1.5: 'var(--spacing-1-5)',
  2.5: 'var(--spacing-2-5)'
}
```

**Step 3: Use in component**
```vue
<div class="flex gap-0.5 p-1.5">
  <button class="px-2.5 py-1">Compact Button</button>
</div>
```

---

### Example 3: Adding a Neon Accent

**Problem**: Need neon colors for special promotions

**Step 1: Add to global.css**
```css
:root {
  /* ✨ NEW */
  --color-neon-green: #39ff14;
  --color-neon-pink: #ff10f0;
  --color-neon-blue: #00ffff;

  --gradient-neon: linear-gradient(
    135deg,
    var(--color-neon-green) 0%,
    var(--color-neon-pink) 50%,
    var(--color-neon-blue) 100%
  );
}
```

**Step 2: Add to tailwind.config.js (optional)**
```javascript
colors: {
  'neon-green': 'var(--color-neon-green)',
  'neon-pink': 'var(--color-neon-pink)',
  'neon-blue': 'var(--color-neon-blue)'
}
```

**Step 3: Use in promo banner**
```vue
<div
  class="promo-banner"
  :style="{ backgroundImage: 'var(--gradient-neon)' }"
>
  <h2 class="text-white font-bold text-4xl">
    NEON SPECIAL OFFER!
  </h2>
</div>
```

---

### Example 4: Adding Animation Duration

**Problem**: Need custom animation speeds

**Step 1: Add to global.css**
```css
:root {
  /* ✨ NEW */
  --transition-instant: 50ms ease;
  --transition-ultra-slow: 1000ms ease;
}
```

**Step 2: Use in component**
```vue
<style scoped>
.instant-hover {
  transition: var(--transition-instant);
}

.slow-fade {
  transition: var(--transition-ultra-slow);
}
</style>
```

---

## Token Naming Conventions

**Follow these patterns:**

### Colors
```
--color-{category}-{variant}
--color-primary
--color-primary-light
--color-primary-dark
--color-text-muted
```

### Spacing
```
--spacing-{size}
--spacing-4
--spacing-section
--spacing-card
```

### Typography
```
--font-{purpose}
--text-{size}
--font-display
--text-2xl
```

### Visual Effects
```
--shadow-{size}
--border-radius-{size}
--gradient-{name}
--shadow-lg
--border-radius-xl
--gradient-hero
```

### Layout
```
--{component}-{property}
--container-max-width
--header-height
```

### Z-Index
```
--z-{component}
--z-modal
--z-dropdown
```

---

## Checklist for Adding Tokens

- [ ] Added to `assets/css/global.css`
- [ ] (Optional) Added to `tailwind.config.js`
- [ ] Restarted dev server
- [ ] Documented in `references/token-catalog.md`
- [ ] Used in at least one component
- [ ] Tested in browser (DevTools inspect)
- [ ] Verified token resolves correctly
- [ ] Committed with descriptive message

---

## Common Mistakes

**❌ WRONG: Hardcode the value**
```vue
<div style="background-color: #0ea5e9">
```

**✅ CORRECT: Use the token**
```vue
<div :style="{ backgroundColor: 'var(--color-tertiary)' }">
```

---

**❌ WRONG: Create one-off token**
```css
--button-special-promotion-2024-summer-red: #ff0000;
```

**✅ CORRECT: Use semantic naming**
```css
--color-accent-secondary: #ff0000;
```

---

**❌ WRONG: Skip Tailwind config but use utility**
```vue
<!-- This won't work! -->
<div class="bg-tertiary">
```

**✅ CORRECT: Add to Tailwind config first**
```javascript
// tailwind.config.js
colors: {
  tertiary: 'var(--color-tertiary)'
}
```

---

## Summary

1. **Add to `global.css`** - Define the token
2. **Update `tailwind.config.js`** (optional) - Enable Tailwind utilities
3. **Document** - Update skill documentation
4. **Restart server** - Apply changes
5. **Use in components** - Start using the token

**Result**: New token available across entire codebase, theme-able, and maintainable! 🎨
