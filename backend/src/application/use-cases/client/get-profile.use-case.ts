import { prisma } from '../../../infrastructure/database/prisma';
import { AppError } from '../../../shared/errors/AppError';

export async function getProfileUseCase(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
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
    },
  });

  if (!user) {
    throw AppError.notFound('Usuario nao encontrado');
  }

  return user;
}
