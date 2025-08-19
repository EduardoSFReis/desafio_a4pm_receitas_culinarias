import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { JwtPayload as AppJwtPayload } from '../types/user.types';

const SALT_ROUNDS = 10;

export const authService = {
  async hashPassword(plain: string) {
    return bcrypt.hash(plain, SALT_ROUNDS);
  },

  async comparePassword(plain: string, hash: string) {
    return bcrypt.compare(plain, hash);
  },

  generateToken(payload: AppJwtPayload) {
    const secret: jwt.Secret = process.env.JWT_SECRET as jwt.Secret;
    const expiresIn = (process.env.JWT_EXPIRES!) as jwt.SignOptions['expiresIn'];
    return jwt.sign(payload, secret, { expiresIn });
  },

  verifyToken(token: string): AppJwtPayload {
    const secret: jwt.Secret = process.env.JWT_SECRET as jwt.Secret;
    const decoded = jwt.verify(token, secret);

    if (typeof decoded === 'string') {
      throw new Error('Invalid token payload');
    }

    const sub = decoded.sub;
    const login = (decoded as any).login;

    if (typeof sub !== 'number' || typeof login !== 'string') {
      throw new Error('Invalid token claims');
    }

    return { sub, login };
  },
};
