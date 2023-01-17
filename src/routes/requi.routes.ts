import { Router } from "express";

import {save} from '../controllers/requi.controller';

const router = Router();

router.post('/requi', save);

export default router;