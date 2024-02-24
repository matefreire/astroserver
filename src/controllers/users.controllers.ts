import { Request, Response } from "express";

const registerUserControllers = (req: Request, res: Response): Promise<Response> => {

    const reqBody = req.body 
    const createdUser = 

    return res.status(200).json(createdUser)
}