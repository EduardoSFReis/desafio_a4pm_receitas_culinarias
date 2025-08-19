import type { Response } from 'express';
import type { AuthRequest } from '../types/express';
import { handlePrismaError } from '../utils/handlePrismaError';
import { AppError } from '../utils/appError';
import { categoryService } from '../services/category.service';

export const categoryController = {

    list: async (_req: AuthRequest, res: Response) => {
    try {
      const items = await categoryService.listAll();
      return res.json({ items });
    } catch (err) {
      return handlePrismaError(err, res, 'listar categorias');
    }
  },

  getWithPosts: async (req: AuthRequest, res: Response) => {
    try {
      const id = Number(req.params.id);
      if (!Number.isFinite(id)) {
        throw new AppError('ID de categoria inválido', 400, 'VALIDATION_ERROR', { fields: ['id'] });
      }

      const data = await categoryService.getCategoryWithPosts(id);

      return res.json(data);
    } catch (err) {
      return handlePrismaError(err, res, 'buscar categoria com posts');
    }
  },
};
