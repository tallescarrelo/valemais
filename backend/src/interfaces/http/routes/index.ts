import { Router } from 'express';
import { authRouter } from './auth.routes';
import { clientRouter } from './client.routes';
import { partnerRouter } from './partner.routes';
import { adminRouter } from './admin.routes';
import { validationRouter } from './validation.routes';
import { publicRouter } from './public.routes';

const router = Router();

router.use('/auth', authRouter);
router.use('/client', clientRouter);
router.use('/partner', partnerRouter);
router.use('/admin', adminRouter);
router.use('/validations', validationRouter);
router.use('/public', publicRouter);

export { router };
