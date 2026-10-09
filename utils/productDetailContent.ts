import type { ShopifyProduct } from '~/types/domain/shopify'
import { resolveProductPagePreset, normalizeProductHandle } from '~/utils/productPageConfig'

import tApexJson from '~/content/products/t-apex.json'
import exopekProJson from '~/content/products/exopek-pro.json'
import tunturiJson from '~/content/products/tunturi.json'
import tunturiC20Json from '~/content/products/tunturi-c20.json'
import tunturiT20Json from '~/content/products/tunturi-t20.json'
import tunturiE20Json from '~/content/products/tunturi-e20.json'
import tunturiE30Json from '~/content/products/tunturi-e30.json'
import tunturiE30RJson from '~/content/products/tunturi-e30-r.json'
import tunturiS10Json from '~/content/products/tunturi-s10.json'
import tunturiS20Json from '~/content/products/tunturi-s20.json'
import optogaitJson from '~/content/products/optogait.json'
import fluidRowerE685Json from '~/content/products/armergometer-fluid-rower-e685.json'
import fluidRowerE750Json from '~/content/products/liegeergometer-armergometer-fluid-rower-e750.json'

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
  shortDescription?: string;
  highlights: ProductHighlightsContent;
  banner: ProductBannerContent;
  features: ProductFeaturesContent;
  faq: ProductFaqContent;
}

const contentMap: Record<string, ProductDetailContent> = {
  't-apex': tApexJson as ProductDetailContent,
  'exopek-pro': exopekProJson as ProductDetailContent,
  'tunturi': tunturiJson as ProductDetailContent,
  'tunturi-c20': tunturiC20Json as ProductDetailContent,
  'tunturi-t20': tunturiT20Json as ProductDetailContent,
  'tunturi-e20': tunturiE20Json as ProductDetailContent,
  'tunturi-e30': tunturiE30Json as ProductDetailContent,
  'tunturi-e30-r': tunturiE30RJson as ProductDetailContent,
  'tunturi-s10': tunturiS10Json as ProductDetailContent,
  'tunturi-s20': tunturiS20Json as ProductDetailContent,
  'optogait': optogaitJson as ProductDetailContent,
  'fluid-rower-e685': fluidRowerE685Json as ProductDetailContent,
  'fluid-rower-e750': fluidRowerE750Json as ProductDetailContent,
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
