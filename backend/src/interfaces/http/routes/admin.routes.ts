import { Router } from 'express';
import { AdminController } from '../controllers/admin.controller';
import { requireAuth, requireRole } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { createPlanSchema, updatePlanSchema, updateClientStatusSchema, updatePartnerStatusSchema } from '../validators/admin.validator';

const adminRouter = Router();
const controller = new AdminController();

adminRouter.use(requireAuth, requireRole('ADMIN'));

// Dashboard
adminRouter.get('/dashboard', controller.getDashboard);

// Plans
adminRouter.get('/plans', controller.listPlans);
adminRouter.post('/plans', validate(createPlanSchema), controller.createPlan);
adminRouter.get('/plans/:id', controller.getPlan);
adminRouter.put('/plans/:id', validate(updatePlanSchema), controller.updatePlan);
adminRouter.patch('/plans/:id/toggle', controller.togglePlan);

// Clients
adminRouter.get('/clients', controller.listClients);
adminRouter.get('/clients/:id', controller.getClient);
adminRouter.patch('/clients/:id/status', validate(updateClientStatusSchema), controller.updateClientStatus);

// Partners
adminRouter.get('/partners', controller.listPartners);
adminRouter.get('/partners/:id', controller.getPartner);
adminRouter.patch('/partners/:id/approve', controller.approvePartner);
adminRouter.patch('/partners/:id/reject', controller.rejectPartner);
adminRouter.patch('/partners/:id/status', validate(updatePartnerStatusSchema), controller.updatePartnerStatus);

// Validations
adminRouter.get('/validations', controller.listValidations);

// Payments
adminRouter.get('/payments', controller.listPayments);

export { adminRouter };
