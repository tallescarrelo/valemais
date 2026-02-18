import { prisma } from '../../../infrastructure/database/prisma';
import { PAGINATION } from '../../../shared/constants';

interface GetValidationsInput {
  page?: number;
  perPage?: number;
}

export async function getValidationsUseCase(userId: string, input: GetValidationsInput) {
  const page = input.page || PAGINATION.DEFAULT_PAGE;
  const perPage = input.perPage || PAGINATION.DEFAULT_PER_PAGE;
  const skip = (page - 1) * perPage;

  const [validations, total] = await Promise.all([
    prisma.validation.findMany({
      where: { userId },
      include: {
        partner: {
          select: {
            tradeName: true,
            category: true,
          },
        },
      },
      orderBy: { validatedAt: 'desc' },
      skip,
      take: perPage,
    }),
    prisma.validation.count({ where: { userId } }),
  ]);

  return {
    data: validations,
    pagination: {
      page,
      perPage,
      total,
      totalPages: Math.ceil(total / perPage),
    },
  };
}
