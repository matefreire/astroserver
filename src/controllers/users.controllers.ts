import { Request, Response } from "express";
import registerUserService from "../services/users/registerUserService";

const registerUserControllers = async(req: Request, res: Response): Promise<Response<void>> => {

    const reqBody = req.body 
    const createdUser = await registerUserService(reqBody)


    return res.status(200).json(createdUser)
}

export {registerUserControllers}