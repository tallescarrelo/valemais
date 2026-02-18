import type { Request, Response } from 'express';
import { listPlans, getPlan, createPlan, updatePlan, togglePlan } from '../../../application/use-cases/admin/plan-crud.use-case';
import { listClients } from '../../../application/use-cases/admin/list-clients.use-case';
import { getClientDetail, updateClientStatus } from '../../../application/use-cases/admin/manage-client.use-case';
import { listPartners } from '../../../application/use-cases/admin/list-partners.use-case';
import { getPartnerDetail, approvePartner, rejectPartner, updatePartnerStatus } from '../../../application/use-cases/admin/manage-partner.use-case';
import { listValidations } from '../../../application/use-cases/admin/list-validations.use-case';
import { listPayments } from '../../../application/use-cases/admin/list-payments.use-case';
import { getDashboard } from '../../../application/use-cases/admin/dashboard.use-case';

function paramId(req: Request): string {
  return String(req.params.id);
}

export class AdminController {
  // Plans
  async listPlans(_req: Request, res: Response) {
    const result = await listPlans();
    res.json({ data: result });
  }

  async getPlan(req: Request, res: Response) {
    const result = await getPlan(paramId(req));
    res.json({ data: result });
  }

  async createPlan(req: Request, res: Response) {
    const result = await createPlan(req.body);
    res.status(201).json({ data: result });
  }

  async updatePlan(req: Request, res: Response) {
    const result = await updatePlan(paramId(req), req.body);
    res.json({ data: result });
  }

  async togglePlan(req: Request, res: Response) {
    const result = await togglePlan(paramId(req));
    res.json({ data: result });
  }

  // Clients
  async listClients(req: Request, res: Response) {
    const result = await listClients(req.query as any);
    res.json(result);
  }

  async getClient(req: Request, res: Response) {
    const result = await getClientDetail(paramId(req));
    res.json({ data: result });
  }

  async updateClientStatus(req: Request, res: Response) {
    const result = await updateClientStatus(paramId(req), req.body.status);
    res.json({ data: result });
  }

  // Partners
  async listPartners(req: Request, res: Response) {
    const result = await listPartners(req.query as any);
    res.json(result);
  }

  async getPartner(req: Request, res: Response) {
    const result = await getPartnerDetail(paramId(req));
    res.json({ data: result });
  }

  async approvePartner(req: Request, res: Response) {
    const result = await approvePartner(paramId(req));
    res.json({ data: result });
  }

  async rejectPartner(req: Request, res: Response) {
    const result = await rejectPartner(paramId(req));
    res.json({ data: result });
  }

  async updatePartnerStatus(req: Request, res: Response) {
    const result = await updatePartnerStatus(paramId(req), req.body.status);
    res.json({ data: result });
  }

  // Validations
  async listValidations(req: Request, res: Response) {
    const result = await listValidations(req.query as any);
    res.json(result);
  }

  // Payments
  async listPayments(req: Request, res: Response) {
    const result = await listPayments(req.query as any);
    res.json(result);
  }

  // Dashboard
  async getDashboard(_req: Request, res: Response) {
    const result = await getDashboard();
    res.json({ data: result });
  }
}
