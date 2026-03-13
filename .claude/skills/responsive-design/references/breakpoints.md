# Breakpoints

Complete breakpoint strategy and testing widths.

## Tailwind Breakpoints

```css
/* Mobile (default, no prefix) */
/* 0px - 639px */
.class-name

/* Tablet (sm:) */
/* 640px and up */
sm:class-name

/* Laptop (md:) */
/* 768px and up */
md:class-name

/* Desktop (lg:) */
/* 1024px and up */
lg:class-name

/* Large Desktop (xl:) */
/* 1280px and up */
xl:class-name

/* Extra Large Desktop (2xl:) */
/* 1536px and up */
2xl:class-name
```

## Testing Breakpoints

### Mobile Devices
```
iPhone SE/8:        375px × 667px
Android (common):   360px × 640px
iPhone 11/XR:       414px × 896px
iPhone 12/13:       390px × 844px
```

### Tablets
```
iPad:               768px × 1024px
iPad Pro 11":       834px × 1194px
iPad Pro 12.9":    1024px × 1366px
```

### Laptops
```
Common laptop:     1366px × 768px
MacBook Air:       1440px × 900px
MacBook Pro 13":   1512px × 982px
```

### Desktops
```
Full HD:           1920px × 1080px
2K:                2560px × 1440px
4K:                3840px × 2160px
```

## Testing Strategy

### Minimum Testing (Fast)
- **375px** - Most common mobile
- **768px** - Tablet breakpoint
- **1440px** - Desktop

### Thorough Testing (Recommended)
- **360px** - Small Android
- **375px** - iPhone SE (most common)
- **414px** - Large iPhone
- **768px** - iPad portrait
- **1024px** - iPad landscape
- **1366px** - Common laptop
- **1920px** - Full HD desktop

### How to Test

**Browser Dev Tools:**
```
1. Open Chrome/Firefox DevTools (F12)
2. Click responsive design mode (Ctrl+Shift+M)
3. Set custom dimensions
4. Test each breakpoint
```

**Common Device Presets:**
- iPhone SE
- iPhone 12 Pro
- iPad
- Laptop with touch
- Desktop
