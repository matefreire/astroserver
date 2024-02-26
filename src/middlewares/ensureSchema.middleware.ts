import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";

const ensureSchema = (schema: ZodType) => (req: Request, res:Response, next: NextFunction) => {
 
    const parsedSchema = schema.parse(req.body)
    req.body = parsedSchema

    next()
}

export {ensureSchema}