<template>
  <nav v-if="pages > 1" aria-label="Paginação">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <button class="page-link" @click="$emit('update:currentPage', currentPage - 1)" :disabled="currentPage===1">«</button>
      </li>
      <li class="page-item" v-for="p in pages" :key="p" :class="{ active: currentPage === p }">
        <button class="page-link" @click="$emit('update:currentPage', p)">{{ p }}</button>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === pages }">
        <button class="page-link" @click="$emit('update:currentPage', currentPage + 1)" :disabled="currentPage===pages">»</button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{ total: number; pageSize: number; currentPage: number }>()
const pages = computed(() => Math.ceil(props.total / props.pageSize))
</script>
