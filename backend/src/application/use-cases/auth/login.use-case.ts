import { prisma } from '../../../infrastructure/database/prisma';
import { comparePassword } from '../../../infrastructure/auth/hash';
import { generateTokenPair } from '../../../infrastructure/auth/jwt';
import { AppError } from '../../../shared/errors/AppError';
import type { LoginInput } from '../../../interfaces/http/validators/auth.validator';

function isCpf(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  return digits.length === 11 && /^\d+$/.test(digits);
}

export async function loginUseCase(input: LoginInput) {
  const { identifier, password } = input;
  const cleanIdentifier = identifier.trim();

  // Detecta se e CPF (so digitos, 11 chars) ou email (contem @)
  if (isCpf(cleanIdentifier)) {
    // Login por CPF — busca User (CLIENT ou ADMIN)
    const cpf = cleanIdentifier.replace(/\D/g, '');
    const user = await prisma.user.findUnique({
      where: { cpf },
      select: {
        id: true,
        name: true,
        email: true,
        cpf: true,
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

      const validPassword = await comparePassword(password, user.password);
      if (!validPassword) {
        throw AppError.unauthorized('CPF ou senha incorretos');
      }

      const tokens = generateTokenPair(user.id, user.role);

      await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: tokens.refreshToken, lastLoginAt: new Date() },
      });

      const { password: _, ...userWithoutPassword } = user;
      return { user: userWithoutPassword, tokens };
    }
  } else {
    // Login por email — busca PartnerUser
    const partnerUser = await prisma.partnerUser.findUnique({
      where: { email: cleanIdentifier },
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

      const validPassword = await comparePassword(password, partnerUser.password);
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
  }

  throw AppError.unauthorized('Credenciais incorretas');
}
