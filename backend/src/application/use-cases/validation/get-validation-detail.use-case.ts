import { prisma } from '../../../infrastructure/database/prisma';
import { AppError } from '../../../shared/errors/AppError';

export async function getValidationDetailUseCase(validationId: string, userId: string) {
  const validation = await prisma.validation.findUnique({
    where: { id: validationId },
    include: {
      partner: {
        select: {
          tradeName: true,
          category: true,
          discountType: true,
          discountValue: true,
          discountDescription: true,
        },
      },
    },
  });

  if (!validation) {
    throw AppError.notFound('Validacao nao encontrada');
  }

  if (validation.userId !== userId) {
    throw AppError.forbidden('Sem permissao para acessar esta validacao');
  }

  return {
    id: validation.id,
    code: validation.code,
    status: validation.status,
    reason: validation.reason,
    validatedAt: validation.validatedAt,
    ipAddress: validation.ipAddress,
    userAgent: validation.userAgent,
    createdAt: validation.createdAt,
    partner: {
      tradeName: validation.partner.tradeName,
      category: validation.partner.category,
      discountType: validation.partner.discountType,
      discountValue: Number(validation.partner.discountValue),
      discountDescription: validation.partner.discountDescription,
    },
  };
}
