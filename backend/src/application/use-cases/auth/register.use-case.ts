import { prisma } from '../../../infrastructure/database/prisma';
import { hashPassword } from '../../../infrastructure/auth/hash';
import { generateTokenPair } from '../../../infrastructure/auth/jwt';
import { generateCardCode } from '../../../shared/utils/generateCode';
import { AppError } from '../../../shared/errors/AppError';
import type { RegisterInput } from '../../../interfaces/http/validators/auth.validator';

export async function registerUseCase(input: RegisterInput) {
  // Verificar se email ja existe
  const existingEmail = await prisma.user.findUnique({ where: { email: input.email } });
  if (existingEmail) {
    throw AppError.conflict('Email ja cadastrado');
  }

  // Verificar se CPF ja existe
  const existingCpf = await prisma.user.findUnique({ where: { cpf: input.cpf } });
  if (existingCpf) {
    throw AppError.conflict('CPF ja cadastrado');
  }

  // Gerar codigo do cartao unico
  let cardCode = generateCardCode();
  while (await prisma.user.findUnique({ where: { cardCode } })) {
    cardCode = generateCardCode();
  }

  // Hash da senha
  const hashedPassword = await hashPassword(input.password);

  // Criar usuario
  const user = await prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      cpf: input.cpf,
      phone: input.phone,
      password: hashedPassword,
      birthDate: input.birthDate ? new Date(input.birthDate) : null,
      cardCode,
      role: 'CLIENT',
    },
    select: {
      id: true,
      name: true,
      email: true,
      cardCode: true,
      role: true,
      createdAt: true,
    },
  });

  // Gerar tokens
  const tokens = generateTokenPair(user.id, user.role);

  // Salvar refresh token
  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken: tokens.refreshToken },
  });

  return { user, tokens };
}
