<template>
  <div class="min-vh-100 d-flex flex-column">
    <Navbar />
    <main class="flex-fill py-4">
      <router-view />
    </main>
    <footer class="text-center text-muted py-3 border-top small">
      <span>Desafio A4PM - Receitas Culinárias</span>
    </footer>
  </div>
</template>

<script setup lang="ts">
import Navbar from './components/Navbar.vue'
</script>

<style>
html, body, #app { height: 100%; }
</style>
