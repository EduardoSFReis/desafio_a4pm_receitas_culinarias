import 'express';

declare module 'express-serve-static-core' {
  interface Request {
    userId?: number;
    userLogin?: string;
  }
}

export type AuthRequest = import('express').Request & {
  userId?: number;
  userLogin?: string;
};
