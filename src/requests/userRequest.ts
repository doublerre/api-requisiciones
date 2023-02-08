import Joi from "joi";
import {Request, Response, NextFunction} from 'express';
import { validateRequest } from "../middlewares/validateRequest";

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

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        nombre: Joi.string().min(1).required().messages({
            'string.base': `El campo nombre debe ser una cadena de texto.'`,
            'string.empty': `El campo nombre no debe estar vacio.`,
            'any.required': `El campo nombre es requerido.`,
            'string.min': `La nombre debe ser de al menos {#limit} caracteres.`,
        }),
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
        confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
            'string.base': `El campo confirmar contraseña debe ser una cadena de texto.'`,
            'string.empty': `El campo confirmar contraseña no debe estar vacio.`,
            'any.required': `El campo confirmar contraseña es requerido.`,
            'any.only': `Las contraseñas no coindicen.`,
        }),
        activo: Joi.boolean().required().messages({
            'boolean.base': `El campo activo debe ser booleano`,
            'any.required': `El campo activo es requerido`,
        }),
        rol: Joi.string().min(2).required().messages({
            'string.base': `El campo rol debe ser una cadena de texto.'`,
            'string.empty': `El campo rol no debe estar vacio.`,
            'any.required': `El campo rol es requerido.`,
            'string.min': `La rol debe ser de al menos {#limit} caracteres.`,
        }),
        direccion: Joi.string().min(10).required().messages({
            'string.base': `El campo direccion debe ser una cadena de texto.'`,
            'string.empty': `El campo direccion no debe estar vacio.`,
            'any.required': `El campo direccion es requerido.`,
            'string.min': `La direccion debe ser de al menos {#limit} caracteres.`,
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