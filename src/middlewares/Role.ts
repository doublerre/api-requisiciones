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