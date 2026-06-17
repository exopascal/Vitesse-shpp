export function useCartSidebar() {
  const isOpen = useState('cart-sidebar-open', () => false)

  function openCart() {
    isOpen.value = true
  }

  function closeCart() {
    isOpen.value = false
  }

  function toggleCart() {
    isOpen.value = !isOpen.value
  }

  return {
    isOpen,
    openCart,
    closeCart,
    toggleCart,
  }
}
