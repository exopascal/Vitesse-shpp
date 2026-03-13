# CLAUDE.md - E-Commerce Webshop Builder

This document serves as **persistent context for Claude Code** working on this **multi-tenant e-commerce platform** built with Nuxt 3 + Shopify + Cloudflare Pages.

**Purpose:** High-level architecture guidelines and development best practices. Detailed workflows live in `.claude/skills/`.

---

# PART 1: PROJECT OVERVIEW

## Tech Stack

- **Framework:** Nuxt.js 3 + TypeScript
- **State Management:** Pinia stores
- **Styling:** Tailwind CSS + Design Token System (global.css)
- **E-Commerce:** Shopify Integration
- **Deployment:** Cloudflare Pages (via wrangler.toml)
- **Package Manager:** npm / yarn
- **Multi-Tenancy:** Tenant-based configuration

---

## Project Structure

```
components/
  global/           # Global components (Cart, Header, Footer)
  products/         # Product-related components
  ui/               # Reusable UI components

pages/
  index.vue         # Homepage
  products/
    [id].vue        # Dynamic product pages
  categories/
    [slug].vue      # Category pages

server/
  api/
    sitemap/
      products.ts   # Product sitemap generation
      categories.ts # Category sitemap generation

utils/
  schemas/
    productSchema.ts  # Schema.org helpers (Product, FAQ, Breadcrumb)
  seo/
    recommendations.ts  # SEO recommendation engine

assets/
  css/
    global.css    # Design Token System

.claude/
  skills/         # Development guidelines
    design-tokens/
    responsive-design/
    component-design/
    product-schema/
```

---

# PART 2: DEVELOPMENT PRINCIPLES

## Design Token System

**ALL styling MUST use design tokens from `assets/css/global.css`.**

**Priority Order:**
1. Design Tokens (CSS Custom Properties) → `var(--color-primary)`
2. Tailwind Utilities (Token-Based) → `bg-primary`, `text-lg`
3. Custom CSS (Only if necessary, still use tokens)
4. ❌ NEVER: Hardcoded values (`#3b82f6`, `24px`, `'Inter'`)

**See:** `.claude/skills/design-tokens/` for complete guidelines

---

## Component Architecture

**Principles:**
- **Reusability** - No single-use components
- **Design Tokens First** - Colors, spacing, typography only via tokens
- **Props & Slots** - Flexible variations instead of duplication
- **Mobile-First** - Responsive by default

**Naming Convention:**
- WITHOUT "Base" prefix (e.g., `ProductCard.vue`, not `BaseProductCard.vue`)
- Descriptive names that indicate purpose

**See:** `.claude/skills/component-design/` for architecture patterns

---

## Responsive Design

- **Breakpoints:** Mobile (375px) → Tablet (768px) → Desktop (1440px)
- **Container:** `max-width: var(--container-max-width)` (1200px)
- **Padding:** Responsive via design tokens
- **Testing:** Test at all key breakpoints

**See:** `.claude/skills/responsive-design/` for patterns

---

# PART 3: E-COMMERCE FEATURES

## Schema.org Integration

**Product Pages:**
- `Product` schema with `Offer`
- `AggregateRating` (if reviews available)
- `FAQ` schema (product questions)
- `BreadcrumbList` (navigation)

**Example Usage:**
```typescript
import { createProductSchema, createFAQSchema, schemaToString } from '~/utils/schemas/productSchema'

const productSchema = createProductSchema({
  name: 'Premium Running Shoes',
  price: 129.99,
  availability: 'InStock',
  ratingValue: 4.8,
  ratingCount: 245
})

useHead({
  script: [
    { type: 'application/ld+json', innerHTML: schemaToString(productSchema) }
  ]
})
```

**See:** `.claude/skills/product-schema/` and `utils/schemas/productSchema.ts`

---

## SEO Optimization

**Meta Tags (Required):**
- `title`: Product/Category name + Brand (50-60 chars)
- `description`: Compelling description with CTA (150-160 chars)
- `og:image`: High-quality product image

**Sitemap:**
- Automatically generated for `/products/**` and `/categories/**`
- Dynamic fetching from Shopify
- Updated on product changes

**Internal Linking:**
- Link related products
- Category → Products
- Use SEO recommendation engine (`utils/seo/recommendations.ts`)

---

## Multi-Tenancy

**Configuration:**
- `TENANT_ID` environment variable
- Tenant-specific branding
- Separate Shopify stores per tenant

**Runtime Config:**
```typescript
const config = useRuntimeConfig()
const tenantId = config.public.tenantId  // 'default', 'tenant2', etc.
```

---

# PART 4: DEVELOPMENT WORKFLOW

## Adding New Features

1. **Check Existing Components** - Reuse before creating
2. **Use Design Tokens** - No hardcoded values
3. **Add Schema.org** - For product/category pages
4. **Test Responsiveness** - Mobile, tablet, desktop
5. **Update Sitemap** - If adding new page types
6. **Verify SEO** - Meta tags, structured data

---

## Code Review Checklist

**Before Committing:**
- ✅ Uses design tokens (no hardcoded values)
- ✅ Reuses existing components when possible
- ✅ Tailwind utility-first approach
- ✅ Responsive & accessible
- ✅ Schema.org markup for products
- ✅ TypeScript errors resolved
- ✅ E2E tests pass (Playwright)

**See:** `.claude/skills/quality-gates.md` (if available)

---

## Testing

```bash
# Development server
npm run dev

# Build for production
npm run build

# Run E2E tests
npx playwright test

# Preview production build
npm run preview
```

---

# PART 5: DEPLOYMENT

## Cloudflare Pages

**Configuration:** `wrangler.toml`

**Build Command:**
```bash
npm run build
```

**Output Directory:** `dist/`

**Environment Variables:**
- `TENANT_ID`
- `SHOPIFY_DOMAIN`
- `SHOPIFY_ACCESS_TOKEN`
- `NUXT_PUBLIC_SITE_URL`

**Route Rules:**
- `/products/**` - SSR with caching (5 min)
- `/categories/**` - SSR with caching (5 min)
- `/api/**` - CORS enabled, short cache (1 min)

---

# PART 6: KEY FILES

**Configuration:**
- `nuxt.config.ts` - Nuxt + Cloudflare + Sitemap config
- `wrangler.toml` - Cloudflare deployment
- `tailwind.config.js` - Design token integration
- `.env.example` - Environment variables template

**Design System:**
- `assets/css/global.css` - Design tokens
- `.claude/skills/design-tokens/` - Token usage guidelines

**E-Commerce:**
- `utils/schemas/productSchema.ts` - Schema.org helpers
- `server/api/sitemap/products.ts` - Product sitemap
- `server/api/sitemap/categories.ts` - Category sitemap

**SEO:**
- `utils/seo/recommendations.ts` - SEO recommendation engine

---

# PART 7: QUICK REFERENCE

## Design Tokens

**Colors:**
```css
var(--color-brand-primary)
var(--color-text-primary)
var(--color-bg-primary)
```

**Tailwind Classes:**
```html
<div class="bg-brand text-heading p-6 rounded-xl shadow-md">
```

**Typography:**
```css
var(--font-display)    /* Headlines */
var(--font-body)       /* Body text */
```

**Spacing:**
```css
var(--spacing-xl)      /* 2rem / 32px */
var(--spacing-section) /* Section padding */
```

---

## Schema.org Quick Start

```typescript
// Product with ratings
const schema = createProductSchema({
  name: product.title,
  description: product.description,
  image: product.images,
  price: product.price,
  availability: 'InStock',
  ratingValue: 4.8,
  ratingCount: 245
})

// FAQ for product questions
const faqSchema = createFAQSchema([
  { question: 'Is this waterproof?', answer: 'Yes...' }
])

// Breadcrumb navigation
const breadcrumbSchema = createBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Products', url: '/products' }
])

// Add to page
useHead({
  script: [
    { type: 'application/ld+json', innerHTML: schemaToString(schema) },
    { type: 'application/ld+json', innerHTML: schemaToString(faqSchema) }
  ]
})
```

---

## Common Tasks

**Add new product page:**
1. Create `/pages/products/[id].vue`
2. Fetch product from Shopify
3. Add Schema.org markup
4. Update sitemap (automatic via `/api/sitemap/products`)

**Add new category:**
1. Create `/pages/categories/[slug].vue`
2. Fetch category from Shopify
3. Add breadcrumb schema
4. Update sitemap (automatic via `/api/sitemap/categories`)

**Update design tokens:**
1. Edit `assets/css/global.css`
2. Update `tailwind.config.js` if needed
3. Test across all components

---

**For detailed workflows, patterns, and step-by-step guides, see `.claude/skills/` directory.**
