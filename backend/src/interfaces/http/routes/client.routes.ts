import { Router } from 'express';
import { ClientController } from '../controllers/client.controller';
import { requireAuth, requireRole } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { updateProfileSchema, changePasswordSchema } from '../validators/client.validator';

const clientRouter = Router();
const controller = new ClientController();

clientRouter.use(requireAuth, requireRole('CLIENT'));

clientRouter.get('/profile', controller.getProfile);
clientRouter.put('/profile', validate(updateProfileSchema), controller.updateProfile);
clientRouter.put('/change-password', validate(changePasswordSchema), controller.changePassword);
clientRouter.get('/card', controller.getCard);
clientRouter.get('/subscription', controller.getSubscription);
clientRouter.post('/subscription/cancel', controller.cancelSubscription);
clientRouter.get('/payments', controller.getPayments);
clientRouter.get('/validations', controller.getValidations);

export { clientRouter };
