import { prisma } from '../../../infrastructure/database/prisma';
import { PAGINATION } from '../../../shared/constants';

interface GetPaymentsInput {
  page?: number;
  perPage?: number;
}

export async function getPaymentsUseCase(userId: string, input: GetPaymentsInput) {
  const page = input.page || PAGINATION.DEFAULT_PAGE;
  const perPage = input.perPage || PAGINATION.DEFAULT_PER_PAGE;
  const skip = (page - 1) * perPage;

  const [payments, total] = await Promise.all([
    prisma.payment.findMany({
      where: { userId },
      include: {
        subscription: {
          include: {
            plan: {
              select: { name: true },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: perPage,
    }),
    prisma.payment.count({ where: { userId } }),
  ]);

  return {
    data: payments,
    pagination: {
      page,
      perPage,
      total,
      totalPages: Math.ceil(total / perPage),
    },
  };
}
