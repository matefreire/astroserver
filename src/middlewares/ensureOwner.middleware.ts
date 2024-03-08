import { db } from "@/app";
import { AppError } from "@/error";
import { NextFunction, Request, Response } from "express";

export const ensureOwner = async(req:Request, res:Response, next:NextFunction): Promise<void> => {
    
    const email = res.locals.email
    const isAdmin = res.locals.isAdmin
    
    const user = await db.user.findUnique({
        where: {
            email: email
        }
    })

    if(!user && isAdmin === 'USER'){
        throw new AppError("Not allowed", 403)
    }

    next()
}