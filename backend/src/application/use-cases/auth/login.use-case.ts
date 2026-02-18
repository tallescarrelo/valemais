import { prisma } from '../../../infrastructure/database/prisma';
import { comparePassword } from '../../../infrastructure/auth/hash';
import { generateTokenPair } from '../../../infrastructure/auth/jwt';
import { AppError } from '../../../shared/errors/AppError';
import type { LoginInput } from '../../../interfaces/http/validators/auth.validator';

export async function loginUseCase(input: LoginInput) {
  // Primeiro tenta como User (CLIENT ou ADMIN)
  const user = await prisma.user.findUnique({
    where: { email: input.email },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
      cardCode: true,
      role: true,
      status: true,
    },
  });

  if (user) {
    if (user.status === 'BLOCKED') {
      throw AppError.forbidden('Sua conta foi bloqueada. Entre em contato com o suporte.');
    }

    if (user.status === 'INACTIVE') {
      throw AppError.forbidden('Sua conta esta inativa.');
    }

    const validPassword = await comparePassword(input.password, user.password);
    if (!validPassword) {
      throw AppError.unauthorized('Email ou senha incorretos');
    }

    const tokens = generateTokenPair(user.id, user.role);

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: tokens.refreshToken, lastLoginAt: new Date() },
    });

    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, tokens };
  }

  // Tenta como PartnerUser
  const partnerUser = await prisma.partnerUser.findUnique({
    where: { email: input.email },
    include: {
      partner: {
        select: {
          id: true,
          tradeName: true,
          status: true,
        },
      },
    },
  });

  if (partnerUser) {
    if (partnerUser.partner.status === 'BLOCKED') {
      throw AppError.forbidden('Este parceiro foi bloqueado.');
    }

    if (partnerUser.partner.status === 'PENDING') {
      throw AppError.forbidden('Seu cadastro ainda esta em analise. Aguarde aprovacao.');
    }

    const validPassword = await comparePassword(input.password, partnerUser.password);
    if (!validPassword) {
      throw AppError.unauthorized('Email ou senha incorretos');
    }

    const tokens = generateTokenPair(partnerUser.id, 'PARTNER');

    await prisma.partnerUser.update({
      where: { id: partnerUser.id },
      data: { refreshToken: tokens.refreshToken },
    });

    return {
      user: {
        id: partnerUser.id,
        name: partnerUser.name,
        email: partnerUser.email,
        role: 'PARTNER' as const,
        partnerId: partnerUser.partnerId,
        partnerName: partnerUser.partner.tradeName,
      },
      tokens,
    };
  }

  throw AppError.unauthorized('Email ou senha incorretos');
}
