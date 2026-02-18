import type { Request, Response } from 'express';
import { getPartnerInfoUseCase } from '../../../application/use-cases/validation/get-partner-info.use-case';
import { validateDiscountUseCase } from '../../../application/use-cases/validation/validate-discount.use-case';
import { getValidationDetailUseCase } from '../../../application/use-cases/validation/get-validation-detail.use-case';

export class ValidationController {
  async getPartnerInfo(req: Request, res: Response) {
    const result = await getPartnerInfoUseCase(String(req.params.partnerCode));
    res.json({ data: result });
  }

  async validate(req: Request, res: Response) {
    const result = await validateDiscountUseCase(
      req.userId!,
      req.body.partnerCode,
      req.ip,
      req.headers['user-agent'],
    );
    res.json({ data: result });
  }

  async getDetail(req: Request, res: Response) {
    const result = await getValidationDetailUseCase(String(req.params.id), req.userId!);
    res.json({ data: result });
  }
}
