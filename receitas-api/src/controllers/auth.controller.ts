import { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { userService } from '../services/user.service';
import type { LoginInput, SignupInput, UserSafe } from '../types/user.types';
import { AppError } from '../utils/appError';
import { handlePrismaError } from '../utils/handlePrismaError';

const COOKIE_NAME = 'receitas_token';

function cookieOptions() {
  const isProd = process.env.NODE_ENV === 'production';
  const domain = process.env.COOKIE_DOMAIN || undefined;

  return {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? ('strict' as const) : ('lax' as const),
    domain,
    path: '/',
  };
}

export const authController = {
  register: async (req: Request, res: Response) => {
    try {
      const { nome = null, login, senha } = req.body as SignupInput;
      if (!login || !senha) {
        throw new AppError('login e senha são obrigatórios', 400, 'VALIDATION_ERROR', { fields: ['login','senha'] });
      }

      const exists = await userService.findByLogin(login);
      if (exists) {
        throw new AppError('Login já cadastrado', 409, 'LOGIN_TAKEN');
      }

      const senhaHash = await authService.hashPassword(senha);
      const user = await userService.createUser({ nome, login, senhaHash });

      const token = authService.generateToken({ sub: user.id, login: user.login });
      res.cookie(COOKIE_NAME, token, { ...cookieOptions() });

      const userSafe: UserSafe = { id: user.id, nome: user.nome, login: user.login };
      return res.status(201).json({ user: userSafe });
    } catch (err) {
      return handlePrismaError(err, res, 'cadastrar usuário');
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { login, senha } = req.body as LoginInput;
      if (!login || !senha) {
        throw new AppError('login e senha são obrigatórios', 400, 'VALIDATION_ERROR', { fields: ['login','senha'] });
      }

      const user = await userService.findByLogin(login);
      if (!user) {
        throw new AppError('Credenciais inválidas', 401, 'INVALID_CREDENTIALS');
      }

      const ok = await authService.comparePassword(senha, user.senha);
      if (!ok) {
        throw new AppError('Credenciais inválidas', 401, 'INVALID_CREDENTIALS');
      }

      await userService.touchAlteradoEm(user.id);

      const token = authService.generateToken({ sub: user.id, login: user.login });
      res.cookie(COOKIE_NAME, token, { ...cookieOptions() });

      const expiresIn = process.env.JWT_EXPIRES!;
      const userSafe: UserSafe = { id: user.id, nome: user.nome, login: user.login };
      return res.json({ user: userSafe, expiresIn });
    } catch (err) {
      return handlePrismaError(err, res, 'login');
    }
  },

  logout: async (_req: Request, res: Response) => {
    try {
      res.clearCookie(COOKIE_NAME, { ...cookieOptions() });
      return res.json({ message: 'Logout efetuado, cookie removido' });
    } catch (err) {
      return handlePrismaError(err, res, 'logout');
    }
  },

  me: async (req: Request, res: Response) => {
    try {
      const token = req.cookies?.[COOKIE_NAME];
      if (!token) {
        throw new AppError('Não autenticado', 401, 'UNAUTHORIZED');
      }
      const payload = authService.verifyToken(token);
      return res.json({ session: { userId: payload.sub, login: payload.login } });
    } catch (err) {
      return handlePrismaError(err, res, 'estado da sessão');
    }
  },
};
