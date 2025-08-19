import { Response } from 'express';
import { AppError } from './appError';

type ErrorBody = {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};

export function sendError(res: Response, status: number, code: string, message: string, details?: unknown) {
  const body: ErrorBody = {
    error: {
      code,
      message,
      ...(details ? { details } : {}),
    },
  };
  return res.status(status).json(body);
}

/**
 * padroniza os erros
 * @param err 
 * @param res 
 * @param context
 */
export function handlePrismaError(err: any, res: Response, context: string) {

  if (err instanceof AppError) {
    return sendError(res, err.statusCode, err.code, err.message, { context, ...(err.details ? { details: err.details } : {}) });
  }

  if (err?.code === 'P2002') {
    return sendError(res, 409, 'UNIQUE_CONSTRAINT', 'Registro duplicado', { context, target: err.meta?.target });
  }

  if (err?.code === 'P2003') {
    return sendError(res, 409, 'FK_CONSTRAINT', 'Violação de integridade referencial', { context, field: err.meta?.field_name });
  }

  if (err?.code === 'P2000') {
    return sendError(res, 400, 'VALUE_TOO_LONG', 'O valor fornecido para a coluna é muito longo', { context, column: err.meta?.column_name });
  }

  if (err?.name === 'JsonWebTokenError') {
    return sendError(res, 401, 'JWT_INVALID', 'Token inválido', { context });
  }

  if (err?.name === 'TokenExpiredError') {
    return sendError(res, 401, 'JWT_EXPIRED', 'Token expirado', { context });
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error('[UNHANDLED_ERROR]', err);
  }
  return sendError(res, 500, 'INTERNAL_ERROR', 'Ocorreu um erro inesperado', { context });
}
