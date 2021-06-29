import { Router } from 'express';
import { logIn, register } from '../controllers/auth.controllers.js';
import { check } from 'express-validator';

const router = Router();

const credentialsCheck = [
  check('email', 'Invalid email').isEmail(),
  check('password', 'Password has to be more that 6 characters long')
    .isLength({ min: 6 })
];

router.post('/login', credentialsCheck, logIn);
router.post('/register', credentialsCheck, register);

export default router;
