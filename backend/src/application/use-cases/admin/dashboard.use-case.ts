import { prisma } from '../../../infrastructure/database/prisma';

export async function getDashboard() {
  const now = new Date();

  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [
    totalClients,
    activeClients,
    totalPartners,
    activePartners,
    totalValidationsToday,
    totalValidationsMonth,
    revenueMonthResult,
    recentValidations,
  ] = await Promise.all([
    // Total clients
    prisma.user.count({
      where: { role: 'CLIENT' },
    }),

    // Active clients (with active subscription)
    prisma.user.count({
      where: {
        role: 'CLIENT',
        status: 'ACTIVE',
        subscriptions: {
          some: { status: 'ACTIVE' },
        },
      },
    }),

    // Total partners
    prisma.partner.count(),

    // Active partners
    prisma.partner.count({
      where: { status: 'ACTIVE' },
    }),

    // Validations today
    prisma.validation.count({
      where: {
        createdAt: { gte: startOfToday },
      },
    }),

    // Validations this month
    prisma.validation.count({
      where: {
        createdAt: { gte: startOfMonth },
      },
    }),

    // Revenue this month (sum of confirmed payments)
    prisma.payment.aggregate({
      where: {
        status: 'CONFIRMED',
        createdAt: { gte: startOfMonth },
      },
      _sum: {
        amount: true,
      },
    }),

    // Recent validations (last 5)
    prisma.validation.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { name: true },
        },
        partner: {
          select: { tradeName: true },
        },
      },
    }),
  ]);

  return {
    totalClients,
    activeClients,
    totalPartners,
    activePartners,
    totalValidationsToday,
    totalValidationsMonth,
    revenueMonth: revenueMonthResult._sum.amount || 0,
    recentValidations,
  };
}
