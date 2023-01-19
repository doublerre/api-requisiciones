import { Router } from "express";

import {deleteRequi, save, updateRequi, uploadFile} from '../controllers/requi.controller';

import multer from '../libs/multer';

const router = Router();

router.post('/requi', save);
router.put('/requi/file/:id', multer.single('pdfFile'), uploadFile);
router.delete('/requi/:id', deleteRequi);
router.put('requi/:id', updateRequi);

export default router;