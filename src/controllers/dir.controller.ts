import { Request, Response } from "express";
import Dir from "../models/Dir";

export const save = async (req: Request, res: Response): Promise<Response> => {
    const newDir = new Dir(req.body);
    await newDir.save();

    return res.status(201).json({message: "Nueva dirección creada con exito"});
}

export const getDirs = async (req: Request, res: Response): Promise<Response> => {
    const dirs = await Dir.find({});
    if(!dirs) return res.status(404).json({message: "No existen direcciones en la base de datos"});
    return res.json({message: "Consulta exitosa.", data: dirs});
}

export const updateDir = async (req: Request, res: Response): Promise<Response> => {
    const updateDir = await Dir.findByIdAndUpdate(req.params.id, req.body, {new: true});
    return res.json({message: "Dirección actualizada con exito"});
}

export const deleteDir = async (req: Request, res: Response): Promise<Response> => {
    await Dir.findByIdAndDelete(req.params.id);
    return res.json({message: "Dirección eliminada con exito"});
}