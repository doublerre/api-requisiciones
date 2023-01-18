import { existsSync, mkdirSync, writeFile } from 'fs'
import path from 'path';

export const verifyContent = (year: Number) => {
    const folder_path = path.resolve("build/folio/")
    const file_path = path.resolve("build/folio/" + year + ".txt");
    const content = "1";
    if(existsSync(file_path)){
        return true;
    }else{
        try {
            mkdirSync(folder_path);
        } catch (error) {
            console.log(error);
        }
        writeFile(file_path, content, err => {
            if(!err) return false;
        });
        return true;
    }
}