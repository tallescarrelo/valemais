import { z } from 'zod';

export const createPlanSchema = z.object({
  name: z.string().min(3, 'Nome do plano deve ter no minimo 3 caracteres'),
  description: z.string().min(10, 'Descricao deve ter no minimo 10 caracteres'),
  price: z.number().int().positive('Preco deve ser positivo (em centavos)'),
  intervalMonths: z.number().int().positive().default(1),
  benefits: z.array(z.string()).min(1, 'Adicione pelo menos 1 beneficio'),
});

export const updatePlanSchema = z.object({
  name: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  price: z.number().int().positive().optional(),
  intervalMonths: z.number().int().positive().optional(),
  benefits: z.array(z.string()).min(1).optional(),
});

export const updateClientStatusSchema = z.object({
  status: z.enum(['ACTIVE', 'INACTIVE', 'BLOCKED']),
});

export const updatePartnerStatusSchema = z.object({
  status: z.enum(['ACTIVE', 'INACTIVE', 'BLOCKED']),
});

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  perPage: z.coerce.number().int().positive().max(100).default(20),
  search: z.string().optional(),
  status: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export type CreatePlanInput = z.infer<typeof createPlanSchema>;
export type UpdatePlanInput = z.infer<typeof updatePlanSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
