import { Router } from 'express';
import loginRequired from '../middlewares/loginRequired';

import fotoController from '../controllers/FotoController';

const router = new Router();

// Rotas da Foto
router.post('/', loginRequired, fotoController.store);

export default router;
