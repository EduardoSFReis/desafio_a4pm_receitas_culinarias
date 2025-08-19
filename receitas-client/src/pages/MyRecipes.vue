<template>
  <div class="container">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2 class="mb-0">Minhas receitas</h2>
      <RouterLink to="/criar" class="btn btn-primary">Nova receita</RouterLink>
    </div>

    <div class="input-group mb-3">
      <span class="input-group-text">Pesquisar</span>
      <input v-model="q" type="search" class="form-control" placeholder="por nome, ingrediente, modo de preparo..." @keyup.enter="load" />
      <button class="btn btn-outline-secondary" @click="load">Buscar</button>
    </div>

    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border"></div>
    </div>

    <div v-else>
      <div class="row g-3">
        <div class="col-12 col-md-6" v-for="r in items" :key="r.id">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title mb-1">{{ r.nome }}</h5>
              <p class="text-muted small mb-2">
                <span v-if="r.tempo_preparo_minutos != null">⏱️ {{ r.tempo_preparo_minutos }} min</span>
                <span v-if="r.porcoes != null" class="ms-2">🍽️ {{ r.porcoes }} porções</span>
              </p>
              <div class="d-flex gap-2">
                <RouterLink class="btn btn-sm btn-outline-primary" :to="`/receita/${r.id}`">Detalhes</RouterLink>
                <RouterLink class="btn btn-sm btn-outline-secondary" :to="{ name: 'edit', params: { id: r.id } }">Editar</RouterLink>
                <button class="btn btn-sm btn-outline-danger" @click="remove(r.id)">Excluir</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p v-if="items.length === 0" class="text-muted mt-4">Nenhuma receita encontrada.</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { RecipeListItem } from '../types'
import { useRecipeStore } from '../stores/recipes'

const store = useRecipeStore()
const q = ref('')
const items = ref<RecipeListItem[]>([])
const loading = ref(false)

async function load() {
  loading.value = true
  try {
    items.value = await store.fetchMine(q.value || undefined)
  } finally { loading.value = false }
}

async function remove(id: number) {
  if (!confirm('Tem certeza que deseja excluir?')) return
  await store.remove(id)
  await load()
}

onMounted(load)
</script>
