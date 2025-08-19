<template>
  <div class="card h-100 shadow-sm">
    <div class="card-body d-flex flex-column">
      <h5 class="card-title">{{ recipe.nome }}</h5>
      <p class="card-text text-muted small mb-2">
        <span v-if="recipe.tempo_preparo_minutos != null">⏱️ {{ recipe.tempo_preparo_minutos }} min</span>
        <span v-if="recipe.porcoes != null" class="ms-2">🍽️ {{ recipe.porcoes }} porções</span>
      </p>
      <div class="mt-auto d-flex justify-content-between align-items-center">
        <span class="badge bg-secondary" v-if="recipe.categoria">{{ recipe.categoria.nome }}</span>
        <RouterLink class="btn btn-sm btn-outline-primary" :to="`/receita/${recipe.id}`">
          Detalhes
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RecipeListItem } from '../types'
defineProps<{ recipe: RecipeListItem }>()
</script>
