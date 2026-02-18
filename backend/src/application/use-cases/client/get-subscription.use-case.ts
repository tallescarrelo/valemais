import { prisma } from '../../../infrastructure/database/prisma';

export async function getSubscriptionUseCase(userId: string) {
  const subscription = await prisma.subscription.findFirst({
    where: {
      userId,
      status: { in: ['ACTIVE', 'PENDING'] },
    },
    include: {
      plan: true,
      payments: {
        orderBy: { createdAt: 'desc' },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return subscription;
}
