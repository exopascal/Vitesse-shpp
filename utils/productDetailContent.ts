import type { ShopifyProduct } from '~/types/domain/shopify'
import { resolveProductPagePreset, normalizeProductHandle } from '~/utils/productPageConfig'

import tApexJson from '~/content/products/t-apex.json'
import exopekProJson from '~/content/products/exopek-pro.json'
import tunturiJson from '~/content/products/tunturi.json'
import optogaitJson from '~/content/products/optogait.json'

export interface ProductHighlightsContentItem {
  body: string;
  image: string;
  alt: string;
}

export interface ProductHighlightsContent {
  kicker: string;
  title: string;
  ctaLabel: string;
  ctaHref: string;
  items: ProductHighlightsContentItem[];
}

export interface ProductBannerContent {
  title: string;
  text: string;
  image: string;
  alt: string;
  actionLabel?: string;
  actionHref?: string;
}

export interface ProductFeatureContentItem {
  title: string;
  description: string;
  image: string;
  alt: string;
}

export interface ProductFeaturesContent {
  title: string;
  items: ProductFeatureContentItem[];
}

export interface ProductFaqItem {
  question: string;
  answer: string[];
}

export interface ProductFaqContent {
  title: string;
  subtitle: string;
  items: ProductFaqItem[];
  initiallyOpen?: number[];
}

export interface ProductDetailContent {
  highlights: ProductHighlightsContent;
  banner: ProductBannerContent;
  features: ProductFeaturesContent;
  faq: ProductFaqContent;
}

const contentMap: Record<string, ProductDetailContent> = {
  't-apex': tApexJson as ProductDetailContent,
  'exopek-pro': exopekProJson as ProductDetailContent,
  'tunturi': tunturiJson as ProductDetailContent,
  'optogait': optogaitJson as ProductDetailContent,
}

const defaultContent: ProductDetailContent = {
  highlights: { kicker: '', title: '', ctaLabel: '', ctaHref: '', items: [] },
  banner: { title: '', text: '', image: '', alt: '' },
  features: { title: '', items: [] },
  faq: { title: 'FAQs', subtitle: 'Wir beantworten Deine Fragen', items: [], initiallyOpen: [] },
}

function resolveContentImages(content: ProductDetailContent, product?: ShopifyProduct | null): ProductDetailContent {
  const productImages = [...new Set(
    [...(product?.images || []), product?.featured_image].filter((img): img is string => Boolean(img))
  )]
  const placeholder = 'https://placehold.co/1200x900'
  const resolve = (img: string, index: number) =>
    img || productImages[index % Math.max(productImages.length, 1)] || placeholder

  return {
    ...content,
    highlights: {
      ...content.highlights,
      items: content.highlights.items.map((item, i) => ({ ...item, image: resolve(item.image, i) })),
    },
    banner: {
      ...content.banner,
      image: resolve(content.banner.image, 0),
    },
    features: {
      ...content.features,
      items: content.features.items.map((item, i) => ({ ...item, image: resolve(item.image, i) })),
    },
  }
}

export function getProductDetailContent(product?: ShopifyProduct | null): ProductDetailContent {
  const preset = resolveProductPagePreset(normalizeProductHandle(product?.handle))
  const raw = contentMap[preset.contentKey]
  if (!raw) return defaultContent
  return resolveContentImages(raw, product)
}
