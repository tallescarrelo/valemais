import type { Request, Response } from 'express';
import { getProfileUseCase } from '../../../application/use-cases/client/get-profile.use-case';
import { updateProfileUseCase } from '../../../application/use-cases/client/update-profile.use-case';
import { changePasswordUseCase } from '../../../application/use-cases/client/change-password.use-case';
import { getCardUseCase } from '../../../application/use-cases/client/get-card.use-case';
import { getSubscriptionUseCase } from '../../../application/use-cases/client/get-subscription.use-case';
import { cancelSubscriptionUseCase } from '../../../application/use-cases/client/cancel-subscription.use-case';
import { getPaymentsUseCase } from '../../../application/use-cases/client/get-payments.use-case';
import { getValidationsUseCase } from '../../../application/use-cases/client/get-validations.use-case';

export class ClientController {
  async getProfile(req: Request, res: Response) {
    const result = await getProfileUseCase(req.userId!);
    res.json({ data: result });
  }

  async updateProfile(req: Request, res: Response) {
    const result = await updateProfileUseCase(req.userId!, req.body);
    res.json({ data: result });
  }

  async changePassword(req: Request, res: Response) {
    await changePasswordUseCase(req.userId!, req.body.currentPassword, req.body.newPassword);
    res.json({ data: { message: 'Senha alterada com sucesso' } });
  }

  async getCard(req: Request, res: Response) {
    const result = await getCardUseCase(req.userId!);
    res.json({ data: result });
  }

  async getSubscription(req: Request, res: Response) {
    const result = await getSubscriptionUseCase(req.userId!);
    res.json({ data: result });
  }

  async cancelSubscription(req: Request, res: Response) {
    const result = await cancelSubscriptionUseCase(req.userId!);
    res.json({ data: result });
  }

  async getPayments(req: Request, res: Response) {
    const result = await getPaymentsUseCase(req.userId!, req.query as any);
    res.json(result);
  }

  async getValidations(req: Request, res: Response) {
    const result = await getValidationsUseCase(req.userId!, req.query as any);
    res.json(result);
  }
}
