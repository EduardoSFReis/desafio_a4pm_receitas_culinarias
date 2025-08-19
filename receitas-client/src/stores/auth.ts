import { defineStore } from 'pinia'
import type { User } from '../types'
import {api} from '../utils/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    pendingAuthModal: false
  }),
  actions: {
    setUser(u: User | null) {
      this.user = u
      if (u) {
        localStorage.setItem('user', JSON.stringify(u))
      } else {
        localStorage.removeItem('user')
      }
    },

    restore() {
      const raw = localStorage.getItem('user')
      if (raw) {
        try {
          this.user = JSON.parse(raw) as User
        } catch {
          this.user = null
        }
      }
    },

    requireAuth() {
      this.pendingAuthModal = true
    },

    clearPending() {
      this.pendingAuthModal = false
    },

    async register(payload: { nome: string; login: string; senha: string }) {
      const { data } = await api.post('/api/auth/register', {
        nome: payload.nome,
        login: payload.login,
        senha: payload.senha
      })
      this.setUser(data.user)
      return data.user as User
    },

    async login(payload: { login: string; senha: string }) {
      const { data } = await api.post('/api/auth/login', {
        login: payload.login,
        senha: payload.senha
      })
      this.setUser(data.user)
      return data.user as User
    },

    async logout() {
      try {
        await api.post('/api/auth/logout')
      } catch {

      }
      this.setUser(null)
    }
  }
})
