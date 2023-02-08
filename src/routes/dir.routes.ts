import { Router } from "express";
import { verifyRoles } from "../middlewares/Role";
import { TokenValidation } from "../middlewares/verifyToken";

const router = Router();

router.post('/dir', [TokenValidation, verifyRoles("admin"), ])

export default router;