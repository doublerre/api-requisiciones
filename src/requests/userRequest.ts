import Joi from "joi";
import {Request, Response, NextFunction} from 'express';

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        username: Joi.string().required().messages({
            'string.base': `El campo username debe ser una cadena de texto.'`,
            'string.empty': `El campo username no debe estar vacio.`,
            'any.required': `El campo username es requerido.`,
            'string.username': `Debes introducir un username valido.`,
        }),
        password: Joi.string().min(8).required().messages({
            'string.base': `El campo contraseña debe ser una cadena de texto.'`,
            'string.empty': `El campo contraseña no debe estar vacio.`,
            'any.required': `El campo contraseña es requerido.`,
            'string.min': `La contraseña debe ser de al menos {#limit} caracteres.`,
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