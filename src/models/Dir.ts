import { model, Schema, Document } from "mongoose";

export interface IDir extends Document {
    name: string,
}

const DirSchema: Schema<IDir> = new Schema({
    name: {type: String, required: true}
});

export default model<IDir>('Dir', DirSchema);