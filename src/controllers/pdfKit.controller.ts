import PDF from 'pdfkit-table'
import fs from 'fs'
import {Request, Response} from 'express';
import moment from "moment";
import Requi from '../models/Requi';

export const createPDFRequi = async(req: Request, res: Response): Promise<Response> => {
    const requi = await Requi.findById(req.params.id);
    const date = convertISODate(requi!.createdAt);
    const table = {
        headers: [
            {label: "Cantidad", property: "cantidad", headerColor:"#BB4433", headerOpacity:1, align: "center", headerAlign: "center", width:50},
            {label: "Unidad", property: "unidad", headerColor:"#BB4433", headerOpacity:1, align: "center", headerAlign: "center", width:50},
            {label: "Descripción completa del artículo incluyendo datos técnicos (Cuando se requieran)", headerColor:"#BB4433", headerOpacity:1, property: "descripcion", align: "center", headerAlign: "center", width:250},
            {label: "Exclusivo de administración", headerColor:"#BB4433", headerOpacity:1, align: "center", headerAlign: "center", width:120},
        ],
        datas: requi!.requisicion,
        options: {
            prepareRow: (row: any, indexColumn: number, indexRow: any, rectRow: any, rectCell: { x: any; y: any; width: any; height: any; }) => {
                const {x, y, width, height} = rectCell;
                doc.font('Helvetica').fontSize(8);
                console.log(indexRow);
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
    doc.table(table);
    doc.pipe(fs.createWriteStream("./pdf/requi.pdf"));
    doc.end();
    return res.json({message: "PDF creado con exito.", data: requi});
}

const convertISODate = (isodate: string) => {
    const date = moment(isodate);
    const dateComponent = date.utc().format('DD/MM/YYYY');
    return dateComponent;
}