import type { Response } from 'express';
import type { AuthRequest } from '../types/express';
import { AppError } from '../utils/appError';
import { handlePrismaError } from '../utils/handlePrismaError';
import { recipeService } from '../services/recipe.service';
import type { CreateRecipeInput, UpdateRecipeInput } from '../types/recipe.types';

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (ch) =>
    ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;', "'":'&#39;' } as any)[ch]
  );
}
function nl2br(s: string) {
  return escapeHtml(s).replace(/\r?\n/g, '<br/>');
}
function recipeToPrintHtml(rec: {
  nome: string | null;
  tempo_preparo_minutos: number | null;
  porcoes: number | null;
  ingredientes: string | null;
  modo_preparo: string;
  criado_em: Date;
  alterado_em: Date;
}) {
  const title = rec.nome ?? 'Receita';
  const created = rec.criado_em.toISOString().slice(0,19).replace('T',' ');
  const updated = rec.alterado_em.toISOString().slice(0,19).replace('T',' ');
  return `<!doctype html>
<html lang="pt-br">
<head>
<meta charset="utf-8"/>
<title>${escapeHtml(title)} - Impressão</title>
<style>
  body { font-family: system-ui, Arial, sans-serif; margin: 24px; color:#111; }
  .header { border-bottom:1px solid #ddd; margin-bottom:16px; padding-bottom:8px;}
  h1 { margin:0 0 8px 0; }
  .meta { color:#666; font-size:12px; }
  .grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin:16px 0;}
  .card { border:1px solid #eee; border-radius:8px; padding:12px;}
  h2 { margin:0 0 8px 0; font-size:16px; }
  @media print { .no-print { display:none; } }
  .btn { background:#111; color:#fff; padding:8px 12px; border-radius:6px; text-decoration:none; }
</style>
</head>
<body>
  <div class="header">
    <h1>${escapeHtml(title)}</h1>
    <div class="meta">Criado em: ${created} &nbsp;|&nbsp; Atualizado em: ${updated}</div>
  </div>
  <div class="grid">
    <div class="card">
      <h2>Porções</h2>
      <div>${rec.porcoes ?? '-'}</div>
    </div>
    <div class="card">
      <h2>Tempo de preparo (min)</h2>
      <div>${rec.tempo_preparo_minutos ?? '-'}</div>
    </div>
  </div>
  <div class="card">
    <h2>Ingredientes</h2>
    <div>${rec.ingredientes ? nl2br(rec.ingredientes) : '-'}</div>
  </div>
  <div class="card">
    <h2>Modo de preparo</h2>
    <div>${nl2br(rec.modo_preparo)}</div>
  </div>
  <p class="no-print" style="margin-top:24px;">
    <a href="#" class="btn" onclick="window.print();return false;">Imprimir</a>
  </p>
</body>
</html>`;
}




export const recipeController = {

  create: async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.userId!;
      const body = req.body as CreateRecipeInput;
      if (!body?.modo_preparo || typeof body.modo_preparo !== 'string') {
        throw new AppError('modo_preparo é obrigatório', 400, 'VALIDATION_ERROR', { fields: ['modo_preparo'] });
      }
      const rec = await recipeService.create(userId, body);
      return res.status(201).json({ recipe: rec });
    } catch (err) {
      return handlePrismaError(err, res, 'criar receita');
    }
  },

  listAll: async (req: AuthRequest, res: Response) => {
  try {
    const q = typeof req.query.q === 'string' ? req.query.q : undefined;

    const items = await recipeService.listAll(q);
    return res.json({ items });
  } catch (err) {
    return handlePrismaError(err, res, 'listar todas as receitas');
  }
},

listMine: async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.userId!;
      const q = (req.query.q as string | undefined) ?? undefined;
      const items = await recipeService.listByUser(userId, q);
      return res.json({ items });
    } catch (err) {
      return handlePrismaError(err, res, 'listar receitas do usuário');
    }
  },


  update: async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.userId!;
      const id = Number(req.params.id);
      if (!Number.isFinite(id)) {
        throw new AppError('ID inválido', 400, 'VALIDATION_ERROR', { fields: ['id'] });
      }
      const body = req.body as UpdateRecipeInput;
      if (!body || Object.keys(body).length === 0) {
        throw new AppError('Nada para atualizar', 400, 'VALIDATION_ERROR');
      }
      const rec = await recipeService.updateForUser(userId, id, body);
      return res.json({ recipe: rec });
    } catch (err) {
      return handlePrismaError(err, res, 'editar receita');
    }
  },


  remove: async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.userId!;
      const id = Number(req.params.id);
      if (!Number.isFinite(id)) {
        throw new AppError('ID inválido', 400, 'VALIDATION_ERROR', { fields: ['id'] });
      }
      await recipeService.deleteForUser(userId, id);
      return res.json({ message: 'Receita excluída' });
    } catch (err) {
      return handlePrismaError(err, res, 'excluir receita');
    }
  },


  getById: async (req: AuthRequest, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const item = await recipeService.getById(id);
    return res.json(item);
  } catch (err) {
    return handlePrismaError(err, res, 'buscar detalhes da receita');
  }
},
};
