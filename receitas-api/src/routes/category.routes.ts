import { Router } from 'express';
import { categoryController } from '../controllers/category.controller';

const router = Router();

/**
 * @openapi
 * /api/categories:
 *   get:
 *     summary: "Listar categorias"
 *     tags: ["Categories"]
 *     description: "Retorna todas as categorias cadastradas."
 *     responses:
 *       200:
 *         description: "Lista de categorias"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       nome:
 *                         type: string
 *                         nullable: true
 *                         example: "Massas"
 */
router.get('/', categoryController.list);

/**
 * @openapi
 * /api/categories/{id}:
 *   get:
 *     summary: "Obter categoria e posts"
 *     tags: ["Categories"]
 *     description: "Retorna a categoria e todas as receitas (posts) desta categoria, sem filtrar por usuário."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Categoria e posts"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 category:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     nome:
 *                       type: string
 *                       nullable: true
 *                       example: "Massas"
 *                 posts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 10
 *                       nome:
 *                         type: string
 *                         nullable: true
 *                         example: "Talharim à bolonhesa"
 *                       id_categorias:
 *                         type: integer
 *                         nullable: true
 *                         example: 1
 *                       tempo_preparo_minutos:
 *                         type: integer
 *                         nullable: true
 *                         example: 45
 *                       porcoes:
 *                         type: integer
 *                         nullable: true
 *                         example: 4
 *                       criado_em:
 *                         type: string
 *                         format: date-time
 *                       alterado_em:
 *                         type: string
 *                         format: date-time
 *       400:
 *         description: "ID de categoria inválido"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: string
 *                       example: "VALIDATION_ERROR"
 *                     message:
 *                       type: string
 *                       example: "ID de categoria inválido"
 *       404:
 *         description: "Categoria não encontrada"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: string
 *                       example: "CATEGORY_NOT_FOUND"
 *                     message:
 *                       type: string
 *                       example: "Categoria não encontrada"
 */
router.get('/:id', categoryController.getWithPosts);

export default router;
