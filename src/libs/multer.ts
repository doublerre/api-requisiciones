import multer from "multer";

const memoryStorage = multer.memoryStorage();

export default multer({storage: memoryStorage});