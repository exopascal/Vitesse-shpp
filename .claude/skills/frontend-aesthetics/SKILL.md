# Frontend Aesthetics Guide

**Purpose**: Prevents generic AI-generated designs by guiding typography, color, motion, and background choices. Use when creating section components, content wrappers, landing pages, or any UI/UX work in this gym/fitness platform.

---

## The Problem

LLMs converge toward generic, "on distribution" outputs. In frontend design, this creates the "AI slop" aesthetic - Inter fonts, purple gradients on white backgrounds, minimal animations, and predictable layouts that look like every other website.

**For a gym brand, this is especially harmful** - fitness needs energy, personality, and motivation. Generic designs fail to inspire action.

---

## Instructions

Make creative, distinctive frontends that surprise and delight. Focus on these four dimensions while respecting our design token system and 2-tier component architecture.

### Typography

Choose fonts that are beautiful, unique, and match the gym's energetic brand.

**Never use**: Inter, Roboto, Open Sans, Lato, Arial, default system fonts

**Good choices for fitness/gym aesthetic**:
- **Athletic & Bold**: Outfit, Bebas Neue, Oswald, Anton
- **Modern & Clean**: Plus Jakarta Sans, Manrope, DM Sans
- **Technical Performance**: Space Grotesk, JetBrains Mono, IBM Plex Sans
- **Premium Fitness**: Cabinet Grotesk, Satoshi, General Sans, Clash Display
- **Editorial (for transformation stories)**: Newsreader, Crimson Pro, Playfair Display

**Pairing principle**: High contrast = interesting
- Display + monospace: Bebas Neue (headings) + JetBrains Mono (stats)
- Bold sans + serif: Outfit (UI) + Newsreader (testimonials)
- Variable font across weights: 200 (body) vs 900 (CTAs)

**Use extremes**: 100/200 weight vs 800/900, not 400 vs 600. Size jumps of 3x+, not 1.5x.

**Implementation**:
```css
/* In assets/css/global.css */
:root {
  --font-display: 'Outfit', sans-serif;
  --font-body: 'Plus Jakarta Sans', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

Load from Google Fonts via `nuxt.config.ts`:
```typescript
app: {
  head: {
    link: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;800;900&family=Plus+Jakarta+Sans:wght@300;600&display=swap' }
    ]
  }
}
```

---

### Color & Theme

Commit to a cohesive aesthetic using our design token system in `global.css`.

**Gym/Fitness Color Psychology**:
- **Energy**: Orange/red accents for motivation and action
- **Trust**: Deep blues for professionalism and safety
- **Growth**: Green for progress and transformation
- **Power**: Bold black with high-contrast accents
- **Premium**: Navy/gold, charcoal/electric blue

**Avoid**: Purple gradients on white backgrounds (the ultimate AI slop indicator)

**Theme Ideas for Gym Context**:

1. **Performance Black**:
   - Base: #0a0a0a, #1a1a1a
   - Accent: Electric blue (#00e5ff) or neon orange (#ff6b35)
   - Use: Dark, powerful, intense workout aesthetic

2. **Athletic Energy**:
   - Base: White (#ffffff), light gray (#f5f5f5)
   - Accent: Bold red (#e63946) or vibrant orange (#ff9f1c)
   - Use: High-energy, motivational, daytime classes

3. **Premium Fitness**:
   - Base: Navy (#1a2332), charcoal (#2d3748)
   - Accent: Gold (#fbbf24) or copper (#d97706)
   - Use: Exclusive programs, personal training

4. **Natural Strength**:
   - Base: Warm gray (#78716c), sage (#84a98c)
   - Accent: Deep green (#2f4538) or terracotta (#c1666b)
   - Use: Holistic wellness, yoga, outdoor training

**Implementation with Design Tokens**:
```css
/* assets/css/global.css */
:root {
  /* Brand Colors - Performance Black Theme */
  --color-primary: #0a0a0a;
  --color-primary-light: #1a1a1a;
  --color-accent: #00e5ff;
  --color-accent-hover: #00b8d4;

  /* Semantic Colors */
  --color-cta: var(--color-accent);
  --color-text: #f5f5f5;
  --color-text-muted: #a0a0a0;
  --color-bg: var(--color-primary);
  --color-surface: var(--color-primary-light);
}
```

**Priority Order** (per CLAUDE.md):
1. Design tokens from `global.css` (highest priority)
2. Tailwind utilities
3. Component-specific CSS (only if necessary)

---

### Motion

Use animations for effects and micro-interactions that create energy and motivation.

**Fitness-Specific Motion Patterns**:
- **Hero sections**: Bold entrance animations (slide-up, fade-in with scale)
- **Statistics/Numbers**: Count-up animations on scroll
- **CTA buttons**: Pulse or glow effects on hover
- **Gallery/Transformations**: Staggered reveals with delay
- **Class schedules**: Smooth transitions between time slots

**Implementation**:
```css
/* Use existing variables from global.css */
:root {
  --transition-fast: 150ms ease;
  --transition-normal: 300ms ease;
  --transition-slow: 500ms ease;
}

/* Extend with fitness-specific animations */
@keyframes pulse-energy {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.cta-pulse {
  animation: pulse-energy 2s ease-in-out infinite;
}
```

**Vue Component Example**:
```vue
<template>
  <div class="fade-in slide-up" style="animation-delay: 200ms">
    <Button variant="primary" class="cta-pulse">Start Your Transformation</Button>
  </div>
</template>
```

**High-impact moments**:
- Page load: Staggered reveals for hero sections
- Scroll triggers: Statistics appear with count-up
- Hover states: CTAs glow or lift
- Success states: Booking confirmation with celebration

---

### Backgrounds

Create atmosphere and depth that matches the gym's energy.

**Avoid**: Flat white or solid colors

**Fitness-Specific Backgrounds**:

1. **Dark Intensity** (for Performance Black theme):
```css
background: radial-gradient(circle at top right, #1a1a1a, #0a0a0a),
            linear-gradient(135deg, rgba(0, 229, 255, 0.05), transparent);
```

2. **Energy Gradient** (for Athletic Energy theme):
```css
background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
```

3. **Geometric Grid** (for technical/modern sections):
```css
background-image:
  linear-gradient(rgba(0, 229, 255, 0.05) 1px, transparent 1px),
  linear-gradient(90deg, rgba(0, 229, 255, 0.05) 1px, transparent 1px);
background-size: 50px 50px;
```

4. **Noise Texture** (adds grittiness):
```css
background: #0a0a0a url('/textures/noise.png');
background-blend-mode: overlay;
```

5. **Hero Video Backgrounds**:
- Use `HeroVideoBackground.vue` component
- Overlay with gradient for text legibility
- Autoplay workout footage or gym atmosphere

---

## Component Architecture Integration

### UI Components (`design-system-ui-components/`)
Apply aesthetics to primitives:
- **Button.vue**: Bold typography, strong hover states, accent colors
- **Modal.vue**: Glassmorphism, backdrop blur, slide-in animation
- **Cards**: Depth with shadows, hover lifts, accent borders

### Section Components (`design-system-section-components/`)
Create distinctive sections:
- **Hero.vue**: Bold display font, animated entrance, video/gradient background
- **FAQ.vue**: Clean typography hierarchy, smooth expand/collapse
- **Timeline.vue**: Visual progression line, animated milestones
- **GalleryGrid.vue**: Staggered image reveals, hover zoom effects

### Content Wrappers (`components/[domain]/`)
Domain-specific character:
- **gym-linden/**: Local gym personality, community feel
- **transformation/**: Before/after drama, motivational energy
- **about/**: Team authenticity, story-driven
- **levelup/**: Premium program aesthetic, exclusive feel

---

## Builder.io Considerations

When creating components for Builder.io editor:

1. **Provide visual variety** in input schemas:
```typescript
inputs: [
  {
    name: 'theme',
    type: 'text',
    enum: ['performance-black', 'athletic-energy', 'premium-fitness', 'natural-strength'],
    defaultValue: 'performance-black'
  },
  {
    name: 'backgroundStyle',
    type: 'text',
    enum: ['gradient', 'video', 'geometric', 'solid'],
    defaultValue: 'gradient'
  }
]
```

2. **Use design tokens** so non-technical users maintain brand consistency
3. **Preview meaningful defaults** in the visual editor

---

## What to Avoid

### Typography
- ❌ Inter, Roboto, Arial, system fonts
- ❌ Single font weight throughout (boring)
- ❌ Subtle size differences (1.2x vs 1.5x)

### Color
- ❌ Purple gradients on white (AI slop hallmark)
- ❌ Generic "tech blue" (#3b82f6)
- ❌ Timid, evenly-distributed palettes
- ❌ Colors that don't match gym energy (pastels, muted tones)

### Motion
- ❌ No animations at all (lifeless)
- ❌ Chaotic, unsynchronized animations
- ❌ Overuse of rotation/3D transforms (dizzy)

### Backgrounds
- ❌ Flat white or #f5f5f5 everywhere
- ❌ Stock photo collages (generic)
- ❌ Overused patterns (diagonal stripes, chevrons)

### Layout
- ❌ Cookie-cutter hero sections
- ❌ Predictable card grids
- ❌ Centered content with no visual hierarchy

---

## Fitness Brand Personality Matrix

Choose aesthetics based on the program/page:

| Program | Typography | Colors | Motion | Background |
|---------|-----------|--------|--------|------------|
| **Transformation** | Bold display + serif | Dark + orange accent | Dramatic reveals | Before/after video overlay |
| **Group Classes** | Athletic sans, various weights | Bright, energetic | Bouncy, rhythmic | Geometric grid |
| **Personal Training** | Premium sans + mono | Navy/gold, sophisticated | Smooth, controlled | Subtle gradient |
| **Yoga/Wellness** | Editorial serif + light sans | Sage/terracotta, warm | Slow, flowing | Natural texture |
| **Home Page** | Bold + versatile | Brand primary + accent | Energetic entrance | Video or radial gradient |

---

## Key Principle

**Interpret creatively and make unexpected choices that feel genuinely designed for the fitness context.**

Vary between:
- Light and dark themes (daytime energy vs evening intensity)
- Different fonts for different programs (athletic vs editorial)
- Different aesthetics for different audiences (beginners vs athletes)

**You still tend to converge on common choices across generations. Avoid this: it is critical that you think outside the box!**

A gym brand should feel:
- **Energetic** (motion, bold colors)
- **Authentic** (real stories, real people)
- **Motivational** (CTAs, before/after)
- **Professional** (consistent design system)

---

## Quick Reference

```
✅ Bold display fonts (Outfit, Bebas Neue, Clash Display)
✅ High contrast typography (200 vs 900 weight)
✅ Energetic color palettes (dark + neon, or bright + bold)
✅ Design tokens from global.css
✅ Animations for key moments (hero, CTAs, stats)
✅ Rich backgrounds (gradients, video, geometric)
✅ Context-specific aesthetics (transformation drama, class energy)

❌ Generic fonts (Inter, Roboto, system)
❌ Purple gradients on white
❌ Flat, lifeless designs
❌ Predictable layouts
❌ Subtle, timid choices
❌ Ignore design token system
❌ One aesthetic for all content
```

---

## Implementation Checklist

When creating a new component:

1. **Choose distinctive fonts** - Check global.css, add if needed
2. **Pick theme** - Reference color psychology for the program
3. **Define animations** - Use existing variables, extend if needed
4. **Design background** - Gradients, video, or geometric patterns
5. **Test in Builder.io** - Ensure variety in input schemas
6. **Verify tokens** - All colors/spacing from design system
7. **Check responsiveness** - Mobile-first, energy on all devices

---

**Remember**: This is a gym brand. It should feel powerful, energetic, and motivational - not like every other generic website.