import { prisma } from '../../../infrastructure/database/prisma';
import { verifyRefreshToken, generateTokenPair } from '../../../infrastructure/auth/jwt';
import { AppError } from '../../../shared/errors/AppError';

export async function refreshTokenUseCase(refreshToken: string) {
  let payload;
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    throw AppError.unauthorized('Refresh token invalido ou expirado');
  }

  // Verifica se o token ainda esta salvo (nao foi invalidado pelo logout)
  if (payload.role === 'PARTNER') {
    const partnerUser = await prisma.partnerUser.findFirst({
      where: { id: payload.sub, refreshToken },
    });
    if (!partnerUser) {
      throw AppError.unauthorized('Refresh token invalido');
    }

    const tokens = generateTokenPair(partnerUser.id, 'PARTNER');
    await prisma.partnerUser.update({
      where: { id: partnerUser.id },
      data: { refreshToken: tokens.refreshToken },
    });

    return tokens;
  }

  // User (CLIENT ou ADMIN)
  const user = await prisma.user.findFirst({
    where: { id: payload.sub, refreshToken },
  });
  if (!user) {
    throw AppError.unauthorized('Refresh token invalido');
  }

  const tokens = generateTokenPair(user.id, user.role);
  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken: tokens.refreshToken },
  });

  return tokens;
}
