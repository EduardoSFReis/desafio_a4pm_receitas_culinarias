import { prisma } from '../config/prisma';
import { AppError } from '../utils/appError';
import type { RecipeSummary } from '../types/recipe.types';
import type { Category } from '../types/category.types';

export const categoryService = {
  async listAll(): Promise<Category[]> {
    return prisma.categorias.findMany({
      orderBy: { nome: 'asc' },
      select: { id: true, nome: true },
    });
  },

  async getCategoryWithPosts(categoryId: number): Promise<{ category: Category; posts: RecipeSummary[] }> {
    const cat = await prisma.categorias.findUnique({
      where: { id: categoryId },
      select: {
        id: true,
        nome: true,
        receitas: {
          orderBy: { alterado_em: 'desc' },
          select: {
            id: true,
            nome: true,
            id_categorias: true,
            tempo_preparo_minutos: true,
            porcoes: true,
            criado_em: true,
            alterado_em: true,
            // 1. Tell Prisma to include the related category for each recipe
            categorias: {
              select: {
                id: true,
                nome: true,
              },
            },
          },
        },
      },
    });

    if (!cat) throw new AppError('Categoria não encontrada', 404, 'CATEGORY_NOT_FOUND');

    const { id, nome, receitas } = cat;

  
    const posts = receitas.map(({ categorias, ...rest }) => ({
      ...rest,
      categoria: categorias, 
    }));

    return {
      category: { id, nome },
      posts, 
    };
  },
};