import { prisma } from '../../../infrastructure/database/prisma';
import { AppError } from '../../../shared/errors/AppError';

export async function getCardUseCase(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      cardCode: true,
      name: true,
      status: true,
      subscriptions: {
        where: { status: 'ACTIVE' },
        select: {
          plan: {
            select: {
              name: true,
            },
          },
          endDate: true,
        },
        take: 1,
      },
    },
  });

  if (!user) {
    throw AppError.notFound('Usuario nao encontrado');
  }

  const activeSubscription = user.subscriptions[0] || null;

  return {
    cardCode: user.cardCode,
    name: user.name,
    status: user.status,
    subscription: activeSubscription
      ? {
          planName: activeSubscription.plan.name,
          endDate: activeSubscription.endDate,
        }
      : null,
  };
}
