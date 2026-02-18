import { z } from 'zod';

export const updateProfileSchema = z.object({
  name: z.string().min(3).optional(),
  phone: z.string().min(10).max(11).optional(),
  birthDate: z.string().optional(),
  zipCode: z.string().length(8).optional(),
  street: z.string().min(3).optional(),
  number: z.string().min(1).optional(),
  complement: z.string().optional(),
  neighborhood: z.string().min(2).optional(),
  city: z.string().min(2).optional(),
  state: z.string().length(2).optional(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Senha atual e obrigatoria'),
  newPassword: z.string().min(8, 'Nova senha deve ter no minimo 8 caracteres'),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
