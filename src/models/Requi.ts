import {model, Schema, Document, ObjectId} from 'mongoose';
import { verifyContent, readTxtFile, writeTxtFile } from "../libs/fileSystem";
import { v4 } from "uuid";

export interface IRequi extends Document{
    solicita: string,
    folio: string,
    archivo: string,
    prioridad: string,
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
        user: Array<ObjectId>
    },
    estatus: string
}

const RequiSchema: Schema<IRequi> = new Schema({
    solicita: {type: String, required: true},
    folio: String,
    archivo: String,
    prioridad: {type: String, required: true, enum: ['Baja', 'Media', 'Alta'], default: 'Baja'},
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
        administracion: String,
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