

import {Request, Response} from 'express';
import User, {IUser} from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import moment from 'moment';


/**
 * * Metodo en el cual creamos el JsonWebToken para la autenticacion de los usuarios.
 * ? Este método solo es accesible desde el componente login().
 * @param user Este parametro recibe un modelo de la clase user.
 * @returns 
 */
function createToken(user: IUser){
    return jwt.sign({
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix(),},
        config.jwtSecret
    );
}


/**
 * * Metodo en el cual guardamos un nuevo usuario en nuestra base de datos.
 * TODO Esperar si debemos de crear mas componentes de guardar usuarios por cada tipo de rol que tenga la aplicacion.
 * ? Este método solo es accesible con un token.
 * @param req 
 * @param res 
 * @returns 
 */
export const save = async (req: Request, res: Response): Promise<Response> => {
    const newUser = new User(req.body);

    await newUser.save()

    return res.status(201).json({message: 'Usuario creado exitosamente.', data: newUser});
}

/**
 * * Método por el cual los usuarios inician sesion en el sistema.
 * ? Este método no necesita un token de autenticacion.
 * @param req 
 * @param res 
 * @returns 
 */
export const login = async (req: Request, res: Response): Promise<Response> => {
    const user = await User.findOne({username: req.body.username}).populate('direccion');
    if(!user){
        return res.status(404).json({message: 'Error, el usuario no existe.'})
    }

    const isMatch = await user.comparePassword(req.body.password);
    if(isMatch){
        return res.status(200).json({message: 'Login Correcto', user: user, token: createToken(user)});
    }

    return res.status(400).json({message: 'El usuario o la contraseña son incorrectos'});
}

/**
 * updatedProfile Method
 * * Método el cual permite actualizar algunos datos de información de los usuarios del sistema.
 * TODO Esperar si el cliente ocupa que se modifiquen más datos.
 * ? Este método solo es accesible con un token.
 * @param req 
 * @param res 
 * @returns 
 */

export const updateProfile = async (req: Request, res: Response): Promise<Response> => {
    const {nombre, username, email, acerca_de} = req.body;

    const userUpdated = await User.findByIdAndUpdate(req.userId, {nombre, username, email, acerca_de}, {new: true}).select('-password');
    return res.status(200).json({message: 'Perfil actualizado correctamente.', data: userUpdated});
}

/**
 * * Método que retorna los datos del usuario logueado.
 * ? Este método solo es accesible con un token.
 * @param req 
 * @param res 
 * @returns 
 */
export const profile = async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).json({message: 'Consulta exitosa', data: req.user});
}

/**
 * * Método que solo actualiza la contraseña si es que su antigua contraseña coincide.
 * ? Este método solo es accesible con un token.
 * @param req 
 * @param res 
 * @returns 
 */
export const changePassword = async (req: Request, res: Response): Promise<Response> => {
    const {password} = req.body;
    let user = await User.findById(req.userId);
    
    if(user){
        const isMatch = await user.comparePassword(req.body.old_password);
        if(isMatch){
            user.password = password;
            const userUpdated = await user.save();
            return res.status(200).json({message: 'Contraseña actualizada correctamente.', data: userUpdated});
        }else{
            return res.status(400).json({message: 'Tu antigua contraseña es incorrecta.'});
        }
    }
    return res.status(404).json({message: 'Error, no existe el usuario'});
}