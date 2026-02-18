import type { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../../../infrastructure/auth/jwt';
import { AppError } from '../../../shared/errors/AppError';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      userRole?: string;
    }
  }
}

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw AppError.unauthorized('Token nao fornecido');
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = verifyAccessToken(token);
    req.userId = payload.sub;
    req.userRole = payload.role;
    next();
  } catch {
    throw AppError.unauthorized('Token invalido ou expirado');
  }
}

export function requireRole(...roles: string[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.userRole || !roles.includes(req.userRole)) {
      throw AppError.forbidden('Voce nao tem permissao para acessar este recurso');
    }
    next();
  };
}

export function requireActiveSubscription(req: Request, _res: Response, next: NextFunction) {
  // Admins e partners nao precisam de assinatura
  if (req.userRole === 'ADMIN' || req.userRole === 'PARTNER') {
    next();
    return;
  }

  // Para clients, verificamos no use case (mais flexivel)
  next();
}
