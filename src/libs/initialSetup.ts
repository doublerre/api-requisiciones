import Dir from "../models/Dir";

export const createDirs = async () => {
    try {
        const count = await Dir.estimatedDocumentCount();
        
        if(count > 0) return;

        const values = await Promise.all([
            new Dir({_id:"6191e8fc50f2c38a2dcdc0d3", name: "Dirección General"}).save(),
            new Dir({_id:"63e3b45b5a2d6927f4812ca1", name: "Fondos Mixtos"}).save(),
            new Dir({_id:"63e3b7f2e26b06d9700fe230", name: "Laboratorio de Software Libre"}).save(),
            new Dir({_id:"63e3b7f841b7868414674134", name: "Unidad de Transparencia"}).save(),
            new Dir({_id:"63e3b7fc055baf0da1b6dfda", name: "Unidad de Planeación"}).save(),
            new Dir({_id:"63e3b800d5e4fb9941cfa8f6", name: "Imagen Institucional"}).save(),
            new Dir({_id:"63e3b805d2f0d1b2bdb1a5c3", name: "Dirección Jurídica"}).save(),
            new Dir({_id:"63e3b80b6fc22840361a6e6e", name: "Dirección de Innovación y Desarrollo Regional"}).save(),
            new Dir({_id:"63e3b811914f2ef4dbab9aed", name: "Dirección de Difusión y Divulgación de la Ciencia"}).save(),
            new Dir({_id:"63e3b815228f05600b88efb4", name: "Departamento de Apropiación Social de la Ciencia"}).save(),
            new Dir({_id:"63e3b81a5d3ddf55d9db4f13", name: "Departamento de Ciencia Itinerante"}).save(),
            new Dir({_id:"63e3b81db7161122d1fb1903", name: "Secretaría Técnica"}).save(),
            new Dir({_id:"63e3b821ffbc18a332eaaea8", name: "Dirección de Administración y Finanzas"}).save(),
            new Dir({_id:"63e3b82422c8f5a730740a00", name: "Departamento de Recursos Humanos"}).save(),
            new Dir({_id:"63e3b829f894e272d3243025", name: "Departamento de Recursos Financieros y Contabilidad"}).save(),
            new Dir({_id:"63e3b82da8837faf685ddd6b", name: "Departamento de Recursos Materiales y Servicios"}).save(),
            new Dir({_id:"63e3b831a60a8d60af484812", name: "Deprtamento de Informática"}).save(),
            new Dir({_id:"63e3b834df9db20657551605", name: "Centro de Comunicación y Divulgación de la Ciencia"}).save(),
            new Dir({_id:"63e3b83815f6c84efeec6b9f", name: "Organo Interno de Control"}).save(),
            new Dir({_id:"63e3b83d99995361177358bd", name: "Dirección de Desarrollo de Talento en Ciencia, Tecnología e Innovación"}).save(),
            new Dir({_id:"63e3b8411368c50caf42715e", name: "Departamento de Becas"}).save(),
            new Dir({_id:"63e3b844a1465492e9a5eb17", name: "Zig-Zag"}).save(),
            new Dir({_id:"63e3b847e8176d8686820c2f", name: "Quantum"}).save(),
        ]);
        console.log("Direcciónes creadas con exito");
        
    } catch (error) {
        console.error(error);
    }
}