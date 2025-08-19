import { prisma } from '../config/prisma';
import { AppError } from '../utils/appError';
import type {
  CreateRecipeInput,
  UpdateRecipeInput,
  RecipeDetail,
  RecipeSummary,
  CategorySlim,
} from '../types/recipe.types';

function mapSummary(raw: any): RecipeSummary {
  const cat = raw?.categorias as { id: number; nome: string | null } | null | undefined;
  const categoria: CategorySlim | null = cat ? { id: cat.id, nome: cat.nome } : null;

  return {
    id: raw.id,
    nome: raw.nome,
    id_categorias: raw.id_categorias,
    tempo_preparo_minutos: raw.tempo_preparo_minutos,
    porcoes: raw.porcoes,
    criado_em: raw.criado_em,
    alterado_em: raw.alterado_em,
    categoria,
  };
}

function mapDetail(raw: any): RecipeDetail {
  const base = mapSummary(raw);
  return {
    ...base,
    modo_preparo: raw.modo_preparo,
    ingredientes: raw.ingredientes,
  };
}

export const recipeService = {
  async create(userId: number, data: CreateRecipeInput): Promise<RecipeDetail> {
    const now = new Date();
    const rec = await prisma.receitas.create({
      data: {
        id_usuarios: userId,
        id_categorias: data.id_categorias ?? null,
        nome: data.nome ?? null,
        tempo_preparo_minutos: data.tempo_preparo_minutos ?? null,
        porcoes: data.porcoes ?? null,
        modo_preparo: data.modo_preparo,
        ingredientes: data.ingredientes ?? null,
        criado_em: now,
        alterado_em: now,
      },
      select: {
        id: true,
        nome: true,
        id_categorias: true,
        tempo_preparo_minutos: true,
        porcoes: true,
        modo_preparo: true,
        ingredientes: true,
        criado_em: true,
        alterado_em: true,
        categorias: { select: { id: true, nome: true } },
      },
    });

    return mapDetail(rec);
  },

  async listAll(q?: string): Promise<RecipeSummary[]> {
    const where: any = {};
    if (q && q.trim()) {
      where.OR = [
        { nome: { contains: q } },
        { ingredientes: { contains: q } },
        { modo_preparo: { contains: q } },
      ];
    }

    const rows = await prisma.receitas.findMany({
      where,
      orderBy: { alterado_em: 'desc' },
      select: {
        id: true,
        nome: true,
        id_categorias: true,
        tempo_preparo_minutos: true,
        porcoes: true,
        criado_em: true,
        alterado_em: true,
        categorias: { select: { id: true, nome: true } },
      },
    });

    return rows.map(mapSummary);
  },

  async listByUser(userId: number, q?: string): Promise<RecipeSummary[]> {
    const where: any = { id_usuarios: userId };
    if (q && q.trim()) {
      where.AND = [
        {
          OR: [
            { nome: { contains: q } },
            { ingredientes: { contains: q } },
            { modo_preparo: { contains: q } },
          ],
        },
      ];
    }

    const rows = await prisma.receitas.findMany({
      where,
      orderBy: { alterado_em: 'desc' },
      select: {
        id: true,
        nome: true,
        id_categorias: true,
        tempo_preparo_minutos: true,
        porcoes: true,
        criado_em: true,
        alterado_em: true,
        categorias: { select: { id: true, nome: true } },
      },
    });

    return rows.map(mapSummary);
  },

  async getByIdForUser(userId: number, id: number): Promise<RecipeDetail> {
    const rec = await prisma.receitas.findFirst({
      where: { id, id_usuarios: userId },
      select: {
        id: true,
        nome: true,
        id_categorias: true,
        tempo_preparo_minutos: true,
        porcoes: true,
        modo_preparo: true,
        ingredientes: true,
        criado_em: true,
        alterado_em: true,
        categorias: { select: { id: true, nome: true } },
      },
    });
    if (!rec) throw new AppError('Receita não encontrada', 404, 'RECIPE_NOT_FOUND');
    return mapDetail(rec);
  },

  async updateForUser(userId: number, id: number, data: UpdateRecipeInput): Promise<RecipeDetail> {

    await this.getByIdForUser(userId, id);

    const rec = await prisma.receitas.update({
      where: { id },
      data: {
        id_categorias: data.id_categorias ?? undefined,
        nome: data.nome ?? undefined,
        tempo_preparo_minutos: data.tempo_preparo_minutos ?? undefined,
        porcoes: data.porcoes ?? undefined,
        modo_preparo: data.modo_preparo ?? undefined,
        ingredientes: data.ingredientes ?? undefined,
        alterado_em: new Date(),
      },
      select: {
        id: true,
        nome: true,
        id_categorias: true,
        tempo_preparo_minutos: true,
        porcoes: true,
        modo_preparo: true,
        ingredientes: true,
        criado_em: true,
        alterado_em: true,
        categorias: { select: { id: true, nome: true } },
      },
    });

    return mapDetail(rec);
  },

  async deleteForUser(userId: number, id: number): Promise<void> {
    await this.getByIdForUser(userId, id);
    await prisma.receitas.delete({ where: { id } });
  },
  async getById(id: number): Promise<RecipeDetail> {
    const rec = await prisma.receitas.findUnique({
      where: { id },
      select: {
        id: true,
        nome: true,
        id_categorias: true,
        tempo_preparo_minutos: true,
        porcoes: true,
        modo_preparo: true,
        ingredientes: true,
        criado_em: true,
        alterado_em: true,
        categorias: { select: { id: true, nome: true } },
      },
    });

    if (!rec) throw new AppError('Receita não encontrada', 404, 'RECIPE_NOT_FOUND');
    return mapDetail(rec);
  }
};
