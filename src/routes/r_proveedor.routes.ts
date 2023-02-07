import {Router} from "express";

import {updateRequi, valRequi} from '../controllers/requi.controller';
import {TokenValidation} from '../middlewares/verifyToken';
import { verifyRoles } from "../middlewares/Role";
import { proveedorValidate } from "../requests/requi.Request";

const router = Router();

router.put("/proveedor/requi/:id", [TokenValidation, verifyRoles("r_proveedor")], updateRequi);
router.put("/proveedor/requi/r_proveedor/:id", [TokenValidation, verifyRoles("r_proveedor"), proveedorValidate], valRequi);

export default router;