<template>
  <div>
    <CategoryBar :activeId="id" />

    <div class="container">
      <div class="d-flex align-items-center justify-content-between mb-3">
        <h2 class="mb-0">Categoria: {{ category?.nome || '...' }}</h2>
        <RouterLink class="btn btn-outline-secondary btn-sm" to="/">Voltar</RouterLink>
      </div>

      <div v-if="loading" class="text-center my-5">
        <div class="spinner-border"></div>
      </div>

      <div v-else>
        <div class="row g-3">
          <div class="col-12 col-md-6 col-lg-4" v-for="r in posts" :key="r.id">
            <RecipeCard :recipe="{...r, categoria: category || undefined}" />
          </div>
        </div>
        <p v-if="posts.length === 0" class="text-muted mt-4">Nenhuma receita nesta categoria ainda.</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import CategoryBar from '../components/CategoryBar.vue'
import RecipeCard from '../components/RecipeCard.vue'
import type { Category as CategoryType, RecipeListItem } from '../types'
import { useCategoryStore } from '../stores/categories'

const props = defineProps<{ id: string | number }>()
const store = useCategoryStore()

const category = ref<CategoryType | null>(null)
const posts = ref<RecipeListItem[]>([])
const loading = ref(false)

async function load() {
  loading.value = true
  try {
    const data = await store.fetchOneWithPosts(Number(props.id))
    category.value = data.category
    posts.value = data.posts
  } finally { loading.value = false }
}

watch(() => props.id, load, { immediate: true })
onMounted(load)
</script>
