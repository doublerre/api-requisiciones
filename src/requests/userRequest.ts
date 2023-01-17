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

/**
 * * Validaciones para los campos a la hora de actualizar un perfil.
 * @param req 
 * @param res 
 * @param next 
 */
export const updateProfileRequest = async (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        nombre: Joi.string().optional().min(1).messages({
            'string.base': `El campo nombre debe ser una cadena de texto.'`,
            'string.empty': `El campo nombre no debe estar vacio.`,
            'string.min': `El nombre debe de ser de al menos {#limit} caracter.`,
        }),
        username: Joi.string().optional().min(1).messages({
            'string.base': `El campo username debe ser una cadena de texto.'`,
            'string.empty': `El campo username no debe estar vacio.`,
            'string.min': `El username debe de ser de al menos {#limit} caracter.`,
        }),
        email: Joi.string().email().optional().messages({
            'string.base': `El campo email debe ser una cadena de texto.'`,
            'string.empty': `El campo email no debe estar vacio.`,
            'string.email': `Debes introducir un email valido.`,
        }),
        acerca_de: Joi.string().optional().messages({
            'string.base': `El campo acerca de debe ser una cadena de texto.'`,
            'string.empty': `El campo acerca de no debe estar vacio.`,
        }),
    });
    validateRequest(req, res, next, schema);
}


/**
 * * Validacion para actualizar la contraseña del usuario logueado.
 * @param req 
 * @param res 
 * @param next 
 */
export const changePasswordRequest = async (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        old_password: Joi.string().min(8).required().messages({
            'string.base': `El campo antigua contraseña debe ser una cadena de texto.'`,
            'string.empty': `El campo antigua contraseña no debe estar vacio.`,
            'any.required': `El campo antigua contraseña es requerido.`,
            'string.min': `La antigua contraseña debe ser de al menos {#limit} caracteres.`,
        }),
        password: Joi.string().min(8).required().messages({
            'string.base': `El campo contraseña debe ser una cadena de texto.'`,
            'string.empty': `El campo contraseña no debe estar vacio.`,
            'any.required': `El campo contraseña es requerido.`,
            'string.min': `La contraseña debe ser de al menos {#limit} caracteres.`,
        }),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
            'string.base': `El campo confirmar contraseña debe ser una cadena de texto.'`,
            'string.empty': `El campo confirmar contraseña no debe estar vacio.`,
            'any.required': `El campo confirmar contraseña es requerido.`,
            'any.only': `Las contraseñas no coindicen.`,
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