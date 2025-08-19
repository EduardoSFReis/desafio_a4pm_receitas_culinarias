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

      <div v-else-if="error" class="alert alert-danger" role="alert">
        <h4 class="alert-heading">Erro ao carregar a categoria</h4>
        <p>{{ errorMessage }}</p>
        <button class="btn btn-primary" @click="load">Tentar novamente</button>
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
const error = ref<Error | { code: string; message: string; details?: { context?: string; column?: string } } | null>(null)
const errorMessage = ref('')

async function load() {
  loading.value = true
  error.value = null
  errorMessage.value = ''

  try {
    const data = await store.fetchOneWithPosts(Number(props.id))
    category.value = data.category
    posts.value = data.posts
  } catch (err) {
    error.value = err as Error | { code: string; message: string; details?: { context?: string; column?: string } }

    if (err instanceof Error && err.message.includes('NetworkError')) {
      errorMessage.value = 'Erro de conexão com o servidor. Verifique sua internet e tente novamente.'
    } 
    else if (error.value && 'code' in error.value && 'message' in error.value) {
      const { code, message, details } = error.value
      errorMessage.value = `${message}${details?.context ? ` (${details.context})` : ''}${details?.column ? ` na coluna "${details.column}"` : ''}`
    } 
    else {
      errorMessage.value = 'Ocorreu um erro inesperado. Tente novamente mais tarde.'
    }
  } finally {
    loading.value = false
  }
}

watch(() => props.id, load, { immediate: true })
onMounted(load)
</script>
