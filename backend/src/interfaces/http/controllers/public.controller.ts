import type { Request, Response } from 'express';
import { prisma } from '../../../infrastructure/database/prisma';

export class PublicController {
  async getPlans(_req: Request, res: Response) {
    const plans = await prisma.plan.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        intervalMonths: true,
        benefits: true,
      },
      orderBy: { price: 'asc' },
    });
    res.json({ data: plans });
  }

  async getPartners(req: Request, res: Response) {
    const { category } = req.query;
    const where: Record<string, unknown> = { status: 'ACTIVE' };
    if (category && typeof category === 'string') {
      where.category = category;
    }
    const partners = await prisma.partner.findMany({
      where,
      select: {
        id: true,
        tradeName: true,
        category: true,
        discountType: true,
        discountValue: true,
        discountDescription: true,
        logoUrl: true,
        city: true,
        state: true,
      },
      orderBy: { tradeName: 'asc' },
    });
    res.json({ data: partners });
  }

  async getStats(_req: Request, res: Response) {
    const [clientsCount, partnersCount, validationsCount] = await Promise.all([
      prisma.user.count({ where: { role: 'CLIENT', status: 'ACTIVE' } }),
      prisma.partner.count({ where: { status: 'ACTIVE' } }),
      prisma.validation.count({ where: { status: 'VALID' } }),
    ]);

    res.json({
      data: {
        totalClients: clientsCount,
        totalPartners: partnersCount,
        totalValidations: validationsCount,
      },
    });
  }
}
