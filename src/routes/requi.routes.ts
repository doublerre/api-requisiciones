import { Router } from "express";

import {deleteRequi, save, updateRequi, uploadFile} from '../controllers/requi.controller';
import { TokenValidation } from "../middlewares/verifyToken";

import multer from '../libs/multer';

const router = Router();

router.post('/requi', [TokenValidation], save);
router.put('/requi/file/:id', [TokenValidation], multer.single('pdfFile'), uploadFile);
router.delete('/requi/:id', [TokenValidation], deleteRequi);
router.put('requi/:id', [TokenValidation], updateRequi);

export default router;