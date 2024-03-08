import { db } from "@/app";
import { User } from "@prisma/client";

import { AppError } from "@/error";

import { userLogin } from "@/types/user.types";

import { NextFunction, Request, Response } from "express";

export const ensureIsAdm = async(req:Request, res:Response, next:NextFunction) => {

    const userBody:userLogin = req.body

    const user: User| null = await db.user.findUnique({
        where: {
            email: userBody.email
        }
    })

    if(!user){
        throw new AppError('Wrong e-mail/password', 400)
    }

    if(user.access_level !== 'ADMIN'){
        throw new AppError("Access denied", 403)
    }

    next()
}