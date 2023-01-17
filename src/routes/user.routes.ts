import { Router } from "express";

const router = Router();

import {profile, updateProfile, changePassword} from '../controllers/user.controller';
import { checkValidationUser } from "../middlewares/Roles";
import {TokenValidation} from '../middlewares/verifyToken';
import { updateProfileRequest, changePasswordRequest } from "../request/userRequest";

/**
 * *Listado de rutas para el modelo de User.
 */
router.get('/profile', TokenValidation, profile);
router.put('/profile/update', [TokenValidation, updateProfileRequest, checkValidationUser], updateProfile);
router.put('/profile/update-password', TokenValidation, changePasswordRequest, changePassword);

export default router;