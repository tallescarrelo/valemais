import { Router } from 'express';
import { PartnerController } from '../controllers/partner.controller';
import { requireAuth, requireRole } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { partnerRegisterSchema, partnerUpdateSchema } from '../validators/partner.validator';

const partnerRouter = Router();
const controller = new PartnerController();

// Publico
partnerRouter.post('/register', validate(partnerRegisterSchema), controller.register);

// Autenticado (PARTNER)
partnerRouter.get('/profile', requireAuth, requireRole('PARTNER'), controller.getProfile);
partnerRouter.put('/profile', requireAuth, requireRole('PARTNER'), validate(partnerUpdateSchema), controller.updateProfile);
partnerRouter.get('/qrcode', requireAuth, requireRole('PARTNER'), controller.getQrCode);
partnerRouter.get('/validations', requireAuth, requireRole('PARTNER'), controller.getValidations);
partnerRouter.get('/stats', requireAuth, requireRole('PARTNER'), controller.getStats);

export { partnerRouter };
