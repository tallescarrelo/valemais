import { prisma } from '../../../infrastructure/database/prisma';
import { hashPassword } from '../../../infrastructure/auth/hash';
import { AppError } from '../../../shared/errors/AppError';

export async function resetPasswordUseCase(token: string, newPassword: string) {
  const user = await prisma.user.findFirst({
    where: {
      resetPasswordToken: token,
      resetPasswordExpires: { gte: new Date() },
    },
  });

  if (!user) {
    throw AppError.badRequest('Token invalido ou expirado. Solicite um novo link.');
  }

  const hashedPassword = await hashPassword(newPassword);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null,
      refreshToken: null, // Invalida sessoes anteriores
    },
  });

  return { message: 'Senha redefinida com sucesso. Faca login com sua nova senha.' };
}
