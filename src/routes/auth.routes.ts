import {Router} from 'express';
const router = Router();

import {save, login} from '../controllers/user.controller';

router.post('/register', save);

export default router;