<template>
  <div class="container" style="max-width: 520px;">
    <h2 class="mt-4 mb-3 text-center">Entrar</h2>

    <form @submit.prevent="submit">
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
          autocomplete="current-password"
          maxlength="100"
        />
      </div>

      <button class="btn btn-primary w-100" :disabled="loading">
        <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
        Entrar
      </button>

      <p v-if="error" class="text-danger small mt-2">{{ error }}</p>
    </form>

    <div class="text-center mt-3">
      <RouterLink to="/cadastrar">Não tem conta? Cadastre-se</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRoute, useRouter } from 'vue-router'

const store = useAuthStore()
const route = useRoute()
const router = useRouter()

const form = ref({ login: '', senha: '' })
const loading = ref(false)
const error = ref<string | null>(null)

async function submit() {
  error.value = null

  loading.value = true
  try {
    await store.login(form.value)
    const redirect = (route.query.r as string) || '/minhas-receitas'
    router.replace(redirect)
  } catch (e: any) {
    error.value = e?.response?.data?.error?.message || 'Falha no login'
  } finally {
    loading.value = false
  }
}
</script>
