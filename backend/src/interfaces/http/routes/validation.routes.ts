import { Router } from 'express';
import { ValidationController } from '../controllers/validation.controller';
import { requireAuth, requireRole } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { validateDiscountSchema } from '../validators/validation.validator';

const validationRouter = Router();
const controller = new ValidationController();

validationRouter.get('/partner/:partnerCode', requireAuth, requireRole('CLIENT'), controller.getPartnerInfo);
validationRouter.post('/validate', requireAuth, requireRole('CLIENT'), validate(validateDiscountSchema), controller.validate);
validationRouter.get('/:id', requireAuth, requireRole('CLIENT'), controller.getDetail);

export { validationRouter };
