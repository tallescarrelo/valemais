import type { Request, Response } from 'express';
import { registerUseCase } from '../../../application/use-cases/auth/register.use-case';
import { loginUseCase } from '../../../application/use-cases/auth/login.use-case';
import { refreshTokenUseCase } from '../../../application/use-cases/auth/refresh-token.use-case';
import { forgotPasswordUseCase } from '../../../application/use-cases/auth/forgot-password.use-case';
import { resetPasswordUseCase } from '../../../application/use-cases/auth/reset-password.use-case';
import { logoutUseCase } from '../../../application/use-cases/auth/logout.use-case';

export class AuthController {
  async register(req: Request, res: Response) {
    const result = await registerUseCase(req.body);
    res.status(201).json({ data: result });
  }

  async login(req: Request, res: Response) {
    const result = await loginUseCase(req.body);

    // Set refresh token in httpOnly cookie
    res.cookie('refreshToken', result.tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/api/v1/auth/refresh',
    });

    res.json({ data: result });
  }

  async refresh(req: Request, res: Response) {
    const refreshToken = req.cookies?.refreshToken || req.body.refreshToken;

    if (!refreshToken) {
      res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Refresh token nao fornecido' } });
      return;
    }

    const tokens = await refreshTokenUseCase(refreshToken);

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/api/v1/auth/refresh',
    });

    res.json({ data: { tokens } });
  }

  async forgotPassword(req: Request, res: Response) {
    const result = await forgotPasswordUseCase(req.body.email);
    res.json({ data: result });
  }

  async resetPassword(req: Request, res: Response) {
    const result = await resetPasswordUseCase(req.body.token, req.body.password);
    res.json({ data: result });
  }

  async logout(req: Request, res: Response) {
    const result = await logoutUseCase(req.userId!, req.userRole!);

    res.clearCookie('refreshToken', { path: '/api/v1/auth/refresh' });
    res.json({ data: result });
  }
}
