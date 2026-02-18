import { prisma } from '../../../infrastructure/database/prisma';
import { AppError } from '../../../shared/errors/AppError';

export async function getPartnerDetail(id: string) {
  const partner = await prisma.partner.findUnique({
    where: { id },
    include: {
      users: {
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
      },
      _count: {
        select: {
          validations: true,
        },
      },
    },
  });

  if (!partner) {
    throw AppError.notFound('Parceiro nao encontrado');
  }

  return partner;
}

export async function approvePartner(id: string) {
  const partner = await prisma.partner.findUnique({
    where: { id },
  });

  if (!partner) {
    throw AppError.notFound('Parceiro nao encontrado');
  }

  if (partner.status !== 'PENDING') {
    throw AppError.badRequest('Parceiro nao esta com status PENDING');
  }

  const updated = await prisma.partner.update({
    where: { id },
    data: { status: 'ACTIVE' },
  });

  return updated;
}

export async function rejectPartner(id: string) {
  const partner = await prisma.partner.findUnique({
    where: { id },
  });

  if (!partner) {
    throw AppError.notFound('Parceiro nao encontrado');
  }

  if (partner.status !== 'PENDING') {
    throw AppError.badRequest('Parceiro nao esta com status PENDING');
  }

  const updated = await prisma.partner.update({
    where: { id },
    data: { status: 'INACTIVE' },
  });

  return updated;
}

export async function updatePartnerStatus(
  id: string,
  status: 'ACTIVE' | 'INACTIVE' | 'BLOCKED',
) {
  const partner = await prisma.partner.findUnique({
    where: { id },
  });

  if (!partner) {
    throw AppError.notFound('Parceiro nao encontrado');
  }

  const updated = await prisma.partner.update({
    where: { id },
    data: { status },
  });

  return updated;
}
