<template>
  <div class="collections-overview">
    <div v-if="isLoading" class="loading">
      Collections werden geladen...
    </div>

    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <div v-else class="collections-grid">
      <h1>Alle Kategorien</h1>
      <div class="grid">
        <NuxtLink
          v-for="collection in collections"
          :key="collection.id"
          :to="`/collections/${collection.handle}`"
          class="collection-card"
        >
          <div class="collection-image">
            <img
              v-if="collection.image"
              :src="collection.image"
              :alt="collection.title"
            />
            <div v-else class="no-image">
              {{ collection.title.charAt(0) }}
            </div>
          </div>

          <div class="collection-info">
            <h3>{{ collection.title }}</h3>
            <p v-if="collection.description" class="description">
              {{ collection.description }}
            </p>
            <span class="collection-cta">Kollektion ansehen →</span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useShopifyStore } from '../../store/shopifyStore'

const shopifyStore = useShopifyStore()

const { data, pending: isLoading, error: fetchError } = await useAsyncData(
  'all-collections',
  () => shopifyStore.fetchAllCollections()
)

const collections = computed(() => data.value ?? [])
const error = computed(() => fetchError.value ? 'Fehler beim Laden der Collections' : null)
</script>

<style scoped>
.collections-overview {
  padding: 2rem;
  min-height: 100vh;
}

.loading, .error {
  text-align: center;
  padding: 3rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin: 2rem 0;
}

.error {
  background-color: #fee;
  color: #c33;
}

.collections-grid h1 {
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
  color: #333;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.collection-card {
  display: block;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  text-decoration: none;
  color: inherit;
}

.collection-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.14);
}

.collection-image {
  height: 180px;
  position: relative;
  overflow: hidden;
  background: #f5f5f5;
}

.collection-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.no-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: bold;
  color: #bbb;
  background: linear-gradient(135deg, #f5f5f5, #e8e8e8);
}

.collection-info {
  padding: 1.25rem 1.5rem 1.5rem;
}

.collection-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: #1f2937;
}

.description {
  margin: 0 0 0.9rem 0;
  font-size: 0.9rem;
  color: #6b7280;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.collection-cta {
  font-size: 0.875rem;
  font-weight: 600;
  color: #0f5e9c;
}

@media (max-width: 640px) {
  .collections-overview {
    padding: 1.5rem 1rem;
  }

  .collections-grid h1 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }

  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.75rem;
  }

  .collection-image {
    height: 120px;
  }

  .no-image {
    font-size: 2rem;
  }

  .collection-info {
    padding: 0.9rem 1rem 1rem;
  }

  .collection-info h3 {
    font-size: 0.9rem;
  }

  .description {
    display: none;
  }
}
</style>
