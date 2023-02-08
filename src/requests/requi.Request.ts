import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { validateRequest } from "../middlewares/validateRequest";

export const presupuestoValidate = async(req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        presupuesto_val: Joi.boolean().required().messages({
            'any.required': `El campo presupuesto_val es requerido`,
        }),
    });
    validateRequest(req, res, next, schema);
}

export const proveedorValidate = async(req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        proveedor_val: Joi.boolean().required().messages({
            'any.required': `El campo proveedor_val es requerido`,
        }),
    });
    validateRequest(req, res, next, schema);
}