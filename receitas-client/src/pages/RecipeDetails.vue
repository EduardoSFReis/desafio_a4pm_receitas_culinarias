<template>
  <div v-if="!loading && recipe">
    <div class="print-toolbar no-print">
      <RouterLink class="btn btn-outline-secondary" to="/">← Voltar</RouterLink>
      <button class="btn btn-primary" @click="printNow">Imprimir</button>
    </div>

    <div id="print-area" class="print-page">
      <h1 class="title">{{ recipe.nome }}</h1>

      <p class="meta">
        <span v-if="recipe.tempo_preparo_minutos != null">Tempo: {{ recipe.tempo_preparo_minutos }} min</span>
        <span v-if="recipe.porcoes != null">• Porções: {{ recipe.porcoes }}</span>
        <span v-if="recipe.categoria">• Categoria: {{ recipe.categoria.nome }}</span>
      </p>

      <hr />

      <section class="section">
        <h2>Ingredientes</h2>
        <ul class="bullets">
          <li v-for="(ing, i) in ingredientsLines" :key="i">{{ ing }}</li>
        </ul>
      </section>

      <section class="section">
        <h2>Modo de preparo</h2>
        <div class="steps">{{ recipe.modo_preparo }}</div>
      </section>
    </div>
  </div>

  <div v-else class="text-center my-5">
    <div class="spinner-border"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { RecipeDetails } from '../types'
import { useRecipeStore } from '../stores/recipes'

const props = defineProps<{ id: string | number }>()
const store = useRecipeStore()

const recipe = ref<RecipeDetails | null>(null)
const loading = ref(true)

const ingredientsLines = computed(() => {
  const raw = recipe.value?.ingredientes?.trim() || ''
  return raw.split(/\r?\n/).map(s => s.trim()).filter(Boolean)
})

function printNow() {
  window.print()
}

onMounted(async () => {
  try {
    recipe.value = await store.fetchDetailsJSON(Number(props.id))
  } finally {
    loading.value = false
  }
})
</script>

<style>
.print-toolbar {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  gap: .5rem;
  justify-content: center;
  padding: .75rem;
  background: rgba(255,255,255,.9);
  border-bottom: 1px solid #e9ecef;
  backdrop-filter: blur(4px);
}

.print-page {
  font-family: "Georgia", "Times New Roman", serif;
  color: #333;
  background: #fff;
  max-width: 820px;
  margin: .75rem auto 2rem;
  padding: 24mm 18mm;
  border-radius: .5rem;
  box-shadow: 0 6px 30px rgba(0,0,0,.08);
}

.title {
  margin: 0 0 .6rem 0;
  text-align: center;
  font-size: 2rem;
  font-weight: 800;
}

.meta {
  text-align: center;
  color: #666;
  margin: 0 0 1rem 0;
}
.meta > span:not(:last-child) { margin-right: .5rem; }

.section { margin-top: 1rem; }
.section h2 {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0 0 .4rem 0;
  padding-bottom: .25rem;
  border-bottom: 1px solid #ddd;
}

.bullets { margin: 0; padding-left: 1.1rem; }
.bullets li { margin: .2rem 0; }

.steps { white-space: pre-wrap; line-height: 1.6; }

@page {
  margin: 12mm 14mm 14mm 14mm;
}

@media print {
  .no-print, .no-print * { display: none !important; }
  body * { visibility: hidden !important; }
  #print-area, #print-area * {
    visibility: visible !important;
  }
  #print-area {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    margin: 0;
    padding: 0;
    max-width: 180mm;
    box-shadow: none !important;
    border-radius: 0 !important;
  }
}
</style>
