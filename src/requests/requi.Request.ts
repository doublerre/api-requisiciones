import Joi from "joi";
import { Request, Response, NextFunction } from "express";

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

const validateRequest = async (req: Request, res: Response, next: NextFunction, schema: any) => {
    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true,
    };
    const {error, value} = schema.validate(req.body, options);
    if (error) {
        res.status(422).json({
            message: 'Error de validación.',
            error: error.details,
        });
    } else {
        req.body = value;
        next();
    }
}