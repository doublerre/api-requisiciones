import multer from "multer";
import { v4 } from "uuid";
import path from 'path'

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, v4() + path.extname(file.originalname));
    },
});


export default multer({
    storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /pdf/;
        const mimeType = fileTypes.test(file.mimetype);
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        if(mimeType && extName) return cb(null, true);

        cb(new Error("Error: Solo se pueden subir archivos en formato PDF."));
    }
});