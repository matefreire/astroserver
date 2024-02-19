import { Request, Response } from "express";
import { ZodType } from "zod";

const ensureSchema = (schema: ZodType) => (req: Request, res:Response) => {
    if(!req.body){
        
    }
    
}