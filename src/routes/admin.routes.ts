import { Router } from "express";
const router = Router();

import { save } from "../controllers/user.controller";
import { checkDuplicateUsername, verifyRoles } from "../middlewares/Role";
import { TokenValidation } from "../middlewares/verifyToken";
import { createUser } from "../requests/userRequest";

router.post('/admin/create-user', [TokenValidation, checkDuplicateUsername, verifyRoles("admin"), createUser], save);

export default router;