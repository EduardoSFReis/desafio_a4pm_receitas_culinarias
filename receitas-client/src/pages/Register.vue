<template>
  <div class="container" style="max-width: 520px;">
    <h2 class="mt-4 mb-3 text-center">Cadastrar</h2>

    <form @submit.prevent="submit">
      <div class="mb-3">
        <label class="form-label">Nome</label>
        <input v-model="form.nome" class="form-control" required maxlength="100" />
      </div>

      <div class="mb-3">
        <label class="form-label">Login</label>
        <input
          v-model="form.login"
          class="form-control"
          required
          autocomplete="username"
          maxlength="100"
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Senha</label>
        <input
          v-model="form.senha"
          type="password"
          class="form-control"
          required
          autocomplete="new-password"
          maxlength="100"
        />
      </div>

      <button class="btn btn-success w-100" :disabled="loading">
        <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
        Cadastrar
      </button>

      <p v-if="error" class="text-danger small mt-2">{{ error }}</p>
    </form>

    <div class="text-center mt-3">
      <RouterLink to="/entrar">Já tem conta? Entrar</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const store = useAuthStore()
const router = useRouter()

const form = ref({ nome: '', login: '', senha: '' })
const loading = ref(false)
const error = ref<string | null>(null)

async function submit() {
  error.value = null

  if (form.value.nome.length > 100) {
    error.value = 'O nome deve ter no máximo 100 caracteres.'
    return
  }
  if (form.value.login.length > 100) {
    error.value = 'O login deve ter no máximo 100 caracteres.'
    return
  }
  if (form.value.senha.length > 100) {
    error.value = 'A senha deve ter no máximo 100 caracteres.'
    return
  }

  loading.value = true
  try {
    await store.register(form.value)
    router.replace('/minhas-receitas')
  } catch (e: any) {
    error.value = e?.response?.data?.error?.message || 'Falha no cadastro'
  } finally {
    loading.value = false
  }
}
</script>
