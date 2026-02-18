import { prisma } from '../../../infrastructure/database/prisma';
import { AppError } from '../../../shared/errors/AppError';

export async function getClientDetail(id: string) {
  const client = await prisma.user.findUnique({
    where: { id, role: 'CLIENT' },
    select: {
      id: true,
      name: true,
      email: true,
      cpf: true,
      phone: true,
      birthDate: true,
      cardCode: true,
      role: true,
      status: true,
      zipCode: true,
      street: true,
      number: true,
      complement: true,
      neighborhood: true,
      city: true,
      state: true,
      createdAt: true,
      updatedAt: true,
      lastLoginAt: true,
      subscriptions: {
        include: {
          plan: true,
        },
        orderBy: { createdAt: 'desc' },
      },
      _count: {
        select: {
          payments: true,
          validations: true,
        },
      },
    },
  });

  if (!client) {
    throw AppError.notFound('Cliente nao encontrado');
  }

  return client;
}

export async function updateClientStatus(
  id: string,
  status: 'ACTIVE' | 'INACTIVE' | 'BLOCKED',
) {
  const client = await prisma.user.findUnique({
    where: { id, role: 'CLIENT' },
  });

  if (!client) {
    throw AppError.notFound('Cliente nao encontrado');
  }

  const updated = await prisma.user.update({
    where: { id },
    data: { status },
    select: {
      id: true,
      name: true,
      email: true,
      status: true,
    },
  });

  return updated;
}
