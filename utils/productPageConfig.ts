export type ProductPageTemplate = 'main' | 'accessory'
export type ProductContentKey = 'default' | 't-apex' | 'exopek-pro' | 'tunturi' | 'tunturi-c20' | 'tunturi-t20' | 'tunturi-e20' | 'tunturi-e30' | 'tunturi-e30-r' | 'tunturi-s10' | 'tunturi-s20' | 'optogait' | 'fluid-rower-e685' | 'fluid-rower-e750'

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
    handles: ['tunturi-platinum-t30-core-laufband'],
    template: 'main',
    contentKey: 'tunturi',
  },
  {
    handles: ['tunturi-platinum-c20-crosstrainer'],
    template: 'main',
    contentKey: 'tunturi-c20',
  },
  {
    handles: ['tunturi-platinum-t20-laufband'],
    template: 'main',
    contentKey: 'tunturi-t20',
  },
  {
    handles: ['tunturi-platinum-e20-fahrradergometer'],
    template: 'main',
    contentKey: 'tunturi-e20',
  },
  {
    handles: ['tunturi-platinum-e30-fahrradergometer'],
    template: 'main',
    contentKey: 'tunturi-e30',
  },
  {
    handles: ['tunturi-platinum-e30-r-liegeergometer'],
    template: 'main',
    contentKey: 'tunturi-e30-r',
  },
  {
    handles: ['tunturi-platinum-s10-indoor-bike'],
    template: 'main',
    contentKey: 'tunturi-s10',
  },
  {
    handles: ['tunturi-platinum-s20-indoor-bike'],
    template: 'main',
    contentKey: 'tunturi-s20',
  },
  {
    handles: ['optogait'],
    template: 'accessory',
    contentKey: 'optogait',
  },
  {
    handles: ['armergometer-fluid-rower-e685'],
    template: 'main',
    contentKey: 'fluid-rower-e685',
  },
  {
    handles: ['liegeergometer-armergometer-fluid-rower-e750'],
    template: 'main',
    contentKey: 'fluid-rower-e750',
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
