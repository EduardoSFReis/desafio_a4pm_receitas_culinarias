<template>
  <div class="modal fade" tabindex="-1" ref="modalEl" aria-labelledby="authTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="authTitle">{{ activeTab === 'login' ? 'Entrar' : 'Cadastrar' }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body">
          <ul class="nav nav-tabs mb-3">
            <li class="nav-item">
              <button class="nav-link" :class="{active: activeTab==='login'}" @click="activeTab='login'">Login</button>
            </li>
            <li class="nav-item">
              <button class="nav-link" :class="{active: activeTab==='register'}" @click="activeTab='register'">Cadastro</button>
            </li>
          </ul>

          <form v-if="activeTab==='login'" @submit.prevent="doLogin">
            <div class="mb-3">
              <label class="form-label">Login</label>
              <input v-model="loginForm.login" class="form-control" required autocomplete="username" />
            </div>
            <div class="mb-3">
              <label class="form-label">Senha</label>
              <input v-model="loginForm.senha" type="password" class="form-control" required autocomplete="current-password" />
            </div>
            <button class="btn btn-primary w-100" :disabled="loading">
              <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
              Entrar
            </button>
            <p v-if="error" class="text-danger small mt-2">{{ error }}</p>
          </form>

          <form v-else @submit.prevent="doRegister">
            <div class="mb-3">
              <label class="form-label">Nome</label>
              <input v-model="registerForm.nome" class="form-control" required />
            </div>
            <div class="mb-3">
              <label class="form-label">Login</label>
              <input v-model="registerForm.login" class="form-control" required autocomplete="username" />
            </div>
            <div class="mb-3">
              <label class="form-label">Senha</label>
              <input v-model="registerForm.senha" type="password" class="form-control" required autocomplete="new-password" />
            </div>
            <button class="btn btn-success w-100" :disabled="loading">
              <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
              Cadastrar
            </button>
            <p v-if="error" class="text-danger small mt-2">{{ error }}</p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const store = useAuthStore()

const modalEl = ref<HTMLDivElement | null>(null)
let modal: any = null
const activeTab = ref<'login' | 'register'>('login')
const loading = ref(false)
const error = ref<string | null>(null)

const loginForm = ref({ login: '', senha: '' })
const registerForm = ref({ nome: '', login: '', senha: '' })

function open() {
  error.value = null
  activeTab.value = 'login'
  // @ts-ignore
  const b = (window as any).bootstrap
  if (modalEl.value && b) {
    modal = modal || new b.Modal(modalEl.value, { backdrop: 'static' })
    modal.show()
  }
}

defineExpose({ open })

async function doLogin() {
  loading.value = true; error.value = null
  try {
    await store.login(loginForm.value)
    modal?.hide()
    loginForm.value = { login: '', senha: '' }
    emit('logged-in')
  } catch (e: any) {
    error.value = e?.response?.data?.error?.message || 'Falha no login'
  } finally { loading.value = false }
}

async function doRegister() {
  loading.value = true; error.value = null
  try {
    await store.register(registerForm.value)
    modal?.hide()
    registerForm.value = { nome: '', login: '', senha: '' }
    emit('logged-in')
  } catch (e: any) {
    error.value = e?.response?.data?.error?.message || 'Falha no cadastro'
  } finally { loading.value = false }
}

const emit = defineEmits<{ 'logged-in': [] }>()
</script>
