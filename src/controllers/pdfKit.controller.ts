import PDF from 'pdfkit'
import fs from 'fs'
import {Request, Response} from 'express';

export const createPDFRequi = async(req: Request, res: Response): Promise<Response> => {
    const doc = new PDF({size: 'LETTER '});
    doc.image('images/logo.jpg', (doc.page.width - 204) / 2);
    doc.pipe(fs.createWriteStream("./pdf/requi.pdf"));
    doc.end();
    return res.json({message: "PDF creado con exito."});
}