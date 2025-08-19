import { defineStore } from 'pinia'
import type { Category, RecipeListItem } from '../types'
import {api} from '../utils/api'




export const useCategoryStore = defineStore('categories', {
  state: () => ({
    items: [] as Category[],
    categoryCache: new Map<number, { category: Category, posts: RecipeListItem[] }>(),
    loading: false
  }),
  actions: {
    async fetchAll() {
      if (this.items.length) return this.items
      this.loading = true
      try {
        const { data } = await api.get('/api/categories')
        this.items = data.items as Category[]
        return this.items
      } finally { this.loading = false }
    },
    async fetchOneWithPosts(id: number) {
      if (this.categoryCache.has(id)) return this.categoryCache.get(id)!
      this.loading = true
      try {
        const { data } = await api.get(`/api/categories/${id}`)
        const payload = { category: data.category as Category, posts: data.posts as RecipeListItem[] }
        this.categoryCache.set(id, payload)
        return payload
      } finally { this.loading = false }
    }
  }
})
