import { prisma } from '../../../infrastructure/database/prisma';
import { AppError } from '../../../shared/errors/AppError';
import type { UpdateProfileInput } from '../../../interfaces/http/validators/client.validator';

export async function updateProfileUseCase(userId: string, input: UpdateProfileInput) {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw AppError.notFound('Usuario nao encontrado');
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      name: input.name,
      phone: input.phone,
      birthDate: input.birthDate ? new Date(input.birthDate) : undefined,
      zipCode: input.zipCode,
      street: input.street,
      number: input.number,
      complement: input.complement,
      neighborhood: input.neighborhood,
      city: input.city,
      state: input.state,
    },
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

  return updatedUser;
}
