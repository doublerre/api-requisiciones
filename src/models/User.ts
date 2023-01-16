import {model, Schema, Document} from 'mongoose';
import bcrypt from 'bcrypt';

/**
 * * Interfaz para el modelo de usuario.
 */
export interface IUser extends Document {
    nombre: string, 
    username: string,
    password: string,
    activo: boolean,
    rol: string,
    comparePassword: (password: string) => Promise<boolean>
    checkUsername: (username: string) => Promise<boolean>
}

/**
 * * Definición del esquema de usuario.
 */
const UserSchema: Schema<IUser> = new Schema({
    nombre: {type: String, required: true},
    username: { type: String, unique: true, required: true },
    password: String,
    activo: String,
    rol: {type: String, enum: ['admin', 'r_presupuesto', 'r_proveedor', 'solicitante']},
}, {timestamps: true});

UserSchema.pre<IUser>('save', async function(next){
    const user = this;
    if(!user.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
    next();
});

UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password).catch((e) => false);
}

UserSchema.methods.checkUsername = async function (username: string): Promise<boolean> {
    const user = await this.findOne({username: username});
    if(user) return true;
    return false;
}

export default model<IUser>('User', UserSchema);