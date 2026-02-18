import { prisma } from '../../../infrastructure/database/prisma';
import { PAGINATION } from '../../../shared/constants';
import type { PaginationInput } from '../../../interfaces/http/validators/admin.validator';

export async function listPayments(input: PaginationInput) {
  const page = input.page || PAGINATION.DEFAULT_PAGE;
  const perPage = input.perPage || PAGINATION.DEFAULT_PER_PAGE;
  const skip = (page - 1) * perPage;

  const where: any = {};

  if (input.status) {
    where.status = input.status;
  }

  const [items, total] = await Promise.all([
    prisma.payment.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
          },
        },
        subscription: {
          select: {
            plan: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      skip,
      take: perPage,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.payment.count({ where }),
  ]);

  return {
    data: items,
    pagination: {
      page,
      perPage,
      total,
      totalPages: Math.ceil(total / perPage),
    },
  };
}
