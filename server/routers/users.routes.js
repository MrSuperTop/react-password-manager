import { Router } from 'express';
import { getUserEmails } from '../controllers/users.controllers.js';
import auth from '../middleware/auth.middleware.js';

const router = Router();

router.get('/emails', auth, getUserEmails);

export default router;
