import { Router } from 'express';
import { PublicController } from '../controllers/public.controller';

const publicRouter = Router();
const controller = new PublicController();

publicRouter.get('/plans', controller.getPlans);
publicRouter.get('/partners', controller.getPartners);
publicRouter.get('/stats', controller.getStats);

export { publicRouter };
