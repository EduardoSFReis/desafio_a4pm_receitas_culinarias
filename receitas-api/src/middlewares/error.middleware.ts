import { Request, Response, NextFunction } from 'express';

export function notFoundHandler(_req: Request, res: Response) {
  return res.status(404).json({
    error: { code: 'NOT_FOUND', message: 'Rota não encontrada' },
  });
}

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {

  if (
    (err instanceof SyntaxError && 'body' in err) ||
    err?.type === 'entity.parse.failed' ||
    err?.status === 400 ||
    err?.statusCode === 400
  ) {
    return res.status(400).json({
      error: {
        code: 'INVALID_JSON',
        message: 'Corpo da requisição não é um JSON válido',

        ...(process.env.NODE_ENV !== 'production'
          ? { details: { reason: err.message } }
          : {}),
      },
    });
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error('[UNHANDLED_ERROR]', err);
  }

  return res.status(500).json({
    error: {
      code: 'INTERNAL_ERROR',
      message: 'Ocorreu um erro inesperado no servidor',
      ...(process.env.NODE_ENV !== 'production' ? { details: err?.message } : {}),
    },
  });
}
