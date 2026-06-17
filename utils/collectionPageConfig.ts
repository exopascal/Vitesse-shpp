export type CollectionPageTemplate = 'default' | 'hero'
export type CollectionContentKey = 'default' | 'sprinttraining' | 'witty' | 'sportreact'

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
]

export function normalizeCollectionSlug(value?: string) {
  return (value || '').trim().toLowerCase()
}

export function resolveCollectionPagePreset(slug?: string): CollectionPagePreset {
  const normalizedSlug = normalizeCollectionSlug(slug)

  return (
    collectionPagePresets.find((preset) => preset.slugs.includes(normalizedSlug)) ||
    defaultPreset
  )
}
