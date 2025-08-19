import axios from "axios";
import { useAuthStore } from '../stores/auth'

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
}

declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000',

  withCredentials: true
})


api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {

      const auth = useAuthStore()
      auth.setUser(null)
    }
    return Promise.reject(error)
  }
)