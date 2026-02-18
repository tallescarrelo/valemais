import { prisma } from '../../../infrastructure/database/prisma';
import { PAGINATION } from '../../../shared/constants';
import type { PaginationInput } from '../../../interfaces/http/validators/admin.validator';

export async function listPartners(input: PaginationInput) {
  const page = input.page || PAGINATION.DEFAULT_PAGE;
  const perPage = input.perPage || PAGINATION.DEFAULT_PER_PAGE;
  const skip = (page - 1) * perPage;

  const where: any = {};

  if (input.search) {
    where.OR = [
      { tradeName: { contains: input.search, mode: 'insensitive' as const } },
      { companyName: { contains: input.search, mode: 'insensitive' as const } },
    ];
  }

  if (input.status) {
    where.status = input.status;
  }

  const [items, total] = await Promise.all([
    prisma.partner.findMany({
      where,
      select: {
        id: true,
        companyName: true,
        tradeName: true,
        cnpj: true,
        email: true,
        category: true,
        status: true,
        createdAt: true,
        _count: {
          select: {
            validations: true,
          },
        },
      },
      skip,
      take: perPage,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.partner.count({ where }),
  ]);

  const data = items.map((item: any) => ({
    id: item.id,
    companyName: item.companyName,
    tradeName: item.tradeName,
    cnpj: item.cnpj,
    email: item.email,
    category: item.category,
    status: item.status,
    createdAt: item.createdAt,
    validationsCount: item._count.validations,
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
