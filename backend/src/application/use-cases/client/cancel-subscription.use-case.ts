import { prisma } from '../../../infrastructure/database/prisma';
import { AppError } from '../../../shared/errors/AppError';

export async function cancelSubscriptionUseCase(userId: string) {
  const subscription = await prisma.subscription.findFirst({
    where: {
      userId,
      status: 'ACTIVE',
    },
  });

  if (!subscription) {
    throw AppError.badRequest('Nenhuma assinatura ativa encontrada');
  }

  const cancelledSubscription = await prisma.subscription.update({
    where: { id: subscription.id },
    data: {
      status: 'CANCELLED',
      cancelledAt: new Date(),
    },
    include: {
      plan: true,
    },
  });

  return cancelledSubscription;
}
