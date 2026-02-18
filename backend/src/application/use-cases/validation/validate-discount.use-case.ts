import { prisma } from '../../../infrastructure/database/prisma';
import { AppError } from '../../../shared/errors/AppError';
import { generateValidationCode } from '../../../shared/utils/generateCode';

export async function validateDiscountUseCase(
  userId: string,
  partnerCode: string,
  ipAddress?: string,
  userAgent?: string,
) {
  // 1. Buscar usuario
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw AppError.notFound('Usuario nao encontrado');
  }

  // 2. Verificar se usuario esta ativo
  if (user.status !== 'ACTIVE') {
    throw AppError.forbidden('Sua conta esta inativa ou bloqueada');
  }

  // 3. Buscar parceiro pelo codigo
  const partner = await prisma.partner.findUnique({ where: { partnerCode } });
  if (!partner) {
    throw AppError.notFound('Parceiro nao encontrado');
  }

  // 4. Verificar se parceiro esta ativo
  if (partner.status !== 'ACTIVE') {
    throw AppError.badRequest('Este parceiro nao esta ativo');
  }

  // 5. Verificar assinatura ativa
  const activeSubscription = await prisma.subscription.findFirst({
    where: {
      userId,
      status: 'ACTIVE',
      endDate: { gt: new Date() },
    },
  });

  if (!activeSubscription) {
    // Gerar codigo unico para validacao invalida
    let code = generateValidationCode();
    while (await prisma.validation.findUnique({ where: { code } })) {
      code = generateValidationCode();
    }

    await prisma.validation.create({
      data: {
        userId,
        partnerId: partner.id,
        status: 'INVALID',
        code,
        reason: 'SUBSCRIPTION_EXPIRED',
        ipAddress: ipAddress || null,
        userAgent: userAgent || null,
      },
    });

    return {
      status: 'INVALID' as const,
      reason: 'SUBSCRIPTION_EXPIRED',
      message: 'Seu plano esta vencido. Renove para continuar usando seus beneficios.',
    };
  }

  // 6. Tudo certo - gerar validacao valida
  let code = generateValidationCode();
  while (await prisma.validation.findUnique({ where: { code } })) {
    code = generateValidationCode();
  }

  const validation = await prisma.validation.create({
    data: {
      userId,
      partnerId: partner.id,
      status: 'VALID',
      code,
      ipAddress: ipAddress || null,
      userAgent: userAgent || null,
    },
  });

  return {
    status: 'VALID' as const,
    validation: {
      id: validation.id,
      code: validation.code,
      partnerName: partner.tradeName,
      discountDescription: partner.discountDescription,
      discountType: partner.discountType,
      discountValue: Number(partner.discountValue),
      validatedAt: validation.validatedAt,
    },
  };
}
