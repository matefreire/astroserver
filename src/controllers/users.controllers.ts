import { Request, Response } from "express";
import postUserService from "@/services/users/postUser.services";
import { loginUserService } from "@/services/users/loginUser.services";
import { getAllUsersService } from "@/services/users/getAllUsers.services";
import { getUserByIdService } from "@/services/users/getUserById.services";
import { userRegister, userWithoutPassword } from "@/types/user.types";
import { putUserService } from "@/services/users/putUser.services";

const postUserController = async(req: Request, res: Response): Promise<Response<void>> => {

    const reqBody = req.body 
    const createdUser:userRegister = await postUserService(reqBody)

    return res.status(200).json(createdUser)
}

const loginUserController = async(req: Request, res:Response): Promise<Response<void>> =>{

    const token:string = await loginUserService(req.body)

    return res.status(200).json({token})
}


const getAllUsersController = async(req: Request, res:Response): Promise<Response<void>> =>{

    const users:userWithoutPassword[] = await getAllUsersService()

    return res.status(200).json(users)
}

const getUserByIdController = async(req: Request, res:Response): Promise<Response<void>> =>{

    const id:string = req.params.id

    const user:userWithoutPassword = await getUserByIdService(id)

    return res.status(200).json(user)
}

const putUserController = async(req: Request, res:Response): Promise<Response<void>> =>{
    const user = req.body

    const editedUser: userWithoutPassword = await putUserService(user)

    return res.status(200).json(editedUser)
}


export {postUserController, loginUserController, getAllUsersController, getUserByIdController, putUserController}