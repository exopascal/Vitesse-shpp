<script setup lang="ts">
defineProps<{ src: string; label?: string }>()
</script>

<template>
  <video
    :src="src"
    :aria-label="label"
    autoplay
    muted
    loop
    playsinline
    class="blog-video"
  />
</template>

<style scoped>
.blog-video {
  display: block;
  width: 100%;
  max-width: 560px;
  height: auto;
  border-radius: var(--border-radius-xl);
  margin: var(--spacing-2xl) auto;
}
</style>
