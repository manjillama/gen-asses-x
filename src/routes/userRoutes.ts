import { Router } from 'express';
import userController from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.use(authMiddleware.authenticate);

router.get('/', userController.getUsers);
router.get('/me', userController.getCurrentUser);
router.put('/me', userController.updateCurrentUser);
router.delete('/me', userController.deleteCurrentUser);

export default router;
