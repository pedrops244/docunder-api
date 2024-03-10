import { Router } from 'express';
import tokenController from '../controllers/TokenController';

const router = new Router();

// Rotas do token
router.post('/', tokenController.store);

export default router;
