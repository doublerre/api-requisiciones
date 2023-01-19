import { Router } from "express";

import {save} from '../controllers/requi.controller';

import multer from "../libs/multer";

const router = Router();

router.post('/requi', save);
router.put('/requi/:id', multer.single('pdfFile'))

export default router;