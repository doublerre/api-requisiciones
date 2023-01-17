import {Router} from 'express';
const router = Router();

import {save, login} from '../controllers/user.controller';
import { loginUser } from '../requests/userRequest';

router.post('/register', save);
router.post('/login', loginUser, login);

export default router;