<template>
  <div class="container" v-if="loaded">
    <h2 class="mb-3">Editar receita</h2>

    <!-- Erros de validação local -->
    <div v-if="formError" class="alert alert-danger py-2" role="alert">
      {{ formError }}
    </div>

    <!-- Erro vindo da API (carregamento ou update) -->
    <div v-if="apiError" class="alert alert-danger py-2" role="alert">
      <div class="fw-semibold">{{ apiError.message }}</div>
      <div class="small mt-1">
        <span class="badge text-bg-light me-2">Código: {{ apiError.code }}</span>
        <span v-if="apiError.details?.context" class="badge text-bg-light me-2">
          Contexto: {{ apiError.details.context }}
        </span>
        <span v-if="apiError.details?.column" class="badge text-bg-light">
          Coluna: {{ apiError.details.column }}
        </span>
      </div>
    </div>

    <div v-if="!model">
      <div class="alert alert-info">
        Não foi possível carregar os dados da receita via JSON.
        Abra os <RouterLink :to="`/receita/${id}`">detalhes</RouterLink> e use a versão para impressão como referência.
      </div>
    </div>

    <RecipeForm v-else :modelValue="model" submitText="Atualizar" @submit="submit" />
  </div>

  <div v-else class="text-center my-5">
    <div class="spinner-border"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { RecipeDetails } from '../types'
import RecipeForm from '../components/RecipeForm.vue'
import { useRecipeStore } from '../stores/recipes'
import { useRouter } from 'vue-router'

const props = defineProps<{ id: string | number }>()
const router = useRouter()
const store = useRecipeStore()

const NAME_MAX = 45

const model = ref<Partial<RecipeDetails> | null>(null)
const loaded = ref(false)

// Estado de erros
const formError = ref<string | null>(null)
type ApiErr = { code: string; message: string; details?: { context?: string; column?: string } }
const apiError = ref<ApiErr | null>(null)

type ApiErrorShape = {
  error?: ApiErr
}

onMounted(async () => {
  apiError.value = null
  try {
    const r = await store.fetchDetailsJSON(Number(props.id))
    model.value = r
  } catch (err: any) {
    const data: ApiErrorShape = err?.response?.data ?? {}
    const e = data.error
    if (e?.code && e?.message) {
      apiError.value = e
    } else {
      apiError.value = {
        code: 'LOAD_FAILED',
        message: 'Não foi possível carregar a receita.',
      }
    }
    model.value = null
  } finally {
    loaded.value = true
  }
})

function validate(val: Partial<RecipeDetails>): string | null {
  const nome = String(val.nome || '')
  if (!nome.trim()) return 'O nome da receita é obrigatório.'
  if (nome.length > NAME_MAX) {
    return `O nome da receita deve ter no máximo ${NAME_MAX} caracteres. Você digitou ${nome.length}.`
  }
  if (val.tempo_preparo_minutos != null && val.tempo_preparo_minutos < 0) {
    return 'Tempo de preparo inválido.'
  }
  if (val.porcoes != null && val.porcoes <= 0) {
    return 'Porções deve ser maior que 0.'
  }
  return null
}

async function submit(val: Partial<RecipeDetails>) {
  if (!model.value) return
  formError.value = null
  apiError.value = null

  const v = validate(val)
  if (v) {
    formError.value = v
    return
  }

  try {
    const updated = await store.update(Number(props.id), {
      nome: String(val.nome || ''),
      id_categorias: val.id_categorias ?? null,
      tempo_preparo_minutos: val.tempo_preparo_minutos ?? null,
      porcoes: val.porcoes ?? null,
      ingredientes: String(val.ingredientes || ''),
      modo_preparo: String(val.modo_preparo || '')
    })
    router.push({ name: 'recipe', params: { id: updated.id } })
  } catch (err: any) {
    const data: ApiErrorShape = err?.response?.data ?? {}
    const e = data.error
    if (e?.code && e?.message) {
      apiError.value = e
    } else {
      apiError.value = {
        code: 'UNKNOWN_ERROR',
        message: 'Falha ao atualizar a receita. Tente novamente.'
      }
    }
  }
}
</script>
