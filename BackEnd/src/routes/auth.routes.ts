import { Router } from 'express';
import { login } from '../controllers/auth/login.controller';
import { register } from '../controllers/auth/register.controller';
import { asyncHandler } from '../utils/asyncHandler';
import { upload } from '../middlewares/multer.middleware';
import { logout } from '../controllers/auth/logout.controller';
import { auth } from '../middlewares/auth.middleware';

const router = Router();

router.post('/register',upload.single('profilePicture'),asyncHandler(register));
router.post('/login', asyncHandler(login));
router.patch('/logout',auth,asyncHandler(logout))

export default router;
