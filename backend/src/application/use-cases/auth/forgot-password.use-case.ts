import { prisma } from '../../../infrastructure/database/prisma';
import { generateResetToken } from '../../../shared/utils/generateCode';
import { RESET_PASSWORD_EXPIRES_HOURS } from '../../../shared/constants';
import { logger } from '../../../shared/utils/logger';

export async function forgotPasswordUseCase(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  // Nao revelamos se o email existe ou nao (seguranca)
  if (!user) {
    return { message: 'Se o email estiver cadastrado, voce recebera um link para redefinir sua senha.' };
  }

  const resetToken = generateResetToken();
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + RESET_PASSWORD_EXPIRES_HOURS);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      resetPasswordToken: resetToken,
      resetPasswordExpires: expiresAt,
    },
  });

  // TODO: Enviar email com o link de reset (SendGrid)
  // Por enquanto, logamos o token no console (dev only)
  logger.info(`[DEV] Reset token for ${email}: ${resetToken}`);

  return { message: 'Se o email estiver cadastrado, voce recebera um link para redefinir sua senha.' };
}
