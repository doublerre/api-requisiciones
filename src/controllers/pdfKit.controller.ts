import PDF from 'pdfkit-table';
import fs from 'fs';
import {Request, Response} from 'express';
import moment from "moment";
import { v4 } from "uuid";

import Requi from '../models/Requi';

export const createPDFRequi = async(req: Request, res: Response): Promise<Response> => {
    const requi = await Requi.findById(req.params.id).populate('solicitante.user');
    if(!requi) return res.status(404).json({message: "No se encontraron resultados"});
    if(requi.pdf) return res.status(400).json({message: "Ya existe un PDF para esta requisicion"});
    if(requi.proveedor_val !== true || requi.presupuesto_val !== true) return res.status(400).json({message: "La requisicion no es valida"});
    const date = convertISODate(requi!.createdAt);
    const productosTable = {
        headers: [
            {label: "Cantidad", property: "cantidad", headerColor:"#BB4433", headerOpacity:1, align: "center", headerAlign: "center", width:50},
            {label: "Unidad", property: "unidad", headerColor:"#BB4433", headerOpacity:1, align: "center", headerAlign: "center", width:50},
            {label: "Descripción completa del artículo incluyendo datos técnicos (Cuando se requieran)", headerColor:"#BB4433", headerOpacity:1, property: "descripcion", align: "center", headerAlign: "center", width:220},
            {label: "Exclusivo de administración", headerColor:"#BB4433", headerOpacity:1, align: "center", headerAlign: "center", width:150},
        ],
        datas: requi!.requisicion,
        options: {
            prepareRow: (row: any, indexColumn: number, indexRow: any, rectRow: any, rectCell: { x: any; y: any; width: any; height: any; }) => {
                const {x, y, width, height} = rectCell;
                doc.font('Helvetica').fontSize(8);
                if(indexColumn === 0){
                    doc.lineWidth(.01).moveTo(x, y).lineTo(x, y + height).stroke();
                }
                doc.lineWidth(.01).moveTo(x + width, y).lineTo(x + width, y + height).stroke();
            },
        }
    }
    
    const firmasTable = {
        headers: [
            {label: `\n \n${toUperCase(requi!.solicitante.user.nombre)} \n${toUperCase(requi!.solicitante.user.direccion.name)} \n${requi!.solicitante.validacion} \n \n \n`, property: "solicita", align: "center", headerAlign: "center"},
            {label: "\n \n", property: "autoriza", align: "center", headerAlign: "center"},
            {label: "\n \nMTRO. EFRAIN ESPARZA MONTALVO", property: "vb", align: "center", headerAlign: "center"},
        ],
        datas: [
            {solicita: "bold:Solicita", autoriza: "bold:Autoriza", vb: "bold:Visto Bueno \nDirección Administrativa"}
        ],
        options: {
            prepareRow: (row: any, indexColumn: number, indexRow: any, rectRow: any, rectCell: { x: any; y: any; width: any; height: any; }) => {
                const {x, y, width, height} = rectCell;
                doc.font('Helvetica').fontSize(8);
                if(indexColumn === 0){
                    doc.lineWidth(.01).moveTo(x, y).lineTo(x, y + height).stroke();
                }
                doc.lineWidth(.01).moveTo(x + width, y).lineTo(x + width, y + height).stroke();
            },
        }
    }

    const doc = new PDF({size: 'LETTER'});
    doc.image('images/logo.jpg', (doc.page.width - 204) / 2);
    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(20).text('REQUISICIÓN DE COMPRAS Y SERVICIOS.', {align: "center"});
    doc.moveDown();
    doc.font('Helvetica').fontSize(12);
    doc.text(`Folio: ${requi!.folio}        Fecha de solicitud: ${date}`, {align: 'center'});
    doc.moveDown();
    doc.font('Helvetica-Bold').text(`Se solicita: ${requi!.solicita}`, {align: "justify"});
    doc.moveDown();
    doc.table(productosTable);
    doc.moveDown();
    doc.table(firmasTable);
    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(8).text('Nota: La adquisición del material o contratación del servicio queda sujeta a las condiciones presupuestales.', {align: 'center'});
    const filename = pathFilename();
    doc.pipe(fs.createWriteStream(filename));
    doc.end();
    requi.pdf = filename;
    await requi.save();
    return res.json({message: "PDF creado con exito.", data: requi});
}

const convertISODate = (isodate: string) => {
    const date = moment(isodate);
    const dateComponent = date.utc().format('DD/MM/YYYY');
    return dateComponent;
}

const toUperCase = (name: string) => {
    const cadena = name;
    return cadena.toUpperCase();
}

const pathFilename = () => {
    const filename = "pdf/" + v4() + ".pdf";
    return filename;
}