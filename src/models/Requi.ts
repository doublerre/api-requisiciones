import {model, Schema, Document, ObjectId} from 'mongoose';

export interface IRequi extends Document{
    solicita: string,
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
    solicitante: [{
        validacion: string,
        user: Array<ObjectId>
    }],
    estatus: string
}

const RequiSchema: Schema<IRequi> = new Schema({
    solicita: {type: String, required: true},
    archivo: {type: String, required: true},
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
        descripcion: {type: Text, required: true},
        administracion: String,
    }],
    solicitante: [{
        validacion: {type: String, required: true},
        user: [{
            ref: 'User',
            type: Schema.Types.ObjectId
        }],
    }],
    estatus: {type: String, required: true, enum: ['Borrador', 'Revisión', 'Aprobado', 'Rechazado']}
}, {timestamps: true});

export default model<IRequi>('Requi', RequiSchema);