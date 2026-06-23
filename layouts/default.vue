<template>
  <div class="default-layout">
    <Header siteName="Vitesse Sports" />

    <CommercialBanner />

    <!-- Page Content -->
    <main class="default-layout__content">
      <slot />
    </main>

    <Cart :isOpen="isCartOpen" @close="closeCart" />

    <Footer />

    <ClientOnly>
      <CookieConsent />
    </ClientOnly>

  </div>
</template>

<script setup>
const { isOpen: isCartOpen, closeCart } = useCartSidebar()
</script>

<style scoped>
.default-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 118px;
  background: #ffffff;
}

.default-layout__content {
  flex: 1;
}
</style>
