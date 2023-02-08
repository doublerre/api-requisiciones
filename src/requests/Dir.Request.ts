import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { validateRequest } from "../middlewares/validateRequest";

export const dirValidate = async(req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        name: Joi.string().required().min(1).messages({
            'string.base': `El campo name debe ser una cadena de texto.'`,
            'string.empty': `El campo name no debe estar vacio.`,
            'any.required': `El campo name es requerido.`,
            'string.min': `La name debe ser de al menos {#limit} caracteres.`,
        }),
    });

    validateRequest(req, res, next, schema);
}