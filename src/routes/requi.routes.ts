import { Router } from "express";

import {deleteRequi, getRequi, save, updateRequi, uploadFile} from '../controllers/requi.controller';
import {createPDFRequi} from '../controllers/pdfKit.controller'
import { TokenValidation } from "../middlewares/verifyToken";

import multer from '../libs/multer';
import { verifyRoles } from "../middlewares/Role";

const router = Router();

router.post('/requi', [TokenValidation, verifyRoles("solicitante")], save);
router.put('/requi/file/:id', [TokenValidation, verifyRoles("solicitante")], multer.single('pdfFile'), uploadFile);
router.delete('/requi/:id', [TokenValidation, verifyRoles("solicitante")], deleteRequi);
router.put('requi/:id', [TokenValidation, verifyRoles("solicitante")], updateRequi);
router.get('/requi/:id', [TokenValidation], getRequi);
router.get('/pdf/create-requi/:id', [TokenValidation], createPDFRequi);

export default router;