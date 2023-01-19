import { Router } from "express";

import {deleteRequi, save, uploadFile} from '../controllers/requi.controller';

import multer from '../libs/multer';

const router = Router();

router.post('/requi', save);
router.put('/requi/:id', multer.single('pdfFile'), uploadFile);
router.delete('/requi/:id', deleteRequi);

export default router;