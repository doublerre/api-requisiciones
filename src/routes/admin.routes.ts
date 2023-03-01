import { Router } from "express";
import { solicitudesRequis } from "../controllers/requi.controller";
const router = Router();

import { save, updateUser } from "../controllers/user.controller";
import { checkDuplicateUsername, checkUpdateUsername, verifyRoles } from "../middlewares/Role";
import { TokenValidation } from "../middlewares/verifyToken";
import { createUser, updateUserRequest } from "../requests/userRequest";

router.post('/admin/create-user', [TokenValidation, checkDuplicateUsername, verifyRoles("admin"), createUser], save);
router.put('/admin/update-user/:id', [TokenValidation, verifyRoles("admin"), checkUpdateUsername, updateUserRequest], updateUser);

router.get('/admin/requis', [TokenValidation, verifyRoles('admin')], solicitudesRequis);

export default router;