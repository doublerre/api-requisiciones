import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import User from '../models/User';

interface IPayload {
    sub: string,
    iat: number,
    exp: number
}

/**
 * * Middleware el cual recibe el token por medio de un header llamado authorization, validamos expiracion, si existe dicho token, validamos el status del
 * * usuario y checamos si el formato del token es el correcto.
 * ? Se usara como middleware en la mayoria de las rutas del sitema.
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const TokenValidation = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if(!token) return res.status(401).json({message: 'Error, la petición no contiene una cabecera de autenticación.'});

    try {
        const payload = jwt.verify(token, config.jwtSecret) as IPayload;
        const user = await User.findById(payload.sub, {password: 0});
        
        if (!user) {
            return res.status(404).json({message: 'Error, no existe este usuario en la base de datos'});
        }else if(user.activo == false){
            return res.status(403).json({message: 'Error, tu cuenta ha sido desactivada.'});
        }
        req.userId = payload.sub;
        req.user = user;
        
    } catch (error) {
        return res.status(401).json({ message: "Error, el token es invalido.", err: error });
    }
    
    next();
}

export const checkValidationUser = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
        if(user.username != req.body.username){
            const validateUsername = await User.findOne({username: req.body.username});
            if(validateUsername) return res.status(400).json({message: 'Ya existe este usuario.'});
        }else if(user.email != req.body.email){
            const validateEmail = await User.findOne({email: req.body.email});
            if(validateEmail) return res.status(400).json({message: 'Ya existe un usuario con este email.'});
        }
    next();
}