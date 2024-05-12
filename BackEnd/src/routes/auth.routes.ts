import { Router } from 'express';
import { login } from '../controllers/login.controller';
import { register } from '../controllers/register.controller';

const router = Router();

router.get('/login', login);
router.get('/register', register);

export default router;
