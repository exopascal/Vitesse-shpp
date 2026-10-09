export type CollectionPageTemplate = 'default' | 'hero'
export type CollectionContentKey = 'default' | 'sprinttraining' | 'witty' | 'sportreact' | 'tunturi'

export interface CollectionPagePreset {
  slugs: string[]
  template: CollectionPageTemplate
  contentKey: CollectionContentKey
}

const defaultPreset: CollectionPagePreset = {
  slugs: [],
  template: 'default',
  contentKey: 'default',
}

export const collectionPagePresets: CollectionPagePreset[] = [
  {
    slugs: ['sprinttraining', 't-apex'],
    template: 'hero',
    contentKey: 'sprinttraining',
  },
  {
    slugs: ['witty'],
    template: 'hero',
    contentKey: 'witty',
  },
  {
    slugs: ['sportreact'],
    template: 'hero',
    contentKey: 'sportreact',
  },
  {
    slugs: ['tunturi'],
    template: 'hero',
    contentKey: 'tunturi',
  },
]

// Brand CI: primary color + lighter stop for gradient text
const brandGradients: Record<string, string> = {
  sprinttraining: 'linear-gradient(90deg, #ef4544 0%, #f87a79 100%)',
  'tapex':        'linear-gradient(90deg, #ef4544 0%, #f87a79 100%)',
  't-apex':       'linear-gradient(90deg, #ef4544 0%, #f87a79 100%)',
  torque:         'linear-gradient(90deg, #ec6a29 0%, #f09860 100%)',
  exopek:         'linear-gradient(90deg, #bb3630 0%, #d46560 100%)',
  witty:          'linear-gradient(90deg, #2d73b9 0%, #5a9ed6 100%)',
  tunturi:        'linear-gradient(90deg, #52a730 0%, #7cc455 100%)',
  sportreact:     'linear-gradient(90deg, #c7aa00 0%, #e0cb3f 100%)',
}

const defaultBrandGradient = 'linear-gradient(90deg, #0f5e9c 0%, #2f76bb 28%, #74baff 72%, #ffbf5a 100%)'

export function normalizeCollectionSlug(value?: string) {
  return (value || '').trim().toLowerCase()
}

export function getCollectionBrandGradient(slug?: string): string {
  const normalized = normalizeCollectionSlug(slug)
  return brandGradients[normalized] ?? defaultBrandGradient
}

export function resolveCollectionPagePreset(slug?: string): CollectionPagePreset {
  const normalizedSlug = normalizeCollectionSlug(slug)

  return (
    collectionPagePresets.find((preset) => preset.slugs.includes(normalizedSlug)) ||
    defaultPreset
  )
}

export interface CollectionSubEntry {
  title: string
  handle: string
  description: string
}

const collectionSubCollectionsMap: Record<string, CollectionSubEntry[]> = {
  tunturi: [
    { title: 'Indoor Bikes',       handle: 'tunturi-indoor-bikes',       description: 'S10, S20 — Servo- & PMS-Bremssystem für Gruppentraining' },
    { title: 'Fahrradergometer',   handle: 'tunturi-fahrradergometer',   description: 'E20, E30 — EMS-Bremssystem, 48 Widerstandsstufen' },
    { title: 'Liegeergometer',     handle: 'tunturi-liegeergometer',     description: 'E30-R, E750 — Volle Rückenunterstützung, gelenkschonend' },
    { title: 'Crosstrainer',       handle: 'tunturi-crosstrainer',       description: 'C20 — Wattgesteuertes Ganzkörpertraining' },
    { title: 'Laufband',           handle: 'tunturi-laufband',           description: 'T20, T30 — AC-Motor, breite Lauffläche mit Dämpfungssystem' },
    { title: 'Armergometer',       handle: 'tunturi-armergometer',       description: 'E685, E750 — Fluid-Widerstand, bidirektionales Training' },
  ],
}

export function getCollectionSubCollections(slug?: string): CollectionSubEntry[] {
  const normalized = normalizeCollectionSlug(slug)
  return collectionSubCollectionsMap[normalized] ?? []
}
