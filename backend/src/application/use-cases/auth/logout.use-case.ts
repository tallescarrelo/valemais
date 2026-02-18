import { prisma } from '../../../infrastructure/database/prisma';

export async function logoutUseCase(userId: string, role: string) {
  if (role === 'PARTNER') {
    await prisma.partnerUser.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
  } else {
    await prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
  }

  return { message: 'Logout realizado com sucesso' };
}
