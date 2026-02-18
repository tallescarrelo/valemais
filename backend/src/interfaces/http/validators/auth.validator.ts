import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no minimo 3 caracteres'),
  email: z.string().email('Email invalido'),
  cpf: z.string().length(11, 'CPF deve ter 11 digitos').regex(/^\d+$/, 'CPF deve conter apenas numeros'),
  phone: z.string().min(10, 'Telefone invalido').max(11, 'Telefone invalido'),
  password: z.string().min(8, 'Senha deve ter no minimo 8 caracteres'),
  birthDate: z.string().optional(),
  acceptTerms: z.literal(true, { error: 'Voce deve aceitar os termos' }),
});

export const loginSchema = z.object({
  email: z.string().email('Email invalido'),
  password: z.string().min(1, 'Senha e obrigatoria'),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Email invalido'),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token e obrigatorio'),
  password: z.string().min(8, 'Senha deve ter no minimo 8 caracteres'),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token e obrigatorio'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
