# Tailwind Integration

How Tailwind CSS integrates with design tokens.

## Configuration

**File**: `tailwind.config.js`

```javascript
module.exports = {
  content: [
    './components/**/*.{vue,js,ts}',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {
      // Colors reference design tokens
      colors: {
        primary: 'var(--color-primary)',
        'primary-light': 'var(--color-primary-light)',
        'primary-dark': 'var(--color-primary-dark)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        'accent-hover': 'var(--color-accent-hover)',

        // Semantic colors
        text: 'var(--color-text)',
        'text-muted': 'var(--color-text-muted)',
        'text-inverse': 'var(--color-text-inverse)',
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        border: 'var(--color-border)',

        // State colors
        error: 'var(--color-error)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        info: 'var(--color-info)'
      },

      // Typography
      fontFamily: {
        display: 'var(--font-display)',
        body: 'var(--font-body)',
        mono: 'var(--font-mono)'
      },

      fontSize: {
        // Maps to --text-* tokens
        xs: 'var(--text-xs)',
        sm: 'var(--text-sm)',
        base: 'var(--text-base)',
        lg: 'var(--text-lg)',
        xl: 'var(--text-xl)',
        '2xl': 'var(--text-2xl)',
        '3xl': 'var(--text-3xl)',
        '4xl': 'var(--text-4xl)',
        '5xl': 'var(--text-5xl)',
        '6xl': 'var(--text-6xl)',
        '7xl': 'var(--text-7xl)'
      },

      fontWeight: {
        thin: 'var(--font-thin)',
        extralight: 'var(--font-extralight)',
        light: 'var(--font-light)',
        normal: 'var(--font-normal)',
        medium: 'var(--font-medium)',
        semibold: 'var(--font-semibold)',
        bold: 'var(--font-bold)',
        extrabold: 'var(--font-extrabold)',
        black: 'var(--font-black)'
      },

      lineHeight: {
        none: 'var(--leading-none)',
        tight: 'var(--leading-tight)',
        snug: 'var(--leading-snug)',
        normal: 'var(--leading-normal)',
        relaxed: 'var(--leading-relaxed)',
        loose: 'var(--leading-loose)'
      },

      // Spacing references --spacing-* tokens
      spacing: {
        0: 'var(--spacing-0)',
        px: 'var(--spacing-px)',
        0.5: 'var(--spacing-0-5)',
        1: 'var(--spacing-1)',
        1.5: 'var(--spacing-1-5)',
        2: 'var(--spacing-2)',
        2.5: 'var(--spacing-2-5)',
        3: 'var(--spacing-3)',
        3.5: 'var(--spacing-3-5)',
        4: 'var(--spacing-4)',
        5: 'var(--spacing-5)',
        6: 'var(--spacing-6)',
        7: 'var(--spacing-7)',
        8: 'var(--spacing-8)',
        9: 'var(--spacing-9)',
        10: 'var(--spacing-10)',
        11: 'var(--spacing-11)',
        12: 'var(--spacing-12)',
        14: 'var(--spacing-14)',
        16: 'var(--spacing-16)',
        20: 'var(--spacing-20)',
        24: 'var(--spacing-24)',
        28: 'var(--spacing-28)',
        32: 'var(--spacing-32)',
        36: 'var(--spacing-36)',
        40: 'var(--spacing-40)',
        44: 'var(--spacing-44)',
        48: 'var(--spacing-48)',
        52: 'var(--spacing-52)',
        56: 'var(--spacing-56)',
        60: 'var(--spacing-60)',
        64: 'var(--spacing-64)',
        72: 'var(--spacing-72)',
        80: 'var(--spacing-80)',
        96: 'var(--spacing-96)',

        // Semantic spacing
        section: 'var(--spacing-section)',
        container: 'var(--spacing-container)',
        card: 'var(--spacing-card)'
      },

      // Border radius
      borderRadius: {
        none: 'var(--border-radius-none)',
        sm: 'var(--border-radius-sm)',
        DEFAULT: 'var(--border-radius-md)',
        md: 'var(--border-radius-md)',
        lg: 'var(--border-radius-lg)',
        xl: 'var(--border-radius-xl)',
        '2xl': 'var(--border-radius-2xl)',
        '3xl': 'var(--border-radius-3xl)',
        full: 'var(--border-radius-full)'
      },

      // Box shadows
      boxShadow: {
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow-md)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
        inner: 'var(--shadow-inner)',
        none: 'var(--shadow-none)'
      },

      // Transitions
      transitionDuration: {
        fast: '150ms',
        normal: '300ms',
        slow: '500ms'
      },

      // Z-index
      zIndex: {
        base: '0',
        dropdown: '1000',
        sticky: '1020',
        fixed: '1030',
        'modal-backdrop': '1040',
        modal: '1050',
        popover: '1060',
        tooltip: '1070'
      }
    }
  },
  plugins: []
}
```

---

## How It Works

### Color Example

**In `global.css`:**
```css
:root {
  --color-primary: #dc2626;
}
```

**In `tailwind.config.js`:**
```javascript
colors: {
  primary: 'var(--color-primary)'
}
```

**In component:**
```vue
<div class="bg-primary text-white">
  Content
</div>
```

**Compiled CSS:**
```css
.bg-primary {
  background-color: var(--color-primary); /* → #dc2626 */
}

.text-white {
  color: #ffffff;
}
```

---

## Utility Class Mapping

### Colors

| Tailwind Class | Design Token | Value |
|----------------|--------------|-------|
| `bg-primary` | `var(--color-primary)` | `#dc2626` |
| `text-accent` | `var(--color-accent)` | `#ef4444` |
| `border-border` | `var(--color-border)` | `#e5e7eb` |
| `text-muted` | `var(--color-text-muted)` | `#6b7280` |

### Spacing

| Tailwind Class | Design Token | Value |
|----------------|--------------|-------|
| `p-4` | `var(--spacing-4)` | `1rem` (16px) |
| `mt-6` | `var(--spacing-6)` | `1.5rem` (24px) |
| `gap-8` | `var(--spacing-8)` | `2rem` (32px) |
| `mb-12` | `var(--spacing-12)` | `3rem` (48px) |

### Typography

| Tailwind Class | Design Token | Value |
|----------------|--------------|-------|
| `font-display` | `var(--font-display)` | `'Outfit', sans-serif` |
| `text-2xl` | `var(--text-2xl)` | `1.5rem` (24px) |
| `font-bold` | `var(--font-bold)` | `700` |
| `leading-tight` | `var(--leading-tight)` | `1.25` |

### Visual Effects

| Tailwind Class | Design Token | Value |
|----------------|--------------|-------|
| `rounded-lg` | `var(--border-radius-lg)` | `0.5rem` (8px) |
| `shadow-md` | `var(--shadow-md)` | `0 4px 6px...` |

---

## Equivalence Examples

**These are IDENTICAL:**

### Example 1: Button
```vue
<!-- Tailwind utilities -->
<button class="bg-accent text-white px-6 py-3 rounded-lg shadow-md">
  Click Me
</button>

<!-- Inline styles with tokens -->
<button :style="{
  backgroundColor: 'var(--color-accent)',
  color: 'var(--color-text-inverse)',
  paddingLeft: 'var(--spacing-6)',
  paddingRight: 'var(--spacing-6)',
  paddingTop: 'var(--spacing-3)',
  paddingBottom: 'var(--spacing-3)',
  borderRadius: 'var(--border-radius-lg)',
  boxShadow: 'var(--shadow-md)'
}">
  Click Me
</button>
```

### Example 2: Card
```vue
<!-- Tailwind utilities -->
<div class="bg-surface p-6 rounded-xl shadow-md border border-border">
  Card Content
</div>

<!-- Inline styles with tokens -->
<div :style="{
  backgroundColor: 'var(--color-surface)',
  padding: 'var(--spacing-6)',
  borderRadius: 'var(--border-radius-xl)',
  boxShadow: 'var(--shadow-md)',
  border: '1px solid var(--color-border)'
}">
  Card Content
</div>
```

---

## Custom Utility Classes

You can create custom utility classes in `global.css`:

```css
/* assets/css/global.css */

/* Button utilities */
.btn-primary {
  @apply bg-accent text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-normal;
}

.btn-primary:hover {
  @apply bg-accent-hover shadow-lg;
}

.btn-secondary {
  @apply bg-transparent text-accent border-2 border-accent px-6 py-3 rounded-lg font-semibold transition-normal;
}

.btn-secondary:hover {
  @apply bg-accent text-white;
}

/* Card utilities */
.card {
  @apply bg-surface p-6 rounded-xl shadow-md border border-border;
}

/* Section utilities */
.section {
  @apply py-section px-4 md:px-8;
}

/* Container utilities */
.container-custom {
  @apply mx-auto px-4 md:px-8;
  max-width: var(--container-max-width);
}
```

**Usage:**
```vue
<button class="btn-primary">Primary Button</button>
<button class="btn-secondary">Secondary Button</button>
<div class="card">Card Content</div>
<section class="section">Section Content</section>
```

---

## Responsive Design with Tokens

Tailwind breakpoints work seamlessly with tokens:

```vue
<div class="
  bg-primary
  text-white
  p-4          /* Mobile: 16px */
  md:p-8       /* Laptop: 32px */
  lg:p-12      /* Desktop: 48px */
  text-base    /* Mobile: 16px */
  md:text-lg   /* Laptop: 18px */
  lg:text-xl   /* Desktop: 20px */
  rounded-lg
  shadow-md
  hover:shadow-lg
">
  Responsive Content
</div>
```

**Breakpoints:**
```javascript
// tailwind.config.js (default)
screens: {
  sm: '640px',   // Tablet
  md: '768px',   // Laptop
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large Desktop
  '2xl': '1536px' // Extra Large
}
```

---

## State Variants with Tokens

Tailwind state variants work with token-based utilities:

```vue
<button class="
  bg-accent
  text-white
  hover:bg-accent-hover
  focus:ring-4
  focus:ring-accent
  focus:ring-opacity-50
  active:bg-primary-dark
  disabled:bg-gray-300
  disabled:cursor-not-allowed
">
  Button
</button>
```

---

## Debugging Token Resolution

**Check computed styles in DevTools:**

```html
<div class="bg-primary">Content</div>
```

**Computed CSS:**
```css
.bg-primary {
  background-color: var(--color-primary); /* Inspect → #dc2626 */
}
```

**If token is undefined:**
- Check `global.css` has the token defined
- Check `tailwind.config.js` maps to the token
- Restart dev server (`yarn dev`)

---

## Advantages of Token-Based Tailwind

1. **Single Source of Truth**: Change `--color-primary` once, updates everywhere
2. **Theme Switching**: Easy to implement dark mode or brand variations
3. **Consistency**: All utilities reference the same token values
4. **Maintainability**: Update design system without touching component code
5. **Type Safety**: Tailwind autocomplete works with custom token names

---

## Best Practices

**✅ DO:**
- Use Tailwind utilities for most styling (preferred)
- Use `:style` with tokens for dynamic values
- Create custom utilities for repeated patterns
- Use responsive utilities (sm:, md:, lg:)
- Use state variants (hover:, focus:, active:)

**❌ DON'T:**
- Use arbitrary values (`bg-[#3b82f6]`, `p-[24px]`)
- Hardcode colors or spacing
- Create unnecessary custom utilities (use built-in when possible)
- Override Tailwind defaults without good reason

---

## Summary

**Tailwind utilities** → Reference **design tokens** → Defined in **global.css**

```
Component Code:
  <div class="bg-primary">

↓ (Tailwind Config)

CSS Variable:
  background-color: var(--color-primary);

↓ (global.css)

Final Value:
  background-color: #dc2626;
```

**All styling methods use the same tokens = perfect consistency!** 🎨
