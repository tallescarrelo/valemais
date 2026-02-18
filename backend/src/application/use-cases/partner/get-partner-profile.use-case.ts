import { prisma } from '../../../infrastructure/database/prisma';
import { AppError } from '../../../shared/errors/AppError';

export async function getPartnerProfileUseCase(partnerUserId: string) {
  const partnerUser = await prisma.partnerUser.findUnique({
    where: { id: partnerUserId },
    include: {
      partner: true,
    },
  });

  if (!partnerUser) {
    throw AppError.notFound('Parceiro nao encontrado');
  }

  return {
    user: {
      id: partnerUser.id,
      name: partnerUser.name,
      email: partnerUser.email,
    },
    partner: {
      id: partnerUser.partner.id,
      companyName: partnerUser.partner.companyName,
      tradeName: partnerUser.partner.tradeName,
      cnpj: partnerUser.partner.cnpj,
      email: partnerUser.partner.email,
      phone: partnerUser.partner.phone,
      zipCode: partnerUser.partner.zipCode,
      street: partnerUser.partner.street,
      number: partnerUser.partner.number,
      complement: partnerUser.partner.complement,
      neighborhood: partnerUser.partner.neighborhood,
      city: partnerUser.partner.city,
      state: partnerUser.partner.state,
      category: partnerUser.partner.category,
      discountType: partnerUser.partner.discountType,
      discountValue: partnerUser.partner.discountValue,
      discountDescription: partnerUser.partner.discountDescription,
      logoUrl: partnerUser.partner.logoUrl,
      partnerCode: partnerUser.partner.partnerCode,
      qrCodeUrl: partnerUser.partner.qrCodeUrl,
      status: partnerUser.partner.status,
      website: partnerUser.partner.website,
      instagram: partnerUser.partner.instagram,
      openingHours: partnerUser.partner.openingHours,
      createdAt: partnerUser.partner.createdAt,
      updatedAt: partnerUser.partner.updatedAt,
    },
  };
}
