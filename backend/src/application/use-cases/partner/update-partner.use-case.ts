import { prisma } from '../../../infrastructure/database/prisma';
import { AppError } from '../../../shared/errors/AppError';
import type { PartnerUpdateInput } from '../../../interfaces/http/validators/partner.validator';

export async function updatePartnerUseCase(partnerUserId: string, input: PartnerUpdateInput) {
  // Buscar PartnerUser para obter o partnerId
  const partnerUser = await prisma.partnerUser.findUnique({
    where: { id: partnerUserId },
  });

  if (!partnerUser) {
    throw AppError.notFound('Parceiro nao encontrado');
  }

  // Atualizar parceiro com os campos fornecidos
  const updatedPartner = await prisma.partner.update({
    where: { id: partnerUser.partnerId },
    data: {
      ...(input.tradeName !== undefined && { tradeName: input.tradeName }),
      ...(input.phone !== undefined && { phone: input.phone }),
      ...(input.discountType !== undefined && { discountType: input.discountType }),
      ...(input.discountValue !== undefined && { discountValue: input.discountValue }),
      ...(input.discountDescription !== undefined && { discountDescription: input.discountDescription }),
      ...(input.website !== undefined && { website: input.website || null }),
      ...(input.instagram !== undefined && { instagram: input.instagram || null }),
      ...(input.openingHours !== undefined && { openingHours: input.openingHours || null }),
    },
  });

  return {
    partner: {
      id: updatedPartner.id,
      companyName: updatedPartner.companyName,
      tradeName: updatedPartner.tradeName,
      cnpj: updatedPartner.cnpj,
      email: updatedPartner.email,
      phone: updatedPartner.phone,
      category: updatedPartner.category,
      discountType: updatedPartner.discountType,
      discountValue: updatedPartner.discountValue,
      discountDescription: updatedPartner.discountDescription,
      website: updatedPartner.website,
      instagram: updatedPartner.instagram,
      openingHours: updatedPartner.openingHours,
      status: updatedPartner.status,
      updatedAt: updatedPartner.updatedAt,
    },
  };
}
