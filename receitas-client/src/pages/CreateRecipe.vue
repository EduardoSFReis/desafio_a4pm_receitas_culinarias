<template>
  <div class="container">
    <h2 class="mb-3">Cadastrar receita</h2>

    <div v-if="formError" class="alert alert-danger py-2" role="alert">
      {{ formError }}
    </div>

    <div v-if="apiError" class="alert alert-danger py-2" role="alert">
      <div class="fw-semibold">{{ apiError.message }}</div>
      <div class="small">
        <span class="badge text-bg-light me-2">Código: {{ apiError.code }}</span>
        <span v-if="apiError.details?.context" class="badge text-bg-light me-2">
          Contexto: {{ apiError.details.context }}
        </span>
        <span v-if="apiError.details?.column" class="badge text-bg-light">
          Coluna: {{ apiError.details.column }}
        </span>
      </div>
    </div>

    <RecipeForm :modelValue="model" submitText="Salvar" @submit="submit" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import RecipeForm from '../components/RecipeForm.vue'
import type { RecipeDetails } from '../types'
import { useRouter } from 'vue-router'
import { useRecipeStore } from '../stores/recipes'

const store = useRecipeStore()
const router = useRouter()

const NAME_MAX = 45

const formError = ref<string | null>(null)
type ApiErrorShape = {
  error?: {
    code: string
    message: string
    details?: { context?: string; column?: string }
  }
}
const apiError = ref<{ code: string; message: string; details?: { context?: string; column?: string } } | null>(null)

const model = ref<Partial<RecipeDetails>>({
  nome: '',
  id_categorias: null,
  tempo_preparo_minutos: null,
  porcoes: null,
  ingredientes: '',
  modo_preparo: ''
})

function validate(val: Partial<RecipeDetails>): string | null {
  const nome = String(val.nome || '')
  if (!nome.trim()) return 'O nome da receita é obrigatório.'
  if (nome.length > NAME_MAX) {
    return `O nome da receita deve ter no máximo ${NAME_MAX} caracteres. Você digitou ${nome.length}.`
  }

  return null
}

async function submit(val: Partial<RecipeDetails>) {
  formError.value = null
  apiError.value = null

  const v = validate(val)
  if (v) {
    formError.value = v
    return
  }

  try {
    const created = await store.create({
      nome: String(val.nome || ''),
      id_categorias: val.id_categorias ?? null,
      tempo_preparo_minutos: val.tempo_preparo_minutos ?? null,
      porcoes: val.porcoes ?? null,
      ingredientes: String(val.ingredientes || ''),
      modo_preparo: String(val.modo_preparo || '')
    })
    router.push({ name: 'recipe', params: { id: created.id } })
  } catch (err: any) {
    const data: ApiErrorShape = err?.response?.data ?? {}
    const e = data.error
    if (e?.code && e?.message) {
      apiError.value = {
        code: e.code,
        message: e.message,
        details: e.details
      }
    } else {
      apiError.value = {
        code: 'UNKNOWN_ERROR',
        message: 'Falha ao criar a receita. Tente novamente.',
        details: undefined
      }
    }
  }
}
</script>
