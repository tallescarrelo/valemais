import type { Request, Response } from 'express';
import { registerPartnerUseCase } from '../../../application/use-cases/partner/register-partner.use-case';
import { getPartnerProfileUseCase } from '../../../application/use-cases/partner/get-partner-profile.use-case';
import { updatePartnerUseCase } from '../../../application/use-cases/partner/update-partner.use-case';
import { getPartnerQrCodeUseCase } from '../../../application/use-cases/partner/get-partner-qrcode.use-case';
import { getPartnerValidationsUseCase } from '../../../application/use-cases/partner/get-partner-validations.use-case';
import { getPartnerStatsUseCase } from '../../../application/use-cases/partner/get-partner-stats.use-case';

export class PartnerController {
  async register(req: Request, res: Response) {
    const result = await registerPartnerUseCase(req.body);
    res.status(201).json({ data: result });
  }

  async getProfile(req: Request, res: Response) {
    const result = await getPartnerProfileUseCase(req.userId!);
    res.json({ data: result });
  }

  async updateProfile(req: Request, res: Response) {
    const result = await updatePartnerUseCase(req.userId!, req.body);
    res.json({ data: result });
  }

  async getQrCode(req: Request, res: Response) {
    const result = await getPartnerQrCodeUseCase(req.userId!);
    res.json({ data: result });
  }

  async getValidations(req: Request, res: Response) {
    const result = await getPartnerValidationsUseCase(req.userId!, req.query as any);
    res.json(result);
  }

  async getStats(req: Request, res: Response) {
    const result = await getPartnerStatsUseCase(req.userId!);
    res.json({ data: result });
  }
}
