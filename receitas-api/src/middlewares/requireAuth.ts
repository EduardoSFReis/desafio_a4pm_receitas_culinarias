import { NextFunction, Response } from 'express';
import { authService } from '../services/auth.service';
import { handlePrismaError } from '../utils/handlePrismaError';
import type { AuthRequest } from '../types/express';

const COOKIE_NAME = 'receitas_token';

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const token = req.cookies?.[COOKIE_NAME];
    if (!token) {
      return handlePrismaError({ name: 'JsonWebTokenError' }, res, 'autenticação: cookie ausente');
    }
    const payload = authService.verifyToken(token);
    req.userId = payload.sub;
    req.userLogin = payload.login;
    next();
  } catch (err) {
    return handlePrismaError(err, res, 'autenticação: token inválido');
  }
}
