import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  // Verificar header de autorización
  if (!authHeader) {
    return res.status(401).json({
      ok: false,
      code: 'MISSING_TOKEN',
      message: 'No se proporcionó token de autenticación'
    });
  }

  const [scheme, token] = authHeader.split(' ');

  // Verificar formato del token
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({
      ok: false,
      code: 'INVALID_TOKEN_FORMAT',
      message: 'Formato de token inválido. Use: Bearer <token>'
    });
  }

  try {
    // Verificar y decodificar token
    const payload = jwt.verify(token, JWT_SECRET) as {
      id: number;
      role: string;
      iat: number;
      exp: number;
    };

    // Verificar si el token está próximo a expirar (en menos de 1 minuto)
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp - now < 60) {
      res.setHeader('X-Token-Expiring-Soon', 'true');
    }

    // Adjuntar usuario a la request
    req.user = {
      id: payload.id,
      role: payload.role
    };

    next();
  } catch (err: any) {
    let message = 'Token inválido';
    let code = 'INVALID_TOKEN';

    if (err.name === 'TokenExpiredError') {
      message = 'Token expirado';
      code = 'TOKEN_EXPIRED';
    }

    return res.status(401).json({
      ok: false,
      code,
      message
    });
  }
};
