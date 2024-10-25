import {model, Schema, Document, ObjectId} from 'mongoose';
import { verifyContent, readTxtFile, writeTxtFile } from "../libs/fileSystem";
import { v4 } from "uuid";

export interface IRequi extends Document{
    solicita: string,
    folio: string,
    archivo: string,
    pdf: string,
    prioridad: string,
    presupuesto_val: boolean,
    proveedor_val: boolean,
    comentarios: [{
        comentario: string,
        user: Array<ObjectId>
    }]
    requisicion: [{
        cantidad: string, 
        unidad: string,
        descripcion: string,
        administracion: string,
    }],
    solicitante: {
        validacion: string,
        user: any
    },
    estatus: string,
    createdAt: string
}

const RequiSchema: Schema<IRequi> = new Schema({
    solicita: {type: String, required: true},
    folio: String,
    archivo: String,
    pdf: String,
    prioridad: {type: String, required: true, enum: ['Baja', 'Media', 'Alta'], default: 'Baja'},
    presupuesto_val: Boolean,
    proveedor_val: Boolean,
    comentarios: [{
        comentario: String,
        user: [{
            ref: 'User',
            type: Schema.Types.ObjectId
        }],
    }],
    requisicion: [{
        cantidad: {type: String, required: true},
        unidad: {type: String, required: true},
        descripcion: {type: String, required: true},
    }],
    solicitante: {
        validacion: String,
        user: {
            ref: 'User',
            type: Schema.Types.ObjectId
        },
    },
    estatus: {type: String, required: true, enum: ['Borrador', 'Revisión', 'Aprobado', 'Rechazado'], default: "Borrador"}
}, {timestamps: true});

RequiSchema.pre<IRequi>('save', async function(next) {
    const requi = this;
    //if(requi.estatus) return next();
    if(requi.pdf) return next();
    if(requi.isModified('archivo')) return next();
    requi.solicitante.validacion = v4();
    const date = new Date();
    verifyContent(date.getFullYear());
    const id = await readTxtFile(date.getFullYear());
    const new_id = id.padStart(4, "0");
    const folio = "RQ-" + date.getFullYear() + "-" + new_id;
    requi.folio = folio;
    writeTxtFile(id, date.getFullYear());
    next();
});

export default model<IRequi>('Requi', RequiSchema);