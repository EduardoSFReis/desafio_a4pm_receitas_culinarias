import { Router } from 'express';
import { recipeController } from '../controllers/recipe.controller';
import { requireAuth } from '../middlewares/requireAuth';

const router = Router();

/**
 * @openapi
 * /api/recipes/all:
 *   get:
 *     summary: "Listar todas as receitas"
 *     tags:
 *       - "Recipes"
 *     description: "Retorna todas as receitas cadastradas, podendo aplicar filtros por texto ou categoria."
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: false
 *         description: "Texto de busca (nome, ingredientes ou modo de preparo)"
 *     responses:
 *       200:
 *         description: "Lista de receitas"
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
 *                         example: 10
 *                       nome:
 *                         type: string
 *                         nullable: true
 *                         example: "Bolo de Cenoura"
 *                       id_categorias:
 *                         type: integer
 *                         nullable: true
 *                         example: 1
 *                       categoria:
 *                         type: object
 *                         nullable: true
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           nome:
 *                             type: string
 *                             nullable: true
 *                             example: "Massas"
 *                       tempo_preparo_minutos:
 *                         type: integer
 *                         nullable: true
 *                         example: 45
 *                       porcoes:
 *                         type: integer
 *                         nullable: true
 *                         example: 8
 *                       criado_em:
 *                         type: string
 *                         format: date-time
 *                       alterado_em:
 *                         type: string
 *                         format: date-time
 */
router.get('/all', recipeController.listAll);

/**
 * @openapi
 * /api/recipes:
 *   post:
 *     summary: "Criar receita"
 *     tags:
 *       - "Recipes"
 *     description: "Cria uma receita para o usuário autenticado."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - modo_preparo
 *             properties:
 *               nome:
 *                 type: string
 *                 nullable: true
 *                 example: "Bolo de Cenoura"
 *               id_categorias:
 *                 type: integer
 *                 nullable: true
 *                 example: 1
 *               tempo_preparo_minutos:
 *                 type: integer
 *                 nullable: true
 *                 example: 45
 *               porcoes:
 *                 type: integer
 *                 nullable: true
 *                 example: 8
 *               modo_preparo:
 *                 type: string
 *                 example: "Misture tudo e asse por 40 minutos..."
 *               ingredientes:
 *                 type: string
 *                 nullable: true
 *                 example: "2 ovos\n3 cenouras\n1 xícara de óleo"
 *     responses:
 *       201:
 *         description: "Receita criada"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 recipe:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 10
 *                     nome:
 *                       type: string
 *                       nullable: true
 *                       example: "Bolo de Cenoura"
 *                     id_categorias:
 *                       type: integer
 *                       nullable: true
 *                       example: 1
 *                     categoria:
 *                       type: object
 *                       nullable: true
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         nome:
 *                           type: string
 *                           nullable: true
 *                           example: "Massas"
 *                     tempo_preparo_minutos:
 *                       type: integer
 *                       nullable: true
 *                       example: 45
 *                     porcoes:
 *                       type: integer
 *                       nullable: true
 *                       example: 8
 *                     modo_preparo:
 *                       type: string
 *                       example: "Misture tudo e asse por 40 minutos..."
 *                     ingredientes:
 *                       type: string
 *                       nullable: true
 *                       example: "2 ovos\n3 cenouras\n1 xícara de óleo"
 *                     criado_em:
 *                       type: string
 *                       format: date-time
 *                     alterado_em:
 *                       type: string
 *                       format: date-time
 */
router.post('/', requireAuth, recipeController.create);

/**
 * @openapi
 * /api/recipes:
 *   get:
 *     summary: "Listar/Pesquisar minhas receitas"
 *     tags:
 *       - "Recipes"
 *     description: "Retorna receitas do usuário autenticado. Use o parâmetro 'q' para pesquisar por nome, ingredientes ou modo de preparo."
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: false
 *         description: "Termo de pesquisa"
 *     responses:
 *       200:
 *         description: "Lista retornada"
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
 *                         example: 10
 *                       nome:
 *                         type: string
 *                         nullable: true
 *                         example: "Bolo de Cenoura"
 *                       id_categorias:
 *                         type: integer
 *                         nullable: true
 *                         example: 1
 *                       categoria:
 *                         type: object
 *                         nullable: true
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           nome:
 *                             type: string
 *                             nullable: true
 *                             example: "Massas"
 *                       tempo_preparo_minutos:
 *                         type: integer
 *                         nullable: true
 *                         example: 45
 *                       porcoes:
 *                         type: integer
 *                         nullable: true
 *                         example: 8
 *                       criado_em:
 *                         type: string
 *                         format: date-time
 *                       alterado_em:
 *                         type: string
 *                         format: date-time
 */
router.get('/', requireAuth, recipeController.listMine);

/**
 * @openapi
 * /api/recipes/{id}:
 *   put:
 *     summary: "Editar receita"
 *     tags:
 *       - "Recipes"
 *     description: "Atualiza uma receita do usuário autenticado."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: "Envie os campos que deseja atualizar (parcial)."
 *             properties:
 *               nome:
 *                 type: string
 *                 nullable: true
 *               id_categorias:
 *                 type: integer
 *                 nullable: true
 *               tempo_preparo_minutos:
 *                 type: integer
 *                 nullable: true
 *               porcoes:
 *                 type: integer
 *                 nullable: true
 *               modo_preparo:
 *                 type: string
 *               ingredientes:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       200:
 *         description: "Receita atualizada"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 recipe:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     nome:
 *                       type: string
 *                       nullable: true
 *                     id_categorias:
 *                       type: integer
 *                       nullable: true
 *                     categoria:
 *                       type: object
 *                       nullable: true
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         nome:
 *                           type: string
 *                           nullable: true
 *                           example: "Massas"
 *                     tempo_preparo_minutos:
 *                       type: integer
 *                       nullable: true
 *                     porcoes:
 *                       type: integer
 *                       nullable: true
 *                     modo_preparo:
 *                       type: string
 *                     ingredientes:
 *                       type: string
 *                       nullable: true
 *                     criado_em:
 *                       type: string
 *                       format: date-time
 *                     alterado_em:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: "Receita não encontrada"
 */
router.put('/:id', requireAuth, recipeController.update);

/**
 * @openapi
 * /api/recipes/{id}:
 *   delete:
 *     summary: "Excluir receita"
 *     tags:
 *       - "Recipes"
 *     description: "Exclui uma receita do usuário autenticado."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "Excluída"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Receita excluída"
 *       404:
 *         description: "Receita não encontrada"
 */
router.delete('/:id', requireAuth, recipeController.remove);


/**
 * @openapi
 * /api/recipes/{id}:
 *   get:
 *     summary: "Obter detalhes de uma receita"
 *     tags:
 *       - "Recipes"
 *     description: "Retorna os detalhes completos de uma receita pelo ID"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: "ID da receita"
 *     responses:
 *       200:
 *         description: "Detalhes da receita"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 10
 *                 nome:
 *                   type: string
 *                   nullable: true
 *                   example: "Bolo de Cenoura"
 *                 id_categorias:
 *                   type: integer
 *                   nullable: true
 *                   example: 1
 *                 categoria:
 *                   type: object
 *                   nullable: true
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     nome:
 *                       type: string
 *                       nullable: true
 *                       example: "Massas"
 *                 tempo_preparo_minutos:
 *                   type: integer
 *                   nullable: true
 *                   example: 45
 *                 porcoes:
 *                   type: integer
 *                   nullable: true
 *                   example: 8
 *                 modo_preparo:
 *                   type: string
 *                   example: "Misture todos os ingredientes e leve ao forno."
 *                 ingredientes:
 *                   type: string
 *                   example: "3 cenouras, 2 xícaras de farinha, 1 xícara de açúcar..."
 *                 criado_em:
 *                   type: string
 *                   format: date-time
 *                 alterado_em:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: "Receita não encontrada"
 */
router.get('/:id', recipeController.getById);

export default router;
