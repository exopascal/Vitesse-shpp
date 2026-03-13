# Schema.org Markup for Blog Posts

SEO schema data for enhanced search visibility.

## Overview

Blog posts can include **optional Schema.org structured data** for:
- **FAQ Schema** → Featured Snippets, Voice Search
- **HowTo Schema** → Rich Results with Steps
- **VideoObject Schema** → Video Thumbnails in SERP
- **Article Schema** → Always included automatically
- **LocalBusiness Schema** → Always included automatically

---

## 1. FAQ Schema (Recommended for All Posts)

**Use when:** Blog post answers common questions about the topic.

**Benefits:**
- Featured Snippets in Google
- Voice Search optimization
- AI Search visibility (ChatGPT, Perplexity)

**Implementation:**

```typescript
const faqData = [
  {
    question: 'Wie oft sollte man als Anfänger trainieren?',
    answer: '3-4x pro Woche ist optimal für Anfänger. Plane mindestens 48 Stunden Pause zwischen intensiven Sessions für Muskelregeneration.'
  },
  {
    question: 'Wo finde ich Training in Hannover?',
    answer: 'EXOPEK GYM in Hannover Linden bietet spezialisierte Kurse. Kostenloses Probetraining verfügbar unter /probetraining'
  }
  // 5-10 questions recommended
]

const config: BlogPostConfig = {
  // ... other fields
  faqData,  // Add FAQ Schema
}
```

**Best Practices:**
- 5-10 questions per post
- Mix informational + local questions
- Include EXOPEK/Hannover in at least 2 answers
- Keep answers concise (2-3 sentences max)
- Use natural language (how people actually search)

---

## 2. HowTo Schema (For Tutorial Content)

**Use when:** Blog post contains step-by-step instructions or tutorial.

**Benefits:**
- Rich Results with numbered steps in SERP
- Higher click-through rate (+20-40%)
- Better visibility for "how to" queries

**Implementation:**

```typescript
const howToSteps = [
  {
    position: 1,
    name: 'Ausgangsposition einnehmen',
    text: 'Stehe aufrecht mit Füßen schulterbreit auseinander. Arme locker an den Seiten. Aktiviere deinen Core für Stabilität.',
    image: 'https://images.unsplash.com/photo-...' // Optional
  },
  {
    position: 2,
    name: 'Bewegung ausführen',
    text: 'Gehe in die tiefe Hocke und platziere deine Hände flach auf dem Boden. Halte den Rücken gerade und Core angespannt.'
  }
  // 3-8 steps recommended
]

const config: BlogPostConfig = {
  // ... other fields
  howToSteps,
  totalTime: 'PT5M',  // ISO 8601 duration (5 minutes)
}
```

**ISO 8601 Duration Format:**
- `PT5M` = 5 minutes
- `PT30M` = 30 minutes
- `PT1H` = 1 hour
- `PT1H30M` = 1 hour 30 minutes

**Best Practices:**
- 3-8 steps (not too few, not too many)
- Clear, actionable step names
- Detailed step descriptions (2-3 sentences)
- Include images where possible
- Add total time estimate

---

## 3. VideoObject Schema (For Video Content)

**Use when:** Blog post embeds or references a video tutorial.

**Benefits:**
- Video thumbnails in search results
- +140% traffic increase for video content
- YouTube integration

**Implementation:**

```typescript
const videoData = {
  name: 'Burpees richtig ausführen - Komplettes Tutorial',
  description: 'In diesem 10-minütigen Video zeigt dir unser EXOPEK Trainer die perfekte Burpee-Technik.',
  thumbnailUrl: 'https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg',
  uploadDate: '2025-02-01',
  duration: 'PT10M30S',  // ISO 8601 (10 min 30 sec)
  contentUrl: 'https://www.youtube.com/watch?v=VIDEO_ID',
  embedUrl: 'https://www.youtube.com/embed/VIDEO_ID'  // Optional
}

const config: BlogPostConfig = {
  // ... other fields
  videoData,
}
```

**Best Practices:**
- Use high-quality thumbnail (1280x720 or higher)
- Accurate duration
- Upload date matches actual video upload
- YouTube URLs preferred

---

## 4. Complete Example: All Schemas Together

```typescript
#!/usr/bin/env npx tsx
import { deployBlogPost, type BlogPostContent, type BlogPostConfig } from '../lib/blog-helpers.js'

// FAQ Schema (5-10 questions)
const faqData = [
  {
    question: 'Wie viele Burpees sollte ich als Anfänger machen?',
    answer: 'Als Anfänger empfehlen wir 3 Sätze mit 5-8 Burpees. Achte auf korrekte Technik statt hoher Wiederholungszahl.'
  },
  {
    question: 'Wie oft sollte ich Burpees trainieren?',
    answer: '3-4x pro Woche ist optimal. Plane mindestens 48 Stunden Pause zwischen intensiven Sessions.'
  },
  {
    question: 'Wo kann ich Burpee-Training in Hannover lernen?',
    answer: 'Bei EXOPEK GYM in Hannover Linden zeigen dir unsere Trainer die perfekte Technik. Kostenloses Probetraining unter /probetraining'
  }
]

// HowTo Schema (3-8 steps)
const howToSteps = [
  {
    position: 1,
    name: 'Ausgangsposition einnehmen',
    text: 'Stehe aufrecht mit Füßen schulterbreit auseinander. Arme locker an den Seiten.',
    image: 'https://images.unsplash.com/photo-...'
  },
  {
    position: 2,
    name: 'In die Hocke gehen',
    text: 'Gehe in die tiefe Hocke und platziere deine Hände flach auf dem Boden vor dir.',
    image: 'https://images.unsplash.com/photo-...'
  },
  {
    position: 3,
    name: 'In Liegestützposition springen',
    text: 'Springe mit beiden Füßen nach hinten in die Liegestützposition. Dein Körper bildet eine gerade Linie.',
    image: 'https://images.unsplash.com/photo-...'
  }
]

// VideoObject Schema (optional)
const videoData = {
  name: 'Burpees richtig ausführen - Tutorial',
  description: '10-minütiges Video mit perfekter Burpee-Technik',
  thumbnailUrl: 'https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg',
  uploadDate: '2025-02-01',
  duration: 'PT10M30S',
  contentUrl: 'https://www.youtube.com/watch?v=VIDEO_ID'
}

const content: BlogPostContent = {
  h1: 'Burpees richtig ausführen - Das komplette Tutorial',
  introduction: { text: '...' },
  sections: [/* ... */],
  conclusion: { h2: 'Fazit', text: '...' },
  callToAction: { h2: 'Bereit für dein erstes Burpee-Workout?', text: '...' }
}

const config: BlogPostConfig = {
  slug: 'burpees-richtig-ausfuehren-tutorial',
  title: 'Burpees richtig ausführen - Tutorial',
  excerpt: 'Lerne Burpees korrekt ausführen...',
  category: 'Training',
  meta: {
    title: 'Burpees richtig ausführen: Video Tutorial | EXOPEK',
    description: 'Komplettes Tutorial: Lerne Burpees richtig...'
  },
  content,

  // Schema.org Data (ALL OPTIONAL)
  faqData,
  howToSteps,
  totalTime: 'PT2M',  // 2 minutes total for all steps
  videoData,

  published: 'draft'
}

await deployBlogPost(config)
```

---

## When to Use Which Schema

| Content Type | FAQ | HowTo | Video | Example |
|--------------|-----|-------|-------|---------|
| **Tutorial / How-To** | ✅ | ✅ | ✅* | "Burpees richtig ausführen" |
| **Guide / Comparison** | ✅ | ❌ | ❌ | "HIIT vs Krafttraining" |
| **Listicle** | ✅ | ❌ | ❌ | "Top 10 Übungen" |
| **Informational** | ✅ | ❌ | ❌ | "Was ist Functional Training?" |

*✅ = Recommended, ❌ = Not applicable

**Note:** FAQ Schema is recommended for **all blog posts** (5-10 questions).

---

## Testing Schema Markup

**Google Rich Results Test:**
1. Deploy blog post
2. Visit: https://search.google.com/test/rich-results
3. Enter your blog URL
4. Check for FAQ, HowTo, VideoObject schemas

**Expected Results:**
- ✅ Article Schema (always present)
- ✅ FAQ Schema (if faqData provided)
- ✅ HowTo Schema (if howToSteps provided)
- ✅ VideoObject Schema (if videoData provided)
- ✅ LocalBusiness Schema (always present)

---

## Summary

**Quick Checklist:**

**Every Blog Post:**
- ✅ Add FAQ Schema (5-10 questions)

**Tutorial/How-To Posts:**
- ✅ Add FAQ Schema
- ✅ Add HowTo Schema (3-8 steps)
- ✅ Add totalTime (ISO 8601)
- ✅ Add VideoObject Schema (if video exists)

**Guide/Comparison Posts:**
- ✅ Add FAQ Schema only

**Default Template:**
```typescript
const faqData = [/* 5-10 questions */]

const config: BlogPostConfig = {
  // ... standard fields
  faqData,  // Always include
  // howToSteps: [...],  // Only for tutorials
  // totalTime: 'PT5M',  // Only for HowTo
  // videoData: {...},  // Only if video exists
}
```
