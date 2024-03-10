import { Router } from 'express';
import userController from '../controllers/UserController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// Rotas que não devem ser usadas, mas existem.

// router.get('/', userController.index);
// router.get('/:id', userController.show);

// Rotas do usuário
router.post('/', loginRequired, userController.store);
router.put('/', loginRequired, userController.update);
router.delete('/', loginRequired, userController.delete);

export default router;
