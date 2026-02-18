import { prisma } from '../../../infrastructure/database/prisma';
import { AppError } from '../../../shared/errors/AppError';
import { PAGINATION } from '../../../shared/constants';

interface GetPartnerValidationsInput {
  page?: number;
  perPage?: number;
}

export async function getPartnerValidationsUseCase(
  partnerUserId: string,
  input: GetPartnerValidationsInput = {},
) {
  // Buscar PartnerUser para obter o partnerId
  const partnerUser = await prisma.partnerUser.findUnique({
    where: { id: partnerUserId },
  });

  if (!partnerUser) {
    throw AppError.notFound('Parceiro nao encontrado');
  }

  const page = input.page || PAGINATION.DEFAULT_PAGE;
  const perPage = input.perPage || PAGINATION.DEFAULT_PER_PAGE;
  const skip = (page - 1) * perPage;

  const [validations, total] = await Promise.all([
    prisma.validation.findMany({
      where: { partnerId: partnerUser.partnerId },
      include: {
        user: {
          select: { name: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: perPage,
    }),
    prisma.validation.count({
      where: { partnerId: partnerUser.partnerId },
    }),
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
