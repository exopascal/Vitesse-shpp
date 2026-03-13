# Code Review Checklist

Complete checklist for reviewing design token usage.

## Quick Checks

- [ ] No hardcoded hex colors (#3b82f6, #ff0000)
- [ ] No hardcoded pixel values (24px, 48px)
- [ ] No hardcoded font names ('Inter', 'Roboto')
- [ ] All colors use `var(--color-*)` or token-based Tailwind
- [ ] All spacing uses `var(--spacing-*)` or token-based Tailwind
- [ ] All typography uses `var(--font-*)`, `var(--text-*)` or Tailwind
- [ ] All shadows use `var(--shadow-*)` or token-based Tailwind
- [ ] All border-radius uses `var(--border-radius-*)` or Tailwind
- [ ] All transitions use `var(--transition-*)` or Tailwind
- [ ] Arbitrary Tailwind values avoided (`text-[48px]`, `bg-[#3b82f6]`)

---

## Detailed Review Categories

### 1. Colors

**❌ FAIL:**
```vue
<!-- Hardcoded hex -->
<div style="color: #3b82f6; background-color: #ffffff">

<!-- Arbitrary Tailwind -->
<div class="text-[#3b82f6] bg-[#ffffff]">

<!-- RGB values -->
<div style="background-color: rgb(59, 130, 246)">

<!-- Named colors -->
<div style="color: blue; background-color: white">
```

**✅ PASS:**
```vue
<!-- Token with :style -->
<div :style="{ color: 'var(--color-primary)', backgroundColor: 'var(--color-surface)' }">

<!-- Tailwind utilities -->
<div class="text-primary bg-surface">

<!-- Custom CSS with tokens -->
<style scoped>
.custom {
  color: var(--color-primary);
  background-color: var(--color-surface);
}
</style>
```

---

### 2. Spacing (Padding, Margin, Gap)

**❌ FAIL:**
```vue
<!-- Hardcoded pixels -->
<div style="padding: 24px; margin-top: 64px">

<!-- Arbitrary Tailwind -->
<div class="p-[24px] mt-[64px]">

<!-- Rem without token -->
<div style="padding: 1.5rem">
```

**✅ PASS:**
```vue
<!-- Token with :style -->
<div :style="{ padding: 'var(--spacing-6)', marginTop: 'var(--spacing-16)' }">

<!-- Tailwind utilities -->
<div class="p-6 mt-16">

<!-- Custom CSS with tokens -->
<style scoped>
.custom {
  padding: var(--spacing-6);
  margin-top: var(--spacing-16);
}
</style>
```

---

### 3. Typography

**❌ FAIL:**
```vue
<!-- Hardcoded font family -->
<h1 style="font-family: 'Inter', sans-serif">

<!-- Hardcoded font size -->
<p style="font-size: 18px">

<!-- Arbitrary Tailwind -->
<h1 class="font-['Inter'] text-[48px]">

<!-- Hardcoded font weight -->
<span style="font-weight: 700">
```

**✅ PASS:**
```vue
<!-- Token with :style -->
<h1 :style="{
  fontFamily: 'var(--font-display)',
  fontSize: 'var(--text-5xl)',
  fontWeight: 'var(--font-bold)'
}">

<!-- Tailwind utilities -->
<h1 class="font-display text-5xl font-bold">

<!-- Custom CSS with tokens -->
<style scoped>
h1 {
  font-family: var(--font-display);
  font-size: var(--text-5xl);
  font-weight: var(--font-bold);
}
</style>
```

---

### 4. Shadows

**❌ FAIL:**
```vue
<!-- Hardcoded shadow -->
<div style="box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1)">

<!-- Arbitrary Tailwind -->
<div class="shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)]">
```

**✅ PASS:**
```vue
<!-- Token with :style -->
<div :style="{ boxShadow: 'var(--shadow-lg)' }">

<!-- Tailwind utilities -->
<div class="shadow-lg">

<!-- Custom CSS with tokens -->
<style scoped>
.custom {
  box-shadow: var(--shadow-lg);
}
</style>
```

---

### 5. Border Radius

**❌ FAIL:**
```vue
<!-- Hardcoded radius -->
<div style="border-radius: 8px">

<!-- Arbitrary Tailwind -->
<div class="rounded-[8px]">
```

**✅ PASS:**
```vue
<!-- Token with :style -->
<div :style="{ borderRadius: 'var(--border-radius-lg)' }">

<!-- Tailwind utilities -->
<div class="rounded-lg">

<!-- Custom CSS with tokens -->
<style scoped>
.custom {
  border-radius: var(--border-radius-lg);
}
</style>
```

---

### 6. Transitions

**❌ FAIL:**
```vue
<!-- Hardcoded transition -->
<button style="transition: all 0.3s ease">

<!-- Hardcoded in CSS -->
<style>
.button {
  transition: all 300ms ease;
}
</style>
```

**✅ PASS:**
```vue
<!-- Token with :style -->
<button :style="{ transition: 'var(--transition-normal)' }">

<!-- Tailwind utilities -->
<button class="transition-normal">

<!-- Custom CSS with tokens -->
<style scoped>
.button {
  transition: var(--transition-normal);
}
</style>
```

---

### 7. Gradients

**❌ FAIL:**
```vue
<!-- Hardcoded gradient -->
<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
```

**✅ PASS:**
```vue
<!-- Token with :style -->
<div :style="{ backgroundImage: 'var(--gradient-hero)' }">

<!-- Custom CSS with tokens -->
<style scoped>
.hero {
  background-image: var(--gradient-hero);
}
</style>
```

---

### 8. Layout (Width, Height)

**❌ FAIL:**
```vue
<!-- Hardcoded max-width -->
<div style="max-width: 1200px">

<!-- Arbitrary Tailwind -->
<div class="max-w-[1200px]">

<!-- Hardcoded height -->
<header style="height: 64px">
```

**✅ PASS:**
```vue
<!-- Token with :style -->
<div :style="{ maxWidth: 'var(--container-max-width)' }">

<!-- Tailwind with custom class -->
<div class="container-custom">

<header :style="{ height: 'var(--header-height)' }">
```

---

### 9. Z-Index

**❌ FAIL:**
```vue
<!-- Hardcoded z-index -->
<div style="z-index: 1000">

<!-- Random number -->
<div style="z-index: 999">
```

**✅ PASS:**
```vue
<!-- Token with :style -->
<div :style="{ zIndex: 'var(--z-modal)' }">

<!-- Tailwind with custom config -->
<div class="z-modal">
```

---

## File-by-File Review

### Vue Component Template

**Check for:**
- [ ] Inline `style` attributes use tokens
- [ ] Tailwind classes are token-based (no arbitrary values)
- [ ] Dynamic styles use `:style` with tokens

**Example review:**
```vue
<template>
  <!-- ❌ FAIL -->
  <div style="color: #3b82f6; padding: 24px" class="text-[48px]">

  <!-- ✅ PASS -->
  <div
    :style="{ color: 'var(--color-primary)', padding: 'var(--spacing-6)' }"
    class="text-5xl"
  >
</template>
```

---

### Vue Component Style Block

**Check for:**
- [ ] All CSS properties use tokens
- [ ] No hardcoded values in custom classes
- [ ] `@apply` directives use token-based Tailwind

**Example review:**
```vue
<style scoped>
/* ❌ FAIL */
.custom-button {
  background-color: #3b82f6;
  padding: 16px 32px;
  font-size: 18px;
  border-radius: 8px;
}

/* ✅ PASS */
.custom-button {
  background-color: var(--color-primary);
  padding: var(--spacing-4) var(--spacing-8);
  font-size: var(--text-lg);
  border-radius: var(--border-radius-lg);
}

/* ✅ PASS (Tailwind @apply) */
.custom-button {
  @apply bg-primary px-8 py-4 text-lg rounded-lg;
}
</style>
```

---

### Global CSS File

**Check for:**
- [ ] All token definitions in `:root`
- [ ] Tokens follow naming conventions
- [ ] Custom utilities use `@apply` with token-based classes

**Example review:**
```css
/* ❌ FAIL */
.btn-primary {
  background-color: #3b82f6;
  padding: 16px 32px;
}

/* ✅ PASS */
.btn-primary {
  @apply bg-primary px-8 py-4;
}

/* ✅ PASS (direct tokens) */
.btn-primary {
  background-color: var(--color-primary);
  padding: var(--spacing-4) var(--spacing-8);
}
```

---

## Builder.io Component Registration

**Check for:**
- [ ] `defaultValue` uses token format
- [ ] Color props use semantic token names

**Example review:**
```typescript
// ❌ FAIL
Builder.registerComponent(Hero, {
  inputs: [
    {
      name: 'backgroundColor',
      type: 'color',
      defaultValue: '#3b82f6'  // ❌ Hardcoded
    }
  ]
})

// ✅ PASS
Builder.registerComponent(Hero, {
  inputs: [
    {
      name: 'backgroundColor',
      type: 'color',
      defaultValue: 'var(--color-primary)'  // ✅ Token
    }
  ]
})
```

---

## Automated Checks (Regex)

**Search for violations:**

### Hardcoded Colors
```bash
# Search for hex colors
grep -r "#[0-9a-fA-F]\{3,6\}" components/ --include="*.vue"

# Search for rgb/rgba
grep -r "rgb\|rgba" components/ --include="*.vue"
```

### Hardcoded Spacing
```bash
# Search for px values in style attributes
grep -r 'style=".*[0-9]\+px' components/ --include="*.vue"

# Search for arbitrary Tailwind values
grep -r 'class=".*\[[0-9]' components/ --include="*.vue"
```

### Hardcoded Fonts
```bash
# Search for font-family with quoted strings
grep -r "font-family:\s*['\"]" components/ --include="*.vue"
```

---

## Review Workflow

### 1. Pre-Commit Review

Before committing:
- [ ] Run automated checks (grep commands)
- [ ] Review all changed files manually
- [ ] Verify no hardcoded values introduced
- [ ] Test in browser (DevTools inspect)

### 2. Pull Request Review

When reviewing PRs:
- [ ] Check all style-related changes
- [ ] Look for hardcoded values in diffs
- [ ] Verify Tailwind classes are token-based
- [ ] Request changes if violations found

### 3. Code Audit

Periodic full codebase audit:
- [ ] Run all automated checks
- [ ] Review all components systematically
- [ ] Create issues for violations
- [ ] Refactor to use tokens

---

## Scoring System

**Rate components 0-100:**

- **100 points**: Perfect token usage
- **-10 points**: Each hardcoded color
- **-5 points**: Each hardcoded spacing value
- **-5 points**: Each arbitrary Tailwind value
- **-10 points**: Each hardcoded font
- **-5 points**: Each hardcoded shadow/radius

**Example:**
```
Component A: 100 points (perfect)
Component B: 85 points (1 hardcoded color, 1 arbitrary value)
Component C: 70 points (3 hardcoded colors)
```

**Goal**: All components 90+ points

---

## Refactoring Priority

**High Priority (Fix immediately):**
- [ ] Hardcoded brand colors
- [ ] Hardcoded spacing in layouts
- [ ] Hardcoded fonts

**Medium Priority (Fix soon):**
- [ ] Hardcoded shadows
- [ ] Hardcoded border radius
- [ ] Arbitrary Tailwind values

**Low Priority (Fix eventually):**
- [ ] One-off custom CSS (if tokens used)
- [ ] Complex calculations (if tokens referenced)

---

## Summary

**Pass criteria:**
- ✅ 100% token usage for colors
- ✅ 100% token usage for spacing
- ✅ 100% token usage for typography
- ✅ No arbitrary Tailwind values
- ✅ All custom CSS uses tokens

**Fail criteria:**
- ❌ Any hardcoded hex colors
- ❌ Any hardcoded px/rem values
- ❌ Any arbitrary Tailwind values
- ❌ Any hardcoded font names

**Enforce strictly. No exceptions.** 🔒
