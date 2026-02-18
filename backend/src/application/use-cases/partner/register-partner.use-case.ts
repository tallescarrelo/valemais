import { prisma } from '../../../infrastructure/database/prisma';
import { AppError } from '../../../shared/errors/AppError';
import { hashPassword } from '../../../infrastructure/auth/hash';
import { generatePartnerCode } from '../../../shared/utils/generateCode';
import type { PartnerRegisterInput } from '../../../interfaces/http/validators/partner.validator';

export async function registerPartnerUseCase(input: PartnerRegisterInput) {
  // Verificar se CNPJ ja existe
  const existingCnpj = await prisma.partner.findUnique({ where: { cnpj: input.cnpj } });
  if (existingCnpj) {
    throw AppError.conflict('CNPJ ja cadastrado');
  }

  // Verificar se email ja existe
  const existingEmail = await prisma.partner.findUnique({ where: { email: input.email } });
  if (existingEmail) {
    throw AppError.conflict('Email ja cadastrado');
  }

  // Gerar codigo de parceiro unico
  let partnerCode = generatePartnerCode(input.tradeName);
  while (await prisma.partner.findUnique({ where: { partnerCode } })) {
    partnerCode = generatePartnerCode(input.tradeName);
  }

  // Hash da senha do usuario do parceiro
  const hashedPassword = await hashPassword(input.password);

  // Criar Partner e PartnerUser em uma transacao
  const partner = await prisma.$transaction(async (tx: any) => {
    const newPartner = await tx.partner.create({
      data: {
        companyName: input.companyName,
        tradeName: input.tradeName,
        cnpj: input.cnpj,
        email: input.email,
        phone: input.phone,
        zipCode: input.zipCode,
        street: input.street,
        number: input.number,
        complement: input.complement,
        neighborhood: input.neighborhood,
        city: input.city,
        state: input.state,
        category: input.category,
        discountType: input.discountType,
        discountValue: input.discountValue,
        discountDescription: input.discountDescription,
        website: input.website || null,
        instagram: input.instagram || null,
        openingHours: input.openingHours || null,
        partnerCode,
        status: 'PENDING',
      },
    });

    await tx.partnerUser.create({
      data: {
        name: input.userName,
        email: input.email,
        password: hashedPassword,
        partnerId: newPartner.id,
      },
    });

    return newPartner;
  });

  return {
    partner: {
      id: partner.id,
      companyName: partner.companyName,
      tradeName: partner.tradeName,
      cnpj: partner.cnpj,
      email: partner.email,
      partnerCode: partner.partnerCode,
      status: partner.status,
      createdAt: partner.createdAt,
    },
    message: 'Cadastro recebido! Aguarde aprovacao da equipe Vale+.',
  };
}
