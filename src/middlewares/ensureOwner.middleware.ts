import { db } from "@/app";
import { AppError } from "@/error";
import { NextFunction, Request, Response } from "express";

export const ensureOwner = async(req:Request, res:Response, next:NextFunction): Promise<void> => {
    
    const id = req.params.id
    const isAdmin = res.locals.isAdmin
    const email = res.locals.email


    if(isAdmin == 'ADMIN'){
        next()
        return
    }

    const user = await db.user.findUnique({
        where: {
            id: id
        }
    })

    if(user?.email != email){
        throw new AppError("Not allowed", 403)
    }

    next()
}