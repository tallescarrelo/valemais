import { prisma } from '../../../infrastructure/database/prisma';
import { AppError } from '../../../shared/errors/AppError';
import type { CreatePlanInput, UpdatePlanInput } from '../../../interfaces/http/validators/admin.validator';

export async function listPlans() {
  const plans = await prisma.plan.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return plans;
}

export async function getPlan(id: string) {
  const plan = await prisma.plan.findUnique({
    where: { id },
  });

  if (!plan) {
    throw AppError.notFound('Plano nao encontrado');
  }

  return plan;
}

export async function createPlan(input: CreatePlanInput) {
  const plan = await prisma.plan.create({
    data: {
      name: input.name,
      description: input.description,
      price: input.price,
      intervalMonths: input.intervalMonths,
      benefits: input.benefits,
    },
  });

  return plan;
}

export async function updatePlan(id: string, input: UpdatePlanInput) {
  const existing = await prisma.plan.findUnique({
    where: { id },
  });

  if (!existing) {
    throw AppError.notFound('Plano nao encontrado');
  }

  const plan = await prisma.plan.update({
    where: { id },
    data: {
      ...(input.name !== undefined && { name: input.name }),
      ...(input.description !== undefined && { description: input.description }),
      ...(input.price !== undefined && { price: input.price }),
      ...(input.intervalMonths !== undefined && { intervalMonths: input.intervalMonths }),
      ...(input.benefits !== undefined && { benefits: input.benefits }),
    },
  });

  return plan;
}

export async function togglePlan(id: string) {
  const existing = await prisma.plan.findUnique({
    where: { id },
  });

  if (!existing) {
    throw AppError.notFound('Plano nao encontrado');
  }

  const plan = await prisma.plan.update({
    where: { id },
    data: {
      isActive: !existing.isActive,
    },
  });

  return plan;
}
