export interface User { id: number; nome: string; login: string }
export interface Category { id: number; nome: string }
export interface RecipeListItem {
  id: number;
  nome: string;
  id_categorias: number | null;
  categoria?: Category;
  tempo_preparo_minutos?: number | null;
  porcoes?: number | null;
  criado_em?: string;
  alterado_em?: string;
}
export interface RecipeDetails extends RecipeListItem {
  modo_preparo: string;
  ingredientes: string;
}
export interface Paged<T> {
  items: T[];
  total?: number;
}
