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
          :selectedOptions="selectedOptions"
          :selectedVariant="selectedVariant"
          :quantity="quantity"
          :isLoading="isLoading"
          @addToCart="handleCartAdded"
          @selectOption="selectOption"
          @incrementQuantity="incrementQuantity"
          @decrementQuantity="decrementQuantity"
        />

        <template v-if="productPagePreset.template === 'main'">
          <ProductHighlights :product="product" :content="productDetailContent.highlights" />
          <ShopBanner :content="productDetailContent.banner" />
          <ProductFeatures :content="productDetailContent.features" />
        </template>

        <ProductFaq :product="product" :content="productDetailContent.faq" />
      </div>
    </div>
    
  </div>
  
</template>
  
  <script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useShopifyStore } from "../../store/shopifyStore";
import { useShopifyCardStore } from "../../store/shopifyCardStore";
import AccessoryProductTemplate from '~/components/productDetails/AccessoryProductTemplate.vue'
import ProductDetailsLayout from '~/components/productDetails/ProductDetailsLayout.vue'
import ProductFaq from '~/components/productDetails/ProductFaq.vue'
import ProductHighlights from '~/components/productDetails/ProductHighlights.vue'
import ShopBanner from '~/components/productDetails/ShopBanner.vue'
import ProductFeatures from '~/components/productDetails/ProductFeatures.vue'
import { getProductDetailContent } from '~/utils/productDetailContent'
import { resolveProductPagePreset } from '~/utils/productPageConfig'
import { createProductSchema, createBreadcrumbSchema, schemaToString } from '~/utils/schemas/productSchema'

// Route und Store
const route = useRoute();
const shopifyStore = useShopifyStore();
const shopifyCardStore = useShopifyCardStore();
const { openCart } = useCartSidebar();

// Produkt-Daten und Status
const product = ref<any>(null);
const loadingError = ref(false);
const isLoading = ref(true);
const quantity = ref(1);
const selectedOptions = ref<Record<string, string>>({});

// Produkt-Handle aus der Route
const handle = computed(() => route.params.id as string);

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

// Produkt laden
async function loadProduct() {
  isLoading.value = true;

  try {
    // Produkt aus API laden (verwende Handle statt ID)
    product.value = await (shopifyStore as any).fetchProductByHandle(handle.value);
    console.log("Product-Details:", product);
    console.log("Selected Options:", product.value.options);
    // Standardoptionen auswählen (erste verfügbare Option für jede Option)
    if (product.value && product.value.options) {
      product.value.options.forEach((option: any) => {
        // Erste verfügbare Option auswählen
        for (const value of option.values) {
          if (isOptionValueAvailable(option.name, value)) {
            selectedOptions.value[option.name] = value;
            break;
          }
        }
      });
    } else {
      console.log("Keine Optionen für das Produkt gefunden.");
      console.log("Produkt-Details:", product.value);
    }
  } catch (error) {
    console.error("Error loading product:", error);
  } finally {
    isLoading.value = false;
  }
}

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

// SEO: Meta tags + Schema.org (reaktiv auf Produktdaten)
watch(product, (p) => {
  if (!p) return

  const price = p.price ?? 0
  const image = p.featured_image ?? ''
  const siteUrl = useRuntimeConfig().public.siteUrl as string
  const url = `${siteUrl}/products/${handle.value}`
  const description = p.description
    ? p.description.slice(0, 160)
    : `${p.title} – Premium Trainingsgerät von Vitesse Sports.`

  useSeoMeta({
    title: p.title,
    description,
    ogTitle: `${p.title} | Vitesse Sports`,
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

  useHead({
    script: [
      { type: 'application/ld+json', innerHTML: schemaToString(productSchema) },
      { type: 'application/ld+json', innerHTML: schemaToString(breadcrumbSchema) },
    ],
  })
}, { immediate: true })

// Produkt bei Seitenaufruf laden
onMounted(() => {
  loadProduct();
});

// Bei Änderung der Route (z.B. Navigation zu einem anderen Produkt) neu laden
watch(
  () => route.params.id,
  () => {
    if (route.params.id) {
      loadProduct();
      // Zurücksetzen des Zustands
      selectedOptions.value = {};
      quantity.value = 1;
    }
  }
);
</script>
  
  <style scoped>
.loading,
.not-found {
  padding: 3rem;
  text-align: center;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin: 2rem 0;
}
</style>
