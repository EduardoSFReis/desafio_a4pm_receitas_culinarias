<template>
  <div>
    <div class="container">
      <div class="d-flex align-items-center justify-content-between mb-3">
        <h2 class="mb-0">Categorias</h2>
      </div>

      <!-- GRADE ÚNICA DE CATEGORIAS -->
      <div class="row g-3" v-if="categories.length">
        <div class="col-6 col-md-3 col-lg-2" v-for="c in categories" :key="c.id">
          <RouterLink :to="`/categoria/${c.id}`" class="btn btn-outline-secondary w-100">
            {{ c.nome }}
          </RouterLink>
        </div>
      </div>
      <div v-else class="text-muted">Carregando categorias...</div>
    </div>

    <hr class="my-4" />

    <div class="container">
      <div class="d-flex align-items-center justify-content-between mb-3">
        <h2 class="mb-0">Todas as receitas</h2>
        <small class="text-muted">Página {{ currentPage }} de {{ totalPages }}</small>
      </div>

      <div class="row g-3">
        <div class="col-12 col-md-6 col-lg-4" v-for="r in paged" :key="r.id">
          <RecipeCard :recipe="r" />
        </div>
      </div>

      <Pagination
        class="mt-3"
        :total="recipes.length"
        :pageSize="pageSize"
        v-model:currentPage="currentPage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { RecipeListItem, Category } from '../types'
import RecipeCard from '../components/RecipeCard.vue'
import Pagination from '../components/Pagination.vue'
import { useRecipeStore } from '../stores/recipes'
import { useCategoryStore } from '../stores/categories'

const recipeStore = useRecipeStore()
const categoryStore = useCategoryStore()
const route = useRoute()

const recipes = ref<RecipeListItem[]>([])
const categories = ref<Category[]>([])

const currentPage = ref(1)
const pageSize = ref(9)

const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize.value)))
const paged = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filtered.value.slice(start, start + pageSize.value)
})

const filtered = computed(() => {
  const q = (route.query.q as string || '').toLowerCase()
  if (!q) return recipes.value
  return recipes.value.filter(r =>
    r.nome.toLowerCase().includes(q) ||
    r.categoria?.nome.toLowerCase().includes(q)
  )
})

onMounted(async () => {
  categories.value = await categoryStore.fetchAll()
  recipes.value = await recipeStore.fetchAll()
})

watch(() => route.query.q, () => { currentPage.value = 1 })
</script>
