import { z } from 'zod';

export const partnerRegisterSchema = z.object({
  companyName: z.string().min(3, 'Razao social deve ter no minimo 3 caracteres'),
  tradeName: z.string().min(2, 'Nome fantasia deve ter no minimo 2 caracteres'),
  cnpj: z.string().length(14, 'CNPJ deve ter 14 digitos').regex(/^\d+$/, 'CNPJ deve conter apenas numeros'),
  email: z.string().email('Email invalido'),
  phone: z.string().min(10, 'Telefone invalido').max(11, 'Telefone invalido'),
  zipCode: z.string().length(8, 'CEP deve ter 8 digitos'),
  street: z.string().min(3, 'Rua e obrigatoria'),
  number: z.string().min(1, 'Numero e obrigatorio'),
  complement: z.string().optional(),
  neighborhood: z.string().min(2, 'Bairro e obrigatorio'),
  city: z.string().min(2, 'Cidade e obrigatoria'),
  state: z.string().length(2, 'Estado deve ter 2 letras'),
  category: z.enum([
    'FOOD', 'HEALTH', 'BEAUTY', 'SERVICES', 'EDUCATION',
    'ENTERTAINMENT', 'FASHION', 'AUTOMOTIVE', 'TECHNOLOGY', 'OTHER',
  ]),
  discountType: z.enum(['PERCENTAGE', 'FIXED']).default('PERCENTAGE'),
  discountValue: z.number().positive('Valor do desconto deve ser positivo'),
  discountDescription: z.string().min(5, 'Descricao do desconto e obrigatoria'),
  website: z.string().url('URL invalida').optional().or(z.literal('')),
  instagram: z.string().optional(),
  openingHours: z.string().optional(),
  // Dados do usuario do parceiro
  userName: z.string().min(3, 'Nome do responsavel deve ter no minimo 3 caracteres'),
  password: z.string().min(8, 'Senha deve ter no minimo 8 caracteres'),
});

export const partnerUpdateSchema = z.object({
  tradeName: z.string().min(2).optional(),
  phone: z.string().min(10).max(11).optional(),
  discountType: z.enum(['PERCENTAGE', 'FIXED']).optional(),
  discountValue: z.number().positive().optional(),
  discountDescription: z.string().min(5).optional(),
  website: z.string().url().optional().or(z.literal('')),
  instagram: z.string().optional(),
  openingHours: z.string().optional(),
});

export type PartnerRegisterInput = z.infer<typeof partnerRegisterSchema>;
export type PartnerUpdateInput = z.infer<typeof partnerUpdateSchema>;
