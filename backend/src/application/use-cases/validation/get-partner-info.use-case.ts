import { prisma } from '../../../infrastructure/database/prisma';
import { AppError } from '../../../shared/errors/AppError';

export async function getPartnerInfoUseCase(partnerCode: string) {
  const partner = await prisma.partner.findUnique({
    where: { partnerCode },
    select: {
      tradeName: true,
      logoUrl: true,
      category: true,
      discountType: true,
      discountValue: true,
      discountDescription: true,
      status: true,
    },
  });

  if (!partner) {
    throw AppError.notFound('Parceiro nao encontrado');
  }

  if (partner.status !== 'ACTIVE') {
    throw AppError.badRequest('Este parceiro nao esta ativo');
  }

  return {
    tradeName: partner.tradeName,
    logoUrl: partner.logoUrl,
    category: partner.category,
    discountType: partner.discountType,
    discountValue: Number(partner.discountValue),
    discountDescription: partner.discountDescription,
  };
}
