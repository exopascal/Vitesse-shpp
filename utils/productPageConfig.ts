export type ProductPageTemplate = 'main' | 'accessory'
export type ProductContentKey = 'default' | 't-apex' | 'exopek-pro' | 'tunturi' | 'optogait'

export interface ProductPagePreset {
  handles: string[]
  template: ProductPageTemplate
  contentKey: ProductContentKey
}

const defaultPreset: ProductPagePreset = {
  handles: [],
  template: 'main',
  contentKey: 'default',
}

export const productPagePresets: ProductPagePreset[] = [
  {
    handles: ['t-apex'],
    template: 'main',
    contentKey: 't-apex',
  },
  {
    handles: ['exopek-pro'],
    template: 'main',
    contentKey: 'exopek-pro',
  },
  {
    handles: ['tunturi-platinum-tr30-core-treadmill'],
    template: 'main',
    contentKey: 'tunturi',
  },
  {
    handles: ['optogait'],
    template: 'accessory',
    contentKey: 'optogait',
  },
]

export function normalizeProductHandle(value?: string) {
  return (value || '').trim().toLowerCase()
}

export function resolveProductPagePreset(handle?: string): ProductPagePreset {
  const normalizedHandle = normalizeProductHandle(handle)

  return (
    productPagePresets.find((preset) => preset.handles.includes(normalizedHandle)) ||
    defaultPreset
  )
}
