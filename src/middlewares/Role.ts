import {Request, Response, NextFunction} from "express";
import User, {IUser} from "../models/User";

export const verifyRoles = (role: string) => {
    return (req: Request, res: Response, next: NextFunction) =>{
        const user_role = req.user.rol;

        if(role === user_role || user_role === "admin"){
            next()
            return;
        }
        res.status(401).json({message: "Error, no tienes los permisos suficientes para acceder a este contenido"});
    }
}

export const checkDuplicateUsername = async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({username: req.body.username})
    
    if (user) return res.status(400).json({message: 'Ya existe este usuario.'});

    next();
}