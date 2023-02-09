import { Router } from "express";
const router = Router();

import { save, updateUser } from "../controllers/user.controller";
import { checkDuplicateUsername, checkUpdateUsername, verifyRoles } from "../middlewares/Role";
import { TokenValidation } from "../middlewares/verifyToken";
import { createUser, updateUserRequest } from "../requests/userRequest";

router.post('/admin/create-user', [TokenValidation, checkDuplicateUsername, verifyRoles("admin"), createUser], save);
router.put('/admin/update-user/:id', [TokenValidation, verifyRoles("admin"), checkUpdateUsername, updateUserRequest], updateUser);

export default router;