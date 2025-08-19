<template>
  <div class="container">
    <div class="d-flex flex-wrap gap-2 align-items-center mb-3">
      <RouterLink
        v-for="c in categories"
        :key="c.id"
        class="btn btn-sm"
        :class="Number(activeId) === c.id ? 'btn-primary' : 'btn-outline-primary'"
        :to="`/categoria/${c.id}`"
      >
        {{ c.nome }}
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Category } from '../types'
import { useCategoryStore } from '../stores/categories'

defineProps<{ activeId?: number | string }>()

const categories = ref<Category[]>([])
const store = useCategoryStore()

onMounted(async () => {
  categories.value = await store.fetchAll()
})
</script>
