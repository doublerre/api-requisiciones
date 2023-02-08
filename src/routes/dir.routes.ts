import { Router } from "express";
import { verifyRoles } from "../middlewares/Role";
import { TokenValidation } from "../middlewares/verifyToken";
import { dirValidate } from "../requests/Dir.Request";
import { deleteDir, getDirs, save, updateDir } from "../controllers/dir.controller";

const router = Router();

router.post('/dir', [TokenValidation, verifyRoles("admin"), dirValidate], save);
router.get('/dirs', [TokenValidation, verifyRoles("admin")], getDirs);
router.put('/dir/:id', [TokenValidation, verifyRoles("admin"), dirValidate], updateDir);
router.delete('/dir/:id', [TokenValidation, verifyRoles("admin")], deleteDir);

export default router;