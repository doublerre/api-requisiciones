import { Router } from "express";
const router = Router();

import { save } from "../controllers/user.controller";
import { checkDuplicateUsername, verifyRoles } from "../middlewares/Role";
import { TokenValidation } from "../middlewares/verifyToken";

router.post('/admin/create-user', [TokenValidation, checkDuplicateUsername, verifyRoles("admin")], save);

export default router;