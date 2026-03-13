# Common Mistakes and Fixes

Detailed examples of mistakes and how to fix them.

## Mistake 1: Hardcoded Hex Colors

### ❌ WRONG

```vue
<template>
  <!-- Inline styles -->
  <div style="color: #3b82f6; background-color: #ffffff">
    Content
  </div>

  <!-- Arbitrary Tailwind -->
  <div class="text-[#3b82f6] bg-[#ffffff]">
    Content
  </div>
</template>

<style scoped>
/* Custom CSS */
.button {
  background-color: #3b82f6;
  color: #ffffff;
}
</style>
```

### ✅ CORRECT

```vue
<template>
  <!-- Token with :style -->
  <div :style="{ color: 'var(--color-primary)', backgroundColor: 'var(--color-surface)' }">
    Content
  </div>

  <!-- Tailwind utilities -->
  <div class="text-primary bg-surface">
    Content
  </div>
</template>

<style scoped>
/* Custom CSS with tokens */
.button {
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
}
</style>
```

---

## Mistake 2: Hardcoded Pixel Values

### ❌ WRONG

```vue
<template>
  <!-- Inline styles -->
  <div style="padding: 24px; margin-top: 64px; gap: 16px">
    Content
  </div>

  <!-- Arbitrary Tailwind -->
  <div class="p-[24px] mt-[64px] gap-[16px]">
    Content
  </div>
</template>

<style scoped>
.card {
  padding: 24px;
  margin-top: 64px;
}
</style>
```

### ✅ CORRECT

```vue
<template>
  <!-- Token with :style -->
  <div :style="{ padding: 'var(--spacing-6)', marginTop: 'var(--spacing-16)', gap: 'var(--spacing-4)' }">
    Content
  </div>

  <!-- Tailwind utilities -->
  <div class="p-6 mt-16 gap-4">
    Content
  </div>
</template>

<style scoped>
.card {
  padding: var(--spacing-6);
  margin-top: var(--spacing-16);
}
</style>
```

---

## Mistake 3: Hardcoded Font Families

### ❌ WRONG

```vue
<template>
  <h1 style="font-family: 'Inter', sans-serif; font-size: 48px">
    Headline
  </h1>

  <h1 class="font-['Inter'] text-[48px]">
    Headline
  </h1>
</template>

<style scoped>
h1 {
  font-family: 'Inter', sans-serif;
  font-size: 48px;
}
</style>
```

### ✅ CORRECT

```vue
<template>
  <!-- Token with :style -->
  <h1 :style="{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-5xl)' }">
    Headline
  </h1>

  <!-- Tailwind utilities -->
  <h1 class="font-display text-5xl">
    Headline
  </h1>
</template>

<style scoped>
h1 {
  font-family: var(--font-display);
  font-size: var(--text-5xl);
}
</style>
```

---

## Mistake 4: Inline Styles Instead of Tokens

### ❌ WRONG

```vue
<template>
  <button style="
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 16px 32px;
    border-radius: 8px;
    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
  ">
    Button
  </button>
</template>
```

### ✅ CORRECT

```vue
<template>
  <button :style="{
    backgroundImage: 'var(--gradient-primary)',
    padding: 'var(--spacing-4) var(--spacing-8)',
    borderRadius: 'var(--border-radius-lg)',
    boxShadow: 'var(--shadow-lg)',
    transition: 'var(--transition-normal)'
  }">
    Button
  </button>
</template>
```

**Or even better with Tailwind:**
```vue
<template>
  <button class="bg-gradient-primary px-8 py-4 rounded-lg shadow-lg transition-normal">
    Button
  </button>
</template>
```

---

## Mistake 5: Mixing Hardcoded and Token Values

### ❌ WRONG

```vue
<template>
  <!-- Some values use tokens, others don't -->
  <div
    class="p-6 rounded-lg"
    :style="{
      backgroundColor: 'var(--color-primary)',  // ✅ Token
      color: '#ffffff',                         // ❌ Hardcoded
      marginTop: 'var(--spacing-8)',            // ✅ Token
      paddingBottom: '48px'                     // ❌ Hardcoded
    }"
  >
    Content
  </div>
</template>
```

### ✅ CORRECT

```vue
<template>
  <!-- All values use tokens -->
  <div
    class="p-6 rounded-lg"
    :style="{
      backgroundColor: 'var(--color-primary)',   // ✅ Token
      color: 'var(--color-text-inverse)',        // ✅ Token
      marginTop: 'var(--spacing-8)',             // ✅ Token
      paddingBottom: 'var(--spacing-12)'         // ✅ Token
    }"
  >
    Content
  </div>
</template>
```

---

## Mistake 6: Not Using Semantic Tokens

### ❌ WRONG

```vue
<template>
  <!-- Repeating the same value everywhere -->
  <section :style="{ padding: 'var(--spacing-20) 0' }">Section 1</section>
  <section :style="{ padding: 'var(--spacing-20) 0' }">Section 2</section>
  <section :style="{ padding: 'var(--spacing-20) 0' }">Section 3</section>
</template>
```

### ✅ CORRECT

```vue
<template>
  <!-- Use semantic token for repeated pattern -->
  <section :style="{ padding: 'var(--spacing-section) 0' }">Section 1</section>
  <section :style="{ padding: 'var(--spacing-section) 0' }">Section 2</section>
  <section :style="{ padding: 'var(--spacing-section) 0' }">Section 3</section>
</template>

<!-- Or create a utility class -->
<style>
.section {
  padding: var(--spacing-section) 0;
}
</style>

<template>
  <section class="section">Section 1</section>
  <section class="section">Section 2</section>
  <section class="section">Section 3</section>
</template>
```

---

## Mistake 7: Using RGB/RGBA Instead of Tokens

### ❌ WRONG

```vue
<template>
  <div style="
    background-color: rgb(59, 130, 246);
    color: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(0, 0, 0, 0.1);
  ">
    Content
  </div>
</template>
```

### ✅ CORRECT

```vue
<template>
  <div :style="{
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-text-inverse)',
    border: '1px solid var(--color-border)'
  }">
    Content
  </div>
</template>

<!-- For opacity, use Tailwind utilities -->
<template>
  <div class="bg-primary text-white text-opacity-90 border border-border">
    Content
  </div>
</template>
```

---

## Mistake 8: Arbitrary Tailwind Values

### ❌ WRONG

```vue
<template>
  <div class="
    w-[1200px]
    h-[600px]
    text-[#3b82f6]
    bg-[#ffffff]
    p-[24px]
    rounded-[8px]
    shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)]
  ">
    Content
  </div>
</template>
```

### ✅ CORRECT

```vue
<template>
  <div
    class="text-primary bg-surface p-6 rounded-lg shadow-lg"
    :style="{
      maxWidth: 'var(--container-max-width)',
      minHeight: '600px'
    }"
  >
    Content
  </div>
</template>
```

---

## Mistake 9: Hardcoded Values in Builder.io Registration

### ❌ WRONG

```typescript
// plugins/custom-components.ts
Builder.registerComponent(Hero, {
  name: 'Hero',
  inputs: [
    {
      name: 'backgroundColor',
      type: 'color',
      defaultValue: '#3b82f6'  // ❌ Hardcoded
    },
    {
      name: 'padding',
      type: 'string',
      defaultValue: '80px'     // ❌ Hardcoded
    }
  ]
})
```

### ✅ CORRECT

```typescript
// plugins/custom-components.ts
Builder.registerComponent(Hero, {
  name: 'Hero',
  inputs: [
    {
      name: 'backgroundColor',
      type: 'color',
      defaultValue: 'var(--color-primary)'  // ✅ Token
    },
    {
      name: 'padding',
      type: 'string',
      defaultValue: 'var(--spacing-section)'  // ✅ Token
    }
  ]
})
```

---

## Mistake 10: Not Restarting Dev Server After Token Changes

### ❌ PROBLEM

```css
/* Added new token to global.css */
:root {
  --color-tertiary: #0ea5e9;
}
```

```vue
<!-- Token doesn't work! -->
<div :style="{ color: 'var(--color-tertiary)' }">
  Content shows with no color
</div>
```

### ✅ SOLUTION

```bash
# Stop dev server (Ctrl+C)
# Restart
yarn dev
```

**Now the token works!**

---

## Mistake 11: Using Named CSS Colors

### ❌ WRONG

```vue
<template>
  <div style="color: blue; background-color: white">
    Content
  </div>

  <button style="background: red; color: white">
    Button
  </button>
</template>

<style scoped>
.error {
  color: red;
  background-color: pink;
}
</style>
```

### ✅ CORRECT

```vue
<template>
  <div class="text-primary bg-surface">
    Content
  </div>

  <button class="bg-error text-white">
    Button
  </button>
</template>

<style scoped>
.error {
  color: var(--color-error);
  background-color: var(--color-error-light);
}
</style>
```

---

## Mistake 12: Calc() Without Tokens

### ❌ WRONG

```vue
<template>
  <div style="
    width: calc(100% - 64px);
    padding: calc(16px + 8px);
  ">
    Content
  </div>
</template>
```

### ✅ CORRECT

```vue
<template>
  <div :style="{
    width: 'calc(100% - var(--spacing-16))',
    padding: 'calc(var(--spacing-4) + var(--spacing-2))'
  }">
    Content
  </div>
</template>
```

---

## Mistake 13: Hardcoded Media Queries

### ❌ WRONG

```vue
<style scoped>
@media (min-width: 768px) {
  .container {
    padding: 64px;
    font-size: 24px;
  }
}
</style>
```

### ✅ CORRECT

```vue
<!-- Use Tailwind responsive utilities -->
<template>
  <div class="container p-4 md:p-16 text-base md:text-2xl">
    Content
  </div>
</template>

<!-- Or use tokens in media queries -->
<style scoped>
@media (min-width: 768px) {
  .container {
    padding: var(--spacing-16);
    font-size: var(--text-2xl);
  }
}
</style>
```

---

## Quick Fix Checklist

When you find a violation:

1. **Identify the hardcoded value**
   ```
   color: #3b82f6  ← What is this?
   ```

2. **Find the appropriate token**
   ```
   Is this primary color? → var(--color-primary)
   Is this text color? → var(--color-text)
   Is this accent? → var(--color-accent)
   ```

3. **Replace the value**
   ```
   color: #3b82f6  → color: var(--color-primary)
   ```

4. **Verify in browser**
   ```
   DevTools → Computed → color: #3b82f6 (from var(--color-primary))
   ```

5. **Test responsiveness**
   ```
   Resize browser → Check all breakpoints
   ```

---

## Summary

**Most common mistakes:**
1. Hardcoded hex colors (#3b82f6)
2. Hardcoded pixel values (24px)
3. Hardcoded fonts ('Inter')
4. Arbitrary Tailwind values ([24px])
5. Mixing tokens and hardcoded values

**Always:**
- ✅ Use design tokens from `global.css`
- ✅ Use Tailwind utilities (token-based)
- ✅ Restart dev server after token changes
- ✅ Check DevTools to verify token resolution

**Never:**
- ❌ Hardcode colors, spacing, or fonts
- ❌ Use arbitrary Tailwind values
- ❌ Skip token-first approach
