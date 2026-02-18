import { prisma } from '../../../infrastructure/database/prisma';
import { PAGINATION } from '../../../shared/constants';
import type { PaginationInput } from '../../../interfaces/http/validators/admin.validator';

export async function listClients(input: PaginationInput) {
  const page = input.page || PAGINATION.DEFAULT_PAGE;
  const perPage = input.perPage || PAGINATION.DEFAULT_PER_PAGE;
  const skip = (page - 1) * perPage;

  const where: any = {
    role: 'CLIENT',
  };

  if (input.search) {
    where.OR = [
      { name: { contains: input.search, mode: 'insensitive' as const } },
      { email: { contains: input.search, mode: 'insensitive' as const } },
    ];
  }

  if (input.status) {
    where.status = input.status;
  }

  const [items, total] = await Promise.all([
    prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        cpf: true,
        phone: true,
        cardCode: true,
        status: true,
        createdAt: true,
        _count: {
          select: {
            validations: true,
          },
        },
        subscriptions: {
          where: { status: 'ACTIVE' },
          select: { id: true },
        },
      },
      skip,
      take: perPage,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.user.count({ where }),
  ]);

  const data = items.map((item: any) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    cpf: item.cpf,
    phone: item.phone,
    cardCode: item.cardCode,
    status: item.status,
    createdAt: item.createdAt,
    validationsCount: item._count.validations,
    activeSubscriptionsCount: item.subscriptions.length,
  }));

  return {
    data,
    pagination: {
      page,
      perPage,
      total,
      totalPages: Math.ceil(total / perPage),
    },
  };
}
