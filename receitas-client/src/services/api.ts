import type { Category, RecipeDetails, RecipeListItem, User } from '../types'
import {api} from '../utils/api'

export async function register(payload: { nome: string; login: string; senha: string }): Promise<User> {
  const { data } = await api.post('/api/auth/register', payload)
  return data.user
}
export async function login(payload: { login: string; senha: string }): Promise<User> {
  const { data } = await api.post('/api/auth/login', payload)
  return data.user
}
export async function logout(): Promise<void> {
  await api.post('/api/auth/logout')
}

export async function getCategories(): Promise<Category[]> {
  const { data } = await api.get('/api/categories')
  return data.items
}
export async function getCategory(id: number): Promise<{ category: Category, posts: RecipeListItem[] }> {
  const { data } = await api.get(`/api/categories/${id}`)
  return data
}

export async function getAllRecipes(): Promise<RecipeListItem[]> {
  const { data } = await api.get('/api/recipes/all')
  return data.items
}

export async function getMyRecipes(q?: string): Promise<RecipeListItem[]> {
  const { data } = await api.get('/api/recipes', { params: q ? { q } : {} })
  return data.items
}

export async function createRecipe(body: {
  nome: string;
  id_categorias: number | null;
  tempo_preparo_minutos?: number | null;
  porcoes?: number | null;
  modo_preparo: string;
  ingredientes: string;
}): Promise<RecipeDetails> {
  const { data } = await api.post('/api/recipes', body)
  return data.recipe
}

export async function updateRecipe(id: number, body: Partial<RecipeDetails>): Promise<RecipeDetails> {
  const { data } = await api.put(`/api/recipes/${id}`, body)
  return data.recipe
}

export async function deleteRecipe(id: number): Promise<void> {
  await api.delete(`/api/recipes/${id}`)
}

export async function getRecipeJSON(id: number): Promise<RecipeDetails | null> {
  try {
    const { data } = await api.get(`/api/recipes/${id}`)
    return data.recipe ?? data
  } catch {
    return null
  }
}

export async function getRecipePrintHTML(id: number): Promise<string> {
  const { data } = await api.get(`/api/recipes/${id}/print`, {
    headers: { Accept: 'text/html' },
    responseType: 'text'
  })
  return data
}

export function getRecipePrintURL(id: number): string {
  return `${api.defaults.baseURL}/api/recipes/${id}/print`
}
