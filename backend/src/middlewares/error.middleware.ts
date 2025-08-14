import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  const status = err.statusCode || 500;
  const message = err.message || 'Error interno';
  res.status(status).json({ ok: false, message });
}
