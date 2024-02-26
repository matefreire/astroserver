import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";

const ensureBody = (req: Request, res: Response, next: NextFunction) => {
    if(!req.body){
        throw new AppError("Need request body", 400)
    }
    next()
}

export {ensureBody}