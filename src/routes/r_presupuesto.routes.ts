import {Router} from "express";

import {updateRequi} from '../controllers/requi.controller';
import {TokenValidation} from '../middlewares/verifyToken';
import { verifyRoles } from "../middlewares/Role";

const router = Router();

router.put("/presupuesto/requi/:id", [TokenValidation, verifyRoles("r_presupuesto")], updateRequi);

export default router;