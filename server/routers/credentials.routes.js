import { Router } from 'express';
import { check } from 'express-validator';

import auth from '../middleware/auth.middleware.js';
import { getCredentials, addItem, deleteOne, getOne, editItem } from '../controllers/credentials.controllers.js';

const router = Router();
const validValues = ['e&p'];

const credentialsCheck = [
  check('email', 'Invalid email').isEmail(),
  check('email', 'Please provide an email').not().isEmpty(),
  check('password', 'Please provide a password')
    .not().isEmpty(),
  check('type', 'Invalid type').isIn(validValues)
];

router.get('/', auth, getCredentials);
router.post('/create', auth, credentialsCheck, addItem);
router.delete('/:id', auth, deleteOne);
router.get('/:id', auth, getOne);
router.post('/edit/:id', auth, credentialsCheck, editItem);

export default router;
