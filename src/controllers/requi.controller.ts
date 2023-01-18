import { Request, Response } from "express";

import Requi from "../models/Requi";

export const save = async(req: Request, res: Response): Promise<Response> => {
    const newRequi = new Requi(req.body);

    try {
        await newRequi.save();
    } catch (error) {
        console.log(error);
    }
    

    return res.status(201).json({message: '', data: newRequi})
}

export const requis  = async(req: Request, res: Response): Promise<Response> => {
    const requis = await Requi.find({estatus: req.body.estatus});
    if(!requis) return res.status(404).json({message: 'No se han encontrado requisiciones.'});

    return res.status(200).json({message: 'Consulta exitosa.', data: requis});
}