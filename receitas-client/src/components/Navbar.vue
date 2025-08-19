<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary border-bottom">
    <div class="container">
      <!-- LOGO -->
      <RouterLink class="navbar-brand fw-semibold d-flex align-items-center gap-2" to="/">
        <i class="bi bi-egg-fried fs-4 text-primary"></i>
        <span class="d-none d-sm-inline">Receitas</span>
      </RouterLink>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMain">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div id="navMain" class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/">Home</RouterLink>
          </li>
          <li v-if="store.user" class="nav-item">
            <RouterLink class="nav-link" to="/minhas-receitas">Minhas receitas</RouterLink>
          </li>
          <li v-if="store.user" class="nav-item">
            <RouterLink class="nav-link" to="/criar">Cadastrar</RouterLink>
          </li>
        </ul>

        <!-- CAMPO DE BUSCA -->
        <form class="d-flex me-3" role="search" @submit.prevent="onSearch">
          <input v-model="search" class="form-control" type="search" placeholder="Buscar receitas..." />
        </form>

        <div class="d-flex align-items-center gap-2">
          <div v-if="store.user" class="dropdown">
            <button class="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">
              <span class="me-2">👋</span> {{ store.user.nome || store.user.login }}
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><RouterLink class="dropdown-item" to="/minhas-receitas">Minhas receitas</RouterLink></li>
              <li><RouterLink class="dropdown-item" to="/criar">Nova receita</RouterLink></li>
              <li><hr class="dropdown-divider" /></li>
              <li><button class="dropdown-item text-danger" @click="onLogout">Sair</button></li>
            </ul>
          </div>

          <div v-else class="d-flex gap-2">
            <RouterLink class="btn btn-outline-primary" to="/entrar">Entrar</RouterLink>
            <RouterLink class="btn btn-primary" to="/cadastrar">Cadastrar</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const store = useAuthStore()
const router = useRouter()
const search = ref('')

async function onLogout() {
  await store.logout()
  router.push({ name: 'home' })
}

function onSearch() {
  if (!search.value.trim()) return
  router.push({ name: 'home', query: { q: search.value.trim() } })
  search.value = ''
}
</script>
