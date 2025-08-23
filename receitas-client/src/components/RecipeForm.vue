<template>
  <form @submit.prevent="submit">
    <div class="mb-3">
      <label class="form-label">Nome</label>
      <input v-model="model.nome" class="form-control" required />
    </div>

    <div class="row g-3">
      <div class="col-md-6">
        <label class="form-label">Categoria</label>
        <select v-model.number="model.id_categorias" class="form-select">
          <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.nome }}</option>
        </select>
      </div>
      <div class="col-md-3">
        <label class="form-label">Tempo de preparo (min)</label>
        <input v-model.number="model.tempo_preparo_minutos" type="number" min="0" class="form-control" />
      </div>
      <div class="col-md-3">
        <label class="form-label">Porções</label>
        <input v-model.number="model.porcoes" type="number" min="0" class="form-control" />
      </div>
    </div>

    <div class="mb-3 mt-3">
      <label class="form-label">Ingredientes</label>
      <textarea v-model="model.ingredientes" rows="5" class="form-control" placeholder="1 xícara de ..."></textarea>
      <div class="form-text">Use quebras de linha para separar os ingredientes.</div>
    </div>

    <div class="mb-3">
      <label class="form-label">Modo de preparo</label>
      <textarea v-model="model.modo_preparo" rows="6" class="form-control" placeholder="Descreva o passo a passo..." required></textarea>
    </div>

    <div class="d-flex gap-2">
      <button class="btn btn-primary" type="submit" :disabled="submitting">
        <span v-if="submitting" class="spinner-border spinner-border-sm me-2"></span>
        {{ submitText || 'Salvar' }}
      </button>
      <RouterLink class="btn btn-outline-secondary" to="/minhas-receitas">Cancelar</RouterLink>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import type { Category, RecipeDetails } from '../types'
import { useCategoryStore } from '../stores/categories'

const props = defineProps<{
  modelValue: Partial<RecipeDetails>
  submitText?: string
}>()
const emit = defineEmits<{ 'update:modelValue': [Partial<RecipeDetails>], 'submit': [Partial<RecipeDetails>] }>()

const model = ref<Partial<RecipeDetails>>({ ...props.modelValue })
watch(() => props.modelValue, (v) => model.value = { ...v })

const submitting = ref(false)
const categories = ref<Category[]>([])

onMounted(async () => {
  categories.value = await useCategoryStore().fetchAll()
})

async function submit() {
  submitting.value = true
  try {
    emit('submit', model.value)
  } finally {
    submitting.value = false
  }
}
</script>
