import { prisma } from '../../../infrastructure/database/prisma';
import { AppError } from '../../../shared/errors/AppError';

export async function getPartnerStatsUseCase(partnerUserId: string) {
  // Buscar PartnerUser para obter o partnerId
  const partnerUser = await prisma.partnerUser.findUnique({
    where: { id: partnerUserId },
  });

  if (!partnerUser) {
    throw AppError.notFound('Parceiro nao encontrado');
  }

  const partnerId = partnerUser.partnerId;

  // Calcular inicio do dia e inicio do mes
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [totalValidations, validationsToday, validationsThisMonth, uniqueClients] =
    await Promise.all([
      // Total de validacoes
      prisma.validation.count({
        where: { partnerId },
      }),

      // Validacoes hoje
      prisma.validation.count({
        where: {
          partnerId,
          validatedAt: { gte: startOfToday },
        },
      }),

      // Validacoes neste mes
      prisma.validation.count({
        where: {
          partnerId,
          validatedAt: { gte: startOfMonth },
        },
      }),

      // Clientes unicos (distinct userId)
      prisma.validation.findMany({
        where: { partnerId },
        select: { userId: true },
        distinct: ['userId'],
      }),
    ]);

  return {
    totalValidations,
    validationsToday,
    validationsThisMonth,
    uniqueClients: uniqueClients.length,
  };
}
