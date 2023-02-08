import { Request, Response, NextFunction } from "express";

export const validateRequest = async (req: Request, res: Response, next: NextFunction, schema: any) => {
    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true,
    };
    const {error, value} = schema.validate(req.body, options);
    if (error) {
        res.status(422).json({
            message: 'Error de validación.',
            error: error.details,
        });
    } else {
        req.body = value;
        next();
    }
}