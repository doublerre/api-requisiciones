import Joi from "joi";
import { Request, Response, NextFunction } from "express";

export const presupuestoValidate = async(req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        presupuesto_val: Joi.boolean().required().messages({
            'any.required': `El campo presupuesto_val es requerido`,
        }),
    });
}