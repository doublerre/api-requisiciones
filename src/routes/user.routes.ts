import { Router } from "express";

const router = Router();

import {profile, changePassword} from '../controllers/user.controller';
import {TokenValidation} from '../middlewares/verifyToken';
import { changePasswordRequest } from "../requests/userRequest";

/**
 * *Listado de rutas para el modelo de User.
 */
router.get('/profile', TokenValidation, profile);
//router.put('/profile/update', [TokenValidation, updateProfileRequest, checkValidationUser], updateProfile);
router.put('/profile/update-password', TokenValidation, changePasswordRequest, changePassword);

export default router;