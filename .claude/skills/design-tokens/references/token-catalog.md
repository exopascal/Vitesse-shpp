# Complete Token Catalog

All available design tokens with values and usage.

## Colors

### Brand Colors

```css
--color-primary: #dc2626;         /* Main brand red */
--color-primary-light: #ef4444;   /* Lighter red variant */
--color-primary-dark: #991b1b;    /* Darker red variant */

--color-secondary: #1f2937;       /* Dark gray */
--color-secondary-light: #374151; /* Medium gray */
--color-secondary-dark: #111827;  /* Very dark gray */

--color-accent: #ef4444;          /* Accent/CTA red */
--color-accent-hover: #dc2626;    /* Accent hover state */
```

**Usage:**
```vue
<div class="bg-primary text-white">Primary</div>
<button class="bg-accent hover:bg-accent-hover">Click Me</button>
```

### Semantic Colors

```css
/* Text Colors */
--color-text: #111827;            /* Primary body text (dark) */
--color-text-muted: #6b7280;      /* Secondary text (gray) */
--color-text-inverse: #ffffff;    /* Text on dark backgrounds */

/* Background Colors */
--color-bg: #ffffff;              /* Page background */
--color-surface: #f9fafb;         /* Card/panel backgrounds */
--color-border: #e5e7eb;          /* Border color */

/* State Colors */
--color-error: #dc2626;           /* Error state (red) */
--color-success: #10b981;         /* Success state (green) */
--color-warning: #f59e0b;         /* Warning state (amber) */
--color-info: #3b82f6;            /* Info state (blue) */
```

**Usage:**
```vue
<p class="text-muted">Secondary text</p>
<div class="bg-surface border border-border">Card</div>
<span class="text-error">Error message</span>
<span class="text-success">Success!</span>
```

### Gradients

```css
--gradient-hero: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
--gradient-accent: linear-gradient(90deg, var(--color-accent) 0%, var(--color-primary-light) 100%);
--gradient-dark: linear-gradient(180deg, var(--color-secondary-dark) 0%, var(--color-secondary) 100%);
```

**Usage:**
```vue
<div :style="{ backgroundImage: 'var(--gradient-hero)' }">Hero</div>
```

---

## Typography

### Font Families

```css
--font-display: 'Outfit', sans-serif;           /* Headlines, hero text */
--font-body: 'Plus Jakarta Sans', sans-serif;   /* Body text, paragraphs */
--font-mono: 'JetBrains Mono', monospace;       /* Code, stats */
```

**Usage:**
```vue
<h1 class="font-display">Headline</h1>
<p class="font-body">Body text</p>
<code class="font-mono">console.log('Hello')</code>
```

### Font Sizes

```css
--text-xs: 0.75rem;     /* 12px */
--text-sm: 0.875rem;    /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg: 1.125rem;    /* 18px */
--text-xl: 1.25rem;     /* 20px */
--text-2xl: 1.5rem;     /* 24px */
--text-3xl: 1.875rem;   /* 30px */
--text-4xl: 2.25rem;    /* 36px */
--text-5xl: 3rem;       /* 48px */
--text-6xl: 3.75rem;    /* 60px */
--text-7xl: 4.5rem;     /* 72px */
```

**Usage:**
```vue
<h1 class="text-6xl">Main Headline</h1>
<h2 class="text-4xl">Section Headline</h2>
<p class="text-base">Body text</p>
<small class="text-sm">Caption</small>
```

### Font Weights

```css
--font-thin: 100;
--font-extralight: 200;
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
--font-black: 900;
```

**Usage:**
```vue
<h1 class="font-bold">Bold Headline</h1>
<p class="font-normal">Normal text</p>
<span class="font-semibold">Emphasized</span>
```

### Line Heights

```css
--leading-none: 1;         /* Tight, for headlines */
--leading-tight: 1.25;     /* Headlines, display text */
--leading-snug: 1.375;     /* Tight body text */
--leading-normal: 1.5;     /* Body text (recommended) */
--leading-relaxed: 1.625;  /* Comfortable reading */
--leading-loose: 2;        /* Very spacious */
```

**Usage:**
```vue
<h1 class="leading-tight">Tight Headline</h1>
<p class="leading-normal">Body paragraph</p>
<p class="leading-relaxed">Comfortable reading</p>
```

---

## Spacing

### Spacing Scale

```css
--spacing-0: 0;           /* 0 */
--spacing-px: 1px;        /* 1px */
--spacing-0-5: 0.125rem;  /* 2px */
--spacing-1: 0.25rem;     /* 4px */
--spacing-1-5: 0.375rem;  /* 6px */
--spacing-2: 0.5rem;      /* 8px */
--spacing-2-5: 0.625rem;  /* 10px */
--spacing-3: 0.75rem;     /* 12px */
--spacing-3-5: 0.875rem;  /* 14px */
--spacing-4: 1rem;        /* 16px */
--spacing-5: 1.25rem;     /* 20px */
--spacing-6: 1.5rem;      /* 24px */
--spacing-7: 1.75rem;     /* 28px */
--spacing-8: 2rem;        /* 32px */
--spacing-9: 2.25rem;     /* 36px */
--spacing-10: 2.5rem;     /* 40px */
--spacing-11: 2.75rem;    /* 44px */
--spacing-12: 3rem;       /* 48px */
--spacing-14: 3.5rem;     /* 56px */
--spacing-16: 4rem;       /* 64px */
--spacing-20: 5rem;       /* 80px */
--spacing-24: 6rem;       /* 96px */
--spacing-28: 7rem;       /* 112px */
--spacing-32: 8rem;       /* 128px */
--spacing-36: 9rem;       /* 144px */
--spacing-40: 10rem;      /* 160px */
--spacing-44: 11rem;      /* 176px */
--spacing-48: 12rem;      /* 192px */
--spacing-52: 13rem;      /* 208px */
--spacing-56: 14rem;      /* 224px */
--spacing-60: 15rem;      /* 240px */
--spacing-64: 16rem;      /* 256px */
--spacing-72: 18rem;      /* 288px */
--spacing-80: 20rem;      /* 320px */
--spacing-96: 24rem;      /* 384px */
```

**Usage:**
```vue
<div class="p-6">Padding 24px</div>
<div class="mt-8">Margin-top 32px</div>
<div class="gap-4">Gap 16px</div>
```

### Semantic Spacing

```css
--spacing-section: 5rem;      /* Section padding (80px) */
--spacing-container: 2rem;    /* Container padding (32px) */
--spacing-card: 1.5rem;       /* Card padding (24px) */
```

**Usage:**
```vue
<section :style="{ padding: 'var(--spacing-section) 0' }">Section</section>
<div :style="{ padding: 'var(--spacing-card)' }">Card</div>
```

---

## Shadows

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
--shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
--shadow-none: none;
```

**Usage:**
```vue
<div class="shadow-md">Medium shadow</div>
<div class="shadow-lg hover:shadow-xl">Hover effect</div>
```

---

## Border Radius

```css
--border-radius-none: 0;
--border-radius-sm: 0.125rem;    /* 2px */
--border-radius-md: 0.375rem;    /* 6px */
--border-radius-lg: 0.5rem;      /* 8px */
--border-radius-xl: 0.75rem;     /* 12px */
--border-radius-2xl: 1rem;       /* 16px */
--border-radius-3xl: 1.5rem;     /* 24px */
--border-radius-full: 9999px;    /* Circular */
```

**Usage:**
```vue
<div class="rounded-lg">8px radius</div>
<button class="rounded-full">Circular button</button>
<img class="rounded-xl" src="..." alt="...">
```

---

## Transitions

```css
--transition-fast: 150ms ease;     /* Quick transitions */
--transition-normal: 300ms ease;   /* Standard transitions */
--transition-slow: 500ms ease;     /* Slow, dramatic transitions */
```

**Usage:**
```vue
<button class="transition-normal hover:bg-accent-hover">Hover me</button>
<div :style="{ transition: 'var(--transition-slow)' }">Slow fade</div>
```

---

## Layout

```css
--container-max-width: 1200px;   /* Max content width */
--header-height: 64px;           /* Header/navbar height */
--footer-height: 80px;           /* Footer height */
```

**Usage:**
```vue
<div class="container mx-auto" :style="{ maxWidth: 'var(--container-max-width)' }">
  Content
</div>
```

---

## Z-Index

```css
--z-base: 0;
--z-dropdown: 1000;
--z-sticky: 1020;
--z-fixed: 1030;
--z-modal-backdrop: 1040;
--z-modal: 1050;
--z-popover: 1060;
--z-tooltip: 1070;
```

**Usage:**
```vue
<div class="fixed" :style="{ zIndex: 'var(--z-sticky)' }">Sticky Header</div>
<div class="modal" :style="{ zIndex: 'var(--z-modal)' }">Modal</div>
```

---

## Breakpoints (Tailwind)

```css
/* Not CSS variables, but important for responsive design */
sm: 640px   /* Tablet */
md: 768px   /* Laptop */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large Desktop */
2xl: 1536px /* Extra Large */
```

**Usage:**
```vue
<div class="text-base md:text-lg lg:text-xl">Responsive text</div>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">Grid</div>
```

---

## Quick Lookup Table

| Category | Token Prefix | Example | Value |
|----------|--------------|---------|-------|
| Colors | `--color-*` | `--color-primary` | `#dc2626` |
| Typography | `--font-*, --text-*` | `--font-display`, `--text-2xl` | `'Outfit'`, `1.5rem` |
| Spacing | `--spacing-*` | `--spacing-6` | `1.5rem` (24px) |
| Shadows | `--shadow-*` | `--shadow-md` | `0 4px 6px...` |
| Radius | `--border-radius-*` | `--border-radius-lg` | `0.5rem` (8px) |
| Transitions | `--transition-*` | `--transition-normal` | `300ms ease` |
| Layout | `--container-*, --header-*` | `--container-max-width` | `1200px` |
| Z-Index | `--z-*` | `--z-modal` | `1050` |

---

## Finding the Right Token

**Need a color?**
- Brand: `--color-primary`, `--color-accent`
- Text: `--color-text`, `--color-text-muted`
- Background: `--color-bg`, `--color-surface`
- State: `--color-error`, `--color-success`

**Need spacing?**
- Small: `--spacing-2` (8px), `--spacing-4` (16px)
- Medium: `--spacing-6` (24px), `--spacing-8` (32px)
- Large: `--spacing-12` (48px), `--spacing-16` (64px)
- Semantic: `--spacing-section`, `--spacing-card`

**Need typography?**
- Headline: `--font-display`, `--text-6xl`, `--font-bold`
- Body: `--font-body`, `--text-base`, `--font-normal`
- Caption: `--font-body`, `--text-sm`, `--font-normal`

**Can't find a token?**
→ See `adding-tokens.md` for how to add new tokens
