import { Router } from 'express';
import homeController from '../controllers/HomeController';

const router = new Router();

// Rotas da Home
router.get('/', homeController.index);

export default router;
