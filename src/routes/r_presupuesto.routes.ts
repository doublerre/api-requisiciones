import {Router} from "express";

import {updateRequi, valRequi} from '../controllers/requi.controller';
import {TokenValidation} from '../middlewares/verifyToken';
import { verifyRoles } from "../middlewares/Role";
import { presupuestoValidate } from "../requests/requi.Request";

const router = Router();

router.put("/presupuesto/requi/:id", [TokenValidation, verifyRoles("r_presupuesto")], updateRequi);
router.put("/presupuesto/requi/r_presupuesto/:id", [TokenValidation, verifyRoles("r_presupuesto"), presupuestoValidate], valRequi);

export default router;