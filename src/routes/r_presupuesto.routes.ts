import {Router} from "express";

import {updateRequi, valRequi} from '../controllers/requi.controller';
import {TokenValidation} from '../middlewares/verifyToken';
import { verifyRoles } from "../middlewares/Role";

const router = Router();

router.put("/presupuesto/requi/:id", [TokenValidation, verifyRoles("r_presupuesto")], updateRequi);
router.put("/presupuesto/requi/r_presupuesto/:id", [TokenValidation], valRequi);

export default router;