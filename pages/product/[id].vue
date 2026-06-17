<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

await navigateTo(`/products/${route.params.id as string}`, {
  redirectCode: 301,
  replace: true,
})
</script>
