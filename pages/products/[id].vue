<template>
  <div class="product-detail-container">
    <div v-if="isLoading" class="loading">Produkt wird geladen...</div>
    <div v-else-if="!product" class="not-found">Produkt nicht gefunden.</div>
    <div v-else>
      <div>
        <AccessoryProductTemplate
          v-if="productPagePreset.template === 'accessory'"
          :product="product"
          :selectedOptions="selectedOptions"
          :selectedVariant="selectedVariant"
          :quantity="quantity"
          :isLoading="isLoading"
          :content="productDetailContent"
          @addToCart="handleCartAdded"
          @selectOption="selectOption"
          @incrementQuantity="incrementQuantity"
          @decrementQuantity="decrementQuantity"
        />
        <ProductDetailsLayout
          v-else
          :product="product"
          :shortDescription="productDetailContent.shortDescription"
          :pageTitle="productDetailContent.seoMeta?.h1"
          :selectedOptions="selectedOptions"
          :selectedVariant="selectedVariant"
          :quantity="quantity"
          :isLoading="isLoading"
          @addToCart="handleCartAdded"
          @selectOption="selectOption"
          @incrementQuantity="incrementQuantity"
          @decrementQuantity="decrementQuantity"
        />

        <ProductCinematicHero
          v-if="productPagePreset.contentKey === 't-apex' && product"
          :product="product"
          :selectedOptions="selectedOptions"
          :selectedVariant="selectedVariant"
          @selectOption="selectOption"
          @addToCart="addToCart"
        />

        <template v-if="productPagePreset.template === 'main'">
          <section v-if="productVideos.length" class="product-videos">
            <div class="product-videos__inner">
              <video
                v-for="(src, i) in productVideos"
                :key="i"
                :src="src"
                autoplay
                muted
                playsinline
                class="product-videos__video"
              />
            </div>
          </section>
          <ProductHighlights :product="product" :content="productDetailContent.highlights" />
          <ShopBanner :content="productDetailContent.banner" />
          <ProductCoachBenefits
            v-if="productDetailContent.coachBenefits"
            :content="productDetailContent.coachBenefits"
          />
          <template v-if="productPagePreset.contentKey === 't-apex'">
            <ProductEnvironment />
            <ProductTrainingModes />
            <ProductDataSection />
          </template>
          <template v-for="(uc, i) in productDetailContent.useCases" :key="i">
            <ProductUseCaseSplit
              :image="uc.image"
              :image-alt="uc.imageAlt"
              :kicker="uc.kicker"
              :title="uc.title"
              :text="uc.text"
              :link="uc.link"
              :link-label="uc.linkLabel"
              :image-right="uc.imageRight"
              :image-aspect-ratio="uc.imageAspectRatio"
            />
            <ProductBlogStrip v-if="i === 0 && productPagePreset.contentKey === 't-apex'" />
          </template>
          <ProductFeaturesAccordion
            v-if="productDetailContent.featuresAccordion"
            :content="productDetailContent.featuresAccordion"
          />
          <ProductFeatures :content="productDetailContent.features" />
        </template>

        <ProductInBox
          v-if="productDetailContent.inBox"
          :content="productDetailContent.inBox"
        />
        <ProductFaq :product="product" :content="productDetailContent.faq" />

        <ProductBlogTeaser
          v-if="productDetailContent.blogTeaser"
          :content="productDetailContent.blogTeaser"
        />
      </div>
    </div>

  </div>
  
</template>
  
  <script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useShopifyStore } from "../../store/shopifyStore";
import { useShopifyCardStore } from "../../store/shopifyCardStore";
import AccessoryProductTemplate from '~/components/productDetails/AccessoryProductTemplate.vue'
import ProductDetailsLayout from '~/components/productDetails/ProductDetailsLayout.vue'
import ProductFaq from '~/components/productDetails/ProductFaq.vue'
import ProductHighlights from '~/components/productDetails/ProductHighlights.vue'
import ShopBanner from '~/components/productDetails/ShopBanner.vue'
import ProductFeatures from '~/components/productDetails/ProductFeatures.vue'
import ProductBlogTeaser from '~/components/productDetails/ProductBlogTeaser.vue'
import ProductFeaturesAccordion from '~/components/productDetails/ProductFeaturesAccordion.vue'
import ProductCoachBenefits from '~/components/productDetails/ProductCoachBenefits.vue'
import ProductUseCaseSplit from '~/components/productDetails/ProductUseCaseSplit.vue'
import ProductTrainingModes from '~/components/productDetails/ProductTrainingModes.vue'
import ProductInBox from '~/components/productDetails/ProductInBox.vue'
import ProductCinematicHero from '~/components/productDetails/ProductCinematicHero.vue'
import ProductEnvironment from '~/components/productDetails/ProductEnvironment.vue'
import ProductBlogStrip from '~/components/productDetails/ProductBlogStrip.vue'
import ProductDataSection from '~/components/productDetails/ProductDataSection.vue'
import { getProductDetailContent } from '~/utils/productDetailContent'
import { resolveProductPagePreset } from '~/utils/productPageConfig'
import { getProductVideos } from '~/utils/productVideos'
import { createProductSchema, createFAQSchema, createBreadcrumbSchema, schemaToString } from '~/utils/schemas/productSchema'

// Route und Store
const route = useRoute();
const shopifyStore = useShopifyStore();
const shopifyCardStore = useShopifyCardStore();
const { openCart } = useCartSidebar();
const siteUrl = (useRuntimeConfig().public.siteUrl as string) || 'https://www.vitesse-sports.de'

const quantity = ref(1);
const selectedOptions = ref<Record<string, string>>({});

// Produkt-Handle aus der Route
const handle = computed(() => route.params.id as string);

// SSR-kompatibler Produkt-Fetch – liefert Daten auch beim ersten Googlebot-Crawl
const { data: product, status: productStatus } = await useAsyncData(
  () => `product-${handle.value}`,
  () => shopifyStore.fetchProductByHandle(handle.value),
)
const isLoading = computed(() => productStatus.value === 'pending')

// Ausgewählte Variante basierend auf den gewählten Optionen
const selectedVariant = computed(() => {
  if (!product.value || !product.value.variants) return null;

  return product.value.variants.find((variant: any) => {
    return variant.selectedOptions.every((option: any) => {
      return selectedOptions.value[option.name] === option.value;
    });
  });
});

const productDetailContent = computed(() => getProductDetailContent(product.value))
const productPagePreset = computed(() => resolveProductPagePreset(handle.value))
const productVideos = computed(() => getProductVideos(handle.value))

function handleCartAdded() {
  openCart();
}

// Verfügbarkeit basierend auf der gewählten Variante
const isAvailable = computed(() => {
  if (selectedVariant.value) {
    return selectedVariant.value.availableForSale;
  }
  return product.value?.available || false;
});

// Removed: base64ProductId - now using handle directly

// Standardoptionen initialisieren sobald Produktdaten vorliegen
watch(product, (p) => {
  if (!p?.options || Object.keys(selectedOptions.value).length > 0) return
  p.options.forEach((option: any) => {
    for (const value of option.values) {
      if (isOptionValueAvailable(option.name, value)) {
        selectedOptions.value[option.name] = value
        break
      }
    }
  })
}, { immediate: true })

// Prüfen, ob eine Optionskombination verfügbar ist
function isOptionValueAvailable(optionName: string, optionValue: string) {
  if (!product.value || !product.value.variants) return false;

  // Aktuelle Auswahl kopieren
  const testOptions = { ...selectedOptions.value };
  testOptions[optionName] = optionValue;

  // Prüfen, ob es eine verfügbare Variante mit dieser Optionskombination gibt
  return product.value.variants.some((variant: any) => {
    // Prüfen, ob alle Optionen übereinstimmen
    const optionsMatch = variant.selectedOptions.every((option: any) => {
      return (
        !testOptions[option.name] || testOptions[option.name] === option.value
      );
    });

    return optionsMatch && variant.availableForSale;
  });
}

// Option auswählen
function selectOption(optionName: string, optionValue: string) {
  selectedOptions.value[optionName] = optionValue;
}

// Menge erhöhen
function incrementQuantity() {
  console.log("Menge erhöhen");
  console.log("Menage",quantity.value);
  if (
    selectedVariant.value &&
    quantity.value < selectedVariant.value.quantityAvailable
  ) {
    quantity.value++;
  } else if (!selectedVariant.value) {
    quantity.value++;
  }
}

// Menge verringern
function decrementQuantity() {
  if (quantity.value > 1) {
    quantity.value--;
  }
}

// In den Warenkorb legen
async function addToCart() {
  console.log("In den Warenkorb legen");
  if (!isAvailable.value) return;

  console.log("Produkt zum Warenkorb hinzufügen...", product.value.variant_id);
  const variantId = selectedVariant.value?.id || product.value.variant_id;
  const productToAdd = {
    id: variantId,
    title: product.value.title,
    variantTitle: selectedVariant.value?.title || "",
    price: selectedVariant.value?.price || product.value.price,
    image: selectedVariant.value?.image?.url || product.value.featured_image,
    quantity: quantity.value,
  };

  // Hier Ihre Warenkorb-Logik implementieren
  console.log("Produkt zum Warenkorb hinzugefügt:", productToAdd);
  try {
    // Produkt add to cart
    await shopifyCardStore.addToCart(variantId, 1);

    // Warenkorb öffnen
    console.log("Warenkorb öffnen");
    openCart();
  } catch (error) {
    console.error("Error adding to  art:", error);
  } finally {
    isLoading.value = false;
  }

}

// Preis formatieren
function formatPrice(price: number) {
  if (!price) return "€0,00";

  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}

// SEO: Meta tags + Schema.org (reaktiv auf Produktdaten, inkl. SSR durch useAsyncData)
watch(product, (p) => {
  if (!p) return

  const price = p.price ?? 0
  const image = p.featured_image ?? ''
  const url = `${siteUrl}/products/${handle.value}`
  const seoMeta = productDetailContent.value.seoMeta
  const pageTitle = seoMeta?.title || p.title
  const description = seoMeta?.description
    || (p.description ? p.description.slice(0, 160) : `${p.title} – Premium Trainingsgerät von Vitesse Sports.`)

  useSeoMeta({
    title: pageTitle,
    description,
    ogTitle: `${pageTitle} | Vitesse Sports`,
    ogDescription: description,
    ogImage: image,
    ogUrl: url,
    ogType: 'product',
  })

  const productSchema = createProductSchema({
    name: p.title,
    description: p.description ?? description,
    image,
    price,
    availability: p.available ? 'InStock' : 'OutOfStock',
    url,
    ...(p.vendor && { brand: p.vendor }),
    ...(p.reviewSummary?.ratingValue && {
      ratingValue: p.reviewSummary.ratingValue,
      ratingCount: p.reviewSummary.reviewCount ?? 1,
    }),
  })

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: siteUrl },
    { name: 'Produkte', url: `${siteUrl}/products` },
    { name: p.title, url },
  ])

  const faqItems = productDetailContent.value.faq.items
  const scripts: any[] = [
    { type: 'application/ld+json', innerHTML: schemaToString(productSchema) },
    { type: 'application/ld+json', innerHTML: schemaToString(breadcrumbSchema) },
  ]
  if (faqItems.length > 0) {
    const faqSchema = createFAQSchema(
      faqItems.map(item => ({ question: item.question, answer: item.answer.join(' ') }))
    )
    scripts.push({ type: 'application/ld+json', innerHTML: schemaToString(faqSchema) })
  }

  useHead({ script: scripts })
}, { immediate: true })

// Zustand bei Routenwechsel zurücksetzen (useAsyncData lädt automatisch neu via computed key)
watch(
  () => route.params.id,
  () => {
    if (route.params.id) {
      selectedOptions.value = {};
      quantity.value = 1;
    }
  }
);
</script>
  
  <style scoped>
.product-videos {
  width: 100%;
  background: #000;
}

.product-videos__inner {
  max-width: 1500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.product-videos__video {
  display: block;
  width: 100%;
  height: auto;
}

.loading,
.not-found {
  padding: 3rem;
  text-align: center;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin: 2rem 0;
}
</style>
