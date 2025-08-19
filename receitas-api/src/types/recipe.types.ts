export type CategorySlim = {
  id: number;
  nome: string | null;
};

export type CreateRecipeInput = {
  nome?: string | null;
  id_categorias?: number | null;
  tempo_preparo_minutos?: number | null;
  porcoes?: number | null;
  modo_preparo: string;
  ingredientes?: string | null;
};

export type UpdateRecipeInput = Partial<CreateRecipeInput>;

export type RecipeSummary = {
  id: number;
  nome: string | null;
  id_categorias: number | null;
  tempo_preparo_minutos: number | null;
  porcoes: number | null;
  criado_em: Date;
  alterado_em: Date;
  categoria: CategorySlim | null;
};

export type RecipeDetail = RecipeSummary & {
  modo_preparo: string;
  ingredientes: string | null;
};
