import { defineStore } from 'pinia'
import type { RecipeDetails, RecipeListItem } from '../types'
import {api} from '../utils/api'



export const useRecipeStore = defineStore('recipes', {
  state: () => ({
    all: [] as RecipeListItem[],
    mine: [] as RecipeListItem[],
    loading: false,
    detailsCache: new Map<number, RecipeDetails | null>()
  }),
  actions: {

    async fetchAll() {
      if (this.all.length) return this.all
      this.loading = true
      try {
        const { data } = await api.get('/api/recipes/all')
        this.all = data.items as RecipeListItem[]
        return this.all
      } finally { this.loading = false }
    },

    async fetchMine(q?: string) {
      this.loading = true
      try {
        const { data } = await api.get('/api/recipes', { params: q ? { q } : {} })
        this.mine = data.items as RecipeListItem[]
        return this.mine
      } finally { this.loading = false }
    },

    async fetchDetailsJSON(id: number) {
      if (this.detailsCache.has(id)) return this.detailsCache.get(id)!
      this.loading = true
      try {
        const { data } = await api.get(`/api/recipes/${id}`)
        const recipe = (data.recipe ?? data) as RecipeDetails
        this.detailsCache.set(id, recipe)
        return recipe
      } catch {
        this.detailsCache.set(id, null)
        return null
      } finally { this.loading = false }
    },

    getPrintURL(id: number) {
      return `${api.defaults.baseURL}/api/recipes/${id}/print`
    },

    async create(body: {
      nome: string; id_categorias: number | null;
      tempo_preparo_minutos?: number | null; porcoes?: number | null;
      modo_preparo: string; ingredientes: string;
    }) {
      const { data } = await api.post('/api/recipes', body)
      this.mine.unshift(data.recipe)
      this.detailsCache.set(data.recipe.id, data.recipe)
      return data.recipe as RecipeDetails
    },

    async update(id: number, body: Partial<RecipeDetails>) {
      const { data } = await api.put(`/api/recipes/${id}`, body)
      const updated = data.recipe as RecipeDetails
      this.detailsCache.set(id, updated)
      const idx = this.mine.findIndex(r => r.id === id)
      if (idx >= 0) this.mine[idx] = { ...this.mine[idx], ...updated }
      const idxAll = this.all.findIndex(r => r.id === id)
      if (idxAll >= 0) this.all[idxAll] = { ...this.all[idxAll], ...updated }
      return updated
    },

    async remove(id: number) {
      await api.delete(`/api/recipes/${id}`)
      this.mine = this.mine.filter(r => r.id !== id)
      this.all = this.all.filter(r => r.id !== id)
      this.detailsCache.delete(id)
    }
  }
})
