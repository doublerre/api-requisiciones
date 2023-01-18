import { existsSync, mkdirSync, writeFileSync, writeFile, readFileSync } from 'fs'
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

export const readTxtFile = async (year: Number) => {
    const file_path = path.resolve("build/folio/" + year + ".txt");
    const data = readFileSync(file_path, 'utf-8');
    return data;
}

export const writeTxtFile = (id: string, year: Number) => {
    let id_int = parseInt(id);
    id_int = id_int + 1;
    const file_path = path.resolve("build/folio/" + year + ".txt");
    writeFileSync(file_path, id_int.toString(), "utf-8");
}