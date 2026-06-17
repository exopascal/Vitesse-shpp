<template>
  <span class="tax-note">zzgl. {{ rate }}% MwSt.</span>
</template>

<script setup>
defineProps({
  // Mehrwertsteuersatz in Prozent. Zentral hier pflegbar.
  rate: {
    type: Number,
    default: 19,
  },
})
</script>

<style scoped>
.tax-note {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 500;
  line-height: 1.2;
  color: var(--color-text-tertiary, #8a7f72);
  white-space: nowrap;
}
</style>
