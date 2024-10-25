import {model, Schema, Document, ObjectId} from 'mongoose';
import bcrypt from 'bcrypt';

/**
 * * Interfaz para el modelo de usuario.
 */
export interface IUser extends Document {
    nombre: string, 
    email: string,
    password?: string,
    activo: boolean,
    rol: string,
    direccion: ObjectId,
    comparePassword: (password: string) => Promise<boolean>
    checkEmail: (email: string) => Promise<boolean>
}

/**
 * * Definición del esquema de usuario.
 */
const UserSchema: Schema<IUser> = new Schema({
    nombre: {type: String, required: true},
    email: { type: String, unique: true, required: true },
    password: String,
    activo: Boolean,
    rol: {type: String, enum: ['admin', 'r_presupuesto', 'r_proveedor', 'solicitante']},
    direccion: {ref: "Dir", type: Schema.Types.ObjectId, required: true}
}, {timestamps: true});

UserSchema.pre<IUser>('save', async function(next){
    const user = this;
    if(!user.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password!, salt);

    user.password = hash;
    next();
});

UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password).catch((e) => false);
}

UserSchema.methods.checkEmail = async function (email: string): Promise<boolean> {
    const user = await this.findOne({email: email});
    if(user) return true;
    return false;
}

UserSchema.pre<IUser>('find', async function(next){
    this.populate('direccion');
})

export default model<IUser>('User', UserSchema);