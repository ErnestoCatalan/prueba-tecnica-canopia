import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export const signToken = (payload: object) => {
  // 5 minutos
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '5m' });
}

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
}
