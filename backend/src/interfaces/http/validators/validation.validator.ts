import { z } from 'zod';

export const validateDiscountSchema = z.object({
  partnerCode: z.string().min(1, 'Codigo do parceiro e obrigatorio'),
});

export type ValidateDiscountInput = z.infer<typeof validateDiscountSchema>;
