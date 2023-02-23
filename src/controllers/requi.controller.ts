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

export const getRequi = async(req: Request, res: Response): Promise<Response> => {
    const requi = await Requi.findById(req.params.id).populate('solicitante.user');
    if(!requi) return res.status(404).json({message: 'No se han encontrado requisiciones.'});
    return res.status(200).json({message: 'Consulta exitosa.', data: requi});
}

export const uploadFile = async (req: Request, res: Response): Promise<Response> => {
    const requi = await Requi.findById(req.params.id);
    if(!requi) return res.status(404).json({message: "Error, no se encontro la requisición"});
    requi.archivo = req.file!.path;
    const requiUpdated = await requi.save();
    return res.status(200).json({message: 'Archivo subido con exito.', data: requiUpdated});
}

export const deleteRequi = async (req: Request, res: Response): Promise<Response> => {
    const requi = await Requi.findByIdAndDelete(req.params.id);
    if(!requi) return res.status(404).json({message: "No se encontro la requisición a eliminar"});
    return res.status(200).json({message: "Requisición eliminada correctamente.", data: requi});
}

export const updateRequi = async(req: Request, res: Response): Promise<Response> => {
    const requiUpdated = await Requi.findByIdAndUpdate(req.params.id, req.body, {new: true});
    return res.status(200).json({message: 'Requisición actualizada con exito', data: requiUpdated});
}

export const valRequi = async(req: Request, res: Response): Promise<Response> => {
    const requiUpdated = await Requi.findByIdAndUpdate(req.params.id, req.body, {new: true});
    //const requi = await Requi.findById(req.params.id);
    //if(!requi) return res.status(404).json({message: 'No se encontro la requisición con este id'});
    if(req.body.presupuesto_val === false || req.body.proveedor_val === false){
        const requiReject = await Requi.findByIdAndUpdate(req.params.id, {estatus: "Rechazado"}, {new: true});
        return res.json({message: 'Requisición rechazada.', data: requiReject});
    }
    if(requiUpdated!.presupuesto_val === true && requiUpdated!.proveedor_val === true){
        const requiAcepted = await Requi.findByIdAndUpdate(req.params.id, {estatus: "Aprobado"}, {new: true});
        return res.json({message: "Requisición aceptada.", data: requiAcepted});
    }
    return res.json({message: 'Requisición actualizada.', data: requiUpdated}); 
}