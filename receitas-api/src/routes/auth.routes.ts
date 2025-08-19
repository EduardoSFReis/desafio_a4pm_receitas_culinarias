import { Router } from 'express';
import { authController } from '../controllers/auth.controller';


const router = Router();

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: "Cadastro de usuário"
 *     description: "Cria um novo usuário e retorna o cookie de sessão receitas_token."
 *     tags:
 *       - "Auth"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - login
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *                 nullable: true
 *                 example: "Fulano da Silva"
 *               login:
 *                 type: string
 *                 example: "fulano"
 *               senha:
 *                 type: string
 *                 example: "minhasenha123"
 *           examples:
 *             default:
 *               value:
 *                 nome: "Fulano da Silva"
 *                 login: "fulano"
 *                 senha: "minhasenha123"
 *     responses:
 *       201:
 *         description: "Usuário criado"
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: "receitas_token=eyJ...; Path=/; HttpOnly"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   required:
 *                     - id
 *                     - login
 *                   properties:
 *                     id: { type: integer, example: 1 }
 *                     nome: { type: string, nullable: true, example: "Fulano da Silva" }
 *                     login: { type: string, example: "fulano" }
 *       400:
 *         description: "Erro de validação"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [error]
 *               properties:
 *                 error:
 *                   type: object
 *                   required: [code, message]
 *                   properties:
 *                     code: { type: string, example: "VALIDATION_ERROR" }
 *                     message: { type: string, example: "login e senha são obrigatórios" }
 *                     details: { type: object, additionalProperties: true }
 *       409:
 *         description: "Login já cadastrado"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [error]
 *               properties:
 *                 error:
 *                   type: object
 *                   required: [code, message]
 *                   properties:
 *                     code: { type: string, example: "LOGIN_TAKEN" }
 *                     message: { type: string, example: "Login já cadastrado" }
 *                     details: { type: object, additionalProperties: true }
 */
router.post('/register', authController.register);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: "Login"
 *     description: "Autentica o usuário e retorna o cookie receitas_token (JWT) como HttpOnly."
 *     tags:
 *       - "Auth"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - login
 *               - senha
 *             properties:
 *               login: { type: string, example: "fulano" }
 *               senha: { type: string, example: "minhasenha123" }
 *           examples:
 *             default:
 *               value:
 *                 login: "fulano"
 *                 senha: "minhasenha123"
 *     responses:
 *       200:
 *         description: "Login efetuado"
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: "receitas_token=eyJ...; Path=/; HttpOnly"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   required:
 *                     - id
 *                     - login
 *                   properties:
 *                     id: { type: integer, example: 1 }
 *                     nome: { type: string, nullable: true, example: "Fulano da Silva" }
 *                     login: { type: string, example: "fulano" }
 *       400:
 *         description: "Erro de validação"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [error]
 *               properties:
 *                 error:
 *                   type: object
 *                   required: [code, message]
 *                   properties:
 *                     code: { type: string, example: "VALIDATION_ERROR" }
 *                     message: { type: string, example: "login e senha são obrigatórios" }
 *                     details: { type: object, additionalProperties: true }
 *       401:
 *         description: "Credenciais inválidas"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [error]
 *               properties:
 *                 error:
 *                   type: object
 *                   required: [code, message]
 *                   properties:
 *                     code: { type: string, example: "INVALID_CREDENTIALS" }
 *                     message: { type: string, example: "Credenciais inválidas" }
 *                     details: { type: object, additionalProperties: true }
 */
router.post('/login', authController.login);

/**
 * @openapi
 * /api/auth/logout:
 *   post:
 *     summary: "Logout"
 *     description: "Remove o cookie receitas_token."
 *     tags:
 *       - "Auth"
 *     responses:
 *       200:
 *         description: "Logout efetuado"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: "Logout efetuado, cookie removido" }
 */
router.post('/logout', authController.logout);



export default router;
