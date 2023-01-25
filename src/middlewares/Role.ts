import {Request, Response, NextFunction} from "express";
import User, {IUser} from "../models/User";

export const verifyRoles = (role: string) => {
    return (req: Request, res: Response, next: NextFunction) =>{
        const user_role = req.user.role;

        if(role === user_role){
            next()
            return;
        }
        res.status(401).json({message: "Error, no tienes los permisos suficientes para acceder a este contenido"});
    }
}