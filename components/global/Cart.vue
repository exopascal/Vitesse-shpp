<template>
  <div>
    <Transition name="slide-in">
      <div v-if="props.isOpen" class="cart-sidebar">

        <!-- Header -->
        <div class="cart-header">
          <h2 class="cart-title">WARENKORB</h2>
          <button class="close-btn" @click="closeCart" aria-label="Warenkorb schließen">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M1.5 1.5L16.5 16.5M16.5 1.5L1.5 16.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>

        <!-- Scrollable body -->
        <div class="cart-body">

          <!-- Reservation notice -->
          <div v-if="cartItems.length > 0" class="reservation-notice">
            <svg class="notice-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/>
              <path d="M8 7.5v3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              <circle cx="8" cy="5.5" r="0.8" fill="currentColor"/>
            </svg>
            <p class="notice-text">
              <strong>Deine Artikel sind noch nicht reserviert,</strong> gehe schnell zur Kasse, damit du nichts verpasst.
            </p>
          </div>

          <!-- Cart items -->
          <div v-if="cartItems.length > 0" class="cart-items">
            <div v-for="item in cartItems" :key="item.id" class="cart-item">
              <div class="item-image">
                <img v-if="item.featuredImage" :src="item.featuredImage" :alt="item.title" />
                <div v-else class="img-placeholder" />
              </div>
              <div class="item-details">
                <h4 class="item-name">{{ item.title }}</h4>
                <p v-if="item.variantTitle && item.variantTitle !== 'Default Title'" class="item-variant">
                  {{ item.variantTitle }}
                </p>
                <div class="item-foot">
                  <span class="item-price">{{ formatMoney(item.price) }}</span>
                  <div class="qty-stepper">
                    <button
                      class="qty-btn"
                      @click="changeQty(item, -1)"
                      :disabled="shopifyStore.loading"
                      aria-label="Menge verringern"
                    >−</button>
                    <span class="qty-val">{{ item.quantity }}</span>
                    <button
                      class="qty-btn"
                      @click="changeQty(item, 1)"
                      :disabled="shopifyStore.loading"
                      aria-label="Menge erhöhen"
                    >+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty state -->
          <div v-else class="cart-empty">
            <p>Dein Warenkorb ist leer.</p>
          </div>

          <!-- Cross-sell -->
          <div v-if="recommendedProducts.length > 0" class="cross-sell">
            <div class="cs-scroll">
              <div v-for="rp in recommendedProducts" :key="rp.id" class="cs-card">
                <div class="cs-img">
                  <img :src="rp.image" :alt="rp.title" />
                </div>
                <div class="cs-info">
                  <p class="cs-name">{{ rp.title }}</p>
                  <p class="cs-price">{{ formatMoney(rp.price) }}</p>
                </div>
                <button class="cs-add" @click="addRecommendedProduct(rp)">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M5 1v8M1 5h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>
                  Hinzufügen
                </button>
              </div>
            </div>
          </div>

          <!-- Order summary -->
          <div v-if="cartItems.length > 0" class="order-summary">
            <p class="summary-label">BESTELLÜBERSICHT</p>
            <div class="summary-row">
              <span>Zwischensumme</span>
              <span>{{ formatMoney(totalAmount) }}</span>
            </div>
            <hr class="summary-hr" />
            <div class="summary-row summary-row--total">
              <span>Gesamt</span>
              <span>{{ formatMoney(totalAmount) }}</span>
            </div>
          </div>

        </div>

        <!-- Checkout footer (sticky) -->
        <div v-if="cartItems.length > 0" class="checkout-footer">
          <button class="checkout-btn" @click="goToCheckout">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <rect x="1.5" y="6.5" width="12" height="8" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
              <path d="M4.5 6.5V4.5a3 3 0 0 1 6 0v2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            Sicherer Checkout
          </button>
          <div class="payment-row">
            <!-- Visa -->
            <svg class="pay-icon" viewBox="0 0 48 30" aria-label="Visa">
              <rect width="48" height="30" rx="4" fill="#fff" stroke="#e0e0e0" stroke-width="1"/>
              <text x="24" y="20" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" font-weight="bold" font-style="italic" fill="#1A1F71">VISA</text>
            </svg>
            <!-- Mastercard -->
            <svg class="pay-icon" viewBox="0 0 48 30" aria-label="Mastercard">
              <rect width="48" height="30" rx="4" fill="#fff" stroke="#e0e0e0" stroke-width="1"/>
              <circle cx="19" cy="15" r="7.5" fill="#EB001B"/>
              <circle cx="29" cy="15" r="7.5" fill="#F79E1B" fill-opacity="0.92"/>
            </svg>
            <!-- PayPal -->
            <svg class="pay-icon" viewBox="0 0 48 30" aria-label="PayPal">
              <rect width="48" height="30" rx="4" fill="#fff" stroke="#e0e0e0" stroke-width="1"/>
              <text x="24" y="19" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" font-weight="bold">
                <tspan fill="#003087">Pay</tspan><tspan fill="#009CDE">Pal</tspan>
              </text>
            </svg>
            <!-- Apple Pay -->
            <svg class="pay-icon" viewBox="0 0 48 30" aria-label="Apple Pay">
              <rect width="48" height="30" rx="4" fill="#000"/>
              <text x="24" y="20" text-anchor="middle" font-family="-apple-system,BlinkMacSystemFont,Arial,sans-serif" font-size="9.5" font-weight="600" fill="#fff">Apple Pay</text>
            </svg>
            <!-- Klarna -->
            <svg class="pay-icon" viewBox="0 0 48 30" aria-label="Klarna">
              <rect width="48" height="30" rx="4" fill="#FFB3C7"/>
              <text x="24" y="20" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" font-weight="bold" fill="#000">klarna.</text>
            </svg>
          </div>
        </div>

      </div>
    </Transition>

    <Transition name="fade">
      <div v-if="props.isOpen" class="cart-overlay" @click="closeCart" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useShopifyCardStore, type ShopifyCartItem } from '../../store/shopifyCardStore'

interface RecommendedProduct {
  id: string
  title: string
  price: number
  image: string
  variantId: string
}

const shopifyStore = useShopifyCardStore()

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'update:isOpen'])

const recommendedProducts = ref<RecommendedProduct[]>([])

const cartItems = computed(() => shopifyStore.cart.items ?? [])
const totalAmount = computed(() => shopifyStore.cart.totalAmount ?? 0)

function closeCart() {
  emit('close')
  emit('update:isOpen', false)
}

function formatMoney(amount: number) {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: shopifyStore.cart.currencyCode || 'EUR'
  }).format(amount)
}

function goToCheckout() {
  const url = shopifyStore.cart.checkoutUrl
  if (url) window.location.href = url
}

async function changeQty(item: ShopifyCartItem, delta: number) {
  const newQty = item.quantity + delta
  if (newQty <= 0) {
    await shopifyStore.removeCartItem(item.id)
  } else {
    await shopifyStore.updateCartItemQuantity(item.id, newQty)
  }
}

async function addRecommendedProduct(product: RecommendedProduct) {
  await shopifyStore.addToCart(product.variantId, 1)
}

async function loadRecommendations() {
  const firstItem = cartItems.value[0]
  if (!firstItem) return
  try {
    const recs = await shopifyStore.fetchProductRecommendations(firstItem.productId)
    const inCartIds = new Set(cartItems.value.map(i => i.productId))
    recommendedProducts.value = recs.filter(r => !inCartIds.has(r.id))
  } catch {
    recommendedProducts.value = []
  }
}

watch(() => props.isOpen, async (open) => {
  if (open) {
    await shopifyStore.getCartData()
    await loadRecommendations()
  }
})
</script>

<style scoped>
.cart-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 420px;
  max-width: 100vw;
  height: 100vh;
  background: #fff;
  box-shadow: -4px 0 32px rgba(0, 0, 0, 0.12);
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.cart-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 999;
}

/* Header */
.cart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #f0f0f0;
  flex-shrink: 0;
}

.cart-title {
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.1em;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
  padding: 6px;
  display: flex;
  align-items: center;
  line-height: 1;
  transition: opacity 0.15s;
}
.close-btn:hover { opacity: 0.5; }

/* Scrollable body */
.cart-body {
  flex: 1;
  overflow-y: auto;
  padding: 0 24px;
  scrollbar-width: thin;
  scrollbar-color: #e0e0e0 transparent;
}

/* Reservation notice */
.reservation-notice {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  background: #f8f8f8;
  border: 1px solid #ebebeb;
  border-radius: 8px;
  padding: 12px 14px;
  margin: 16px 0;
  font-size: 12.5px;
  line-height: 1.45;
  color: #444;
}
.notice-icon { flex-shrink: 0; margin-top: 1px; color: #555; }
.notice-text { margin: 0; }
.notice-text strong { font-weight: 700; }

/* Cart items */
.cart-items { padding-top: 4px; }

.cart-item {
  display: flex;
  gap: 14px;
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
}

.item-image {
  width: 84px;
  height: 84px;
  flex-shrink: 0;
  border-radius: 6px;
  overflow: hidden;
  background: #f5f5f5;
}
.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.img-placeholder { width: 100%; height: 100%; }

.item-details {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.item-name {
  font-size: 13px;
  font-weight: 600;
  margin: 0 0 3px;
  line-height: 1.3;
  color: #111;
}
.item-variant {
  font-size: 12px;
  color: #888;
  margin: 0 0 8px;
}

.item-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
}
.item-price {
  font-size: 14px;
  font-weight: 700;
  color: #111;
}

.qty-stepper {
  display: flex;
  align-items: center;
  border: 1px solid #dedede;
  border-radius: 4px;
  overflow: hidden;
}
.qty-btn {
  width: 30px;
  height: 30px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  transition: background 0.1s;
}
.qty-btn:hover:not(:disabled) { background: #f5f5f5; }
.qty-btn:disabled { opacity: 0.35; cursor: default; }
.qty-val {
  font-size: 13px;
  font-weight: 600;
  min-width: 28px;
  text-align: center;
  line-height: 30px;
  border-left: 1px solid #dedede;
  border-right: 1px solid #dedede;
}

/* Empty state */
.cart-empty {
  padding: 48px 0;
  text-align: center;
  color: #aaa;
  font-size: 14px;
}

/* Cross-sell */
.cross-sell {
  padding: 18px 0;
  border-bottom: 1px solid #f0f0f0;
}
.cs-scroll {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 4px;
  scrollbar-width: none;
}
.cs-scroll::-webkit-scrollbar { display: none; }
.cs-card {
  flex: 0 0 152px;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.cs-img {
  width: 100%;
  aspect-ratio: 1;
  background: #f5f5f5;
  border-radius: 4px;
  overflow: hidden;
}
.cs-img img { width: 100%; height: 100%; object-fit: cover; }
.cs-info { flex: 1; }
.cs-name {
  font-size: 11.5px;
  font-weight: 500;
  margin: 0 0 2px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.cs-price {
  font-size: 12px;
  font-weight: 700;
  color: #111;
  margin: 0;
}
.cs-add {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 8px 8px;
  background: #111;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  width: 100%;
  transition: background 0.15s;
}
.cs-add:hover { background: #333; }

/* Order summary */
.order-summary { padding: 20px 0; }
.summary-label {
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: 0.1em;
  margin: 0 0 14px;
  color: #222;
}
.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
}
.summary-hr {
  border: none;
  border-top: 1px solid #eee;
  margin: 12px 0;
}
.summary-row--total {
  font-weight: 700;
  font-size: 15px;
  color: #111;
  margin-bottom: 0;
}

/* Checkout footer */
.checkout-footer {
  flex-shrink: 0;
  border-top: 1px solid #f0f0f0;
  padding: 16px 24px 20px;
  background: #fff;
}
.checkout-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 15px;
  background: #111;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: background 0.15s;
  margin-bottom: 14px;
}
.checkout-btn:hover { background: #2a2a2a; }

.payment-row {
  display: flex;
  justify-content: center;
  gap: 6px;
  flex-wrap: wrap;
}
.pay-icon {
  height: 24px;
  width: auto;
}

/* Transitions */
.slide-in-enter-active,
.slide-in-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-in-enter-from,
.slide-in-leave-to {
  transform: translateX(100%);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
