import { AppError } from "@/error"
import { NextFunction, Request, Response } from "express"

export const ensureBodyExists = async (req: Request, res: Response, next:NextFunction)  => {
    if (!req.body || Object.keys(req.body).length === 0) {
        throw new AppError("Body necessary", 400)
      }
  
    next()
} 