import express from 'express';
import { body } from 'express-validator';
import authController from '../controllers/authController';

const router = express.Router({ mergeParams: true });

router.post(
  '/register',
  body('name', 'Please provide a your name').isString(),
  body('email', 'Please provide a valid email').isEmail(),
  body('password', 'Please provide a password with 6 or more characters').isLength({ min: 5 }),
  authController.register
);
router.post(
  '/login',
  body('email', 'Please provide a valid email').isEmail(),
  body('password', 'Please provide a password with 6 or more characters').isLength({ min: 5 }),
  authController.login
);
router.post('/refresh', body('refreshToken', 'Please provide the refresh token').isString(), authController.refresh);

export default router;
