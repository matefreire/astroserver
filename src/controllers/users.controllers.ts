import { Request, Response } from "express";
import postUserService from "@/services/users/postUser.services";
import { loginUserService } from "@/services/users/loginUser.services";
import { getAllUsersService } from "@/services/users/getAllUsers.services";
import { getUserByIdService } from "@/services/users/getUserById.services";
import { userRegister, userRegisterResponse, userWithoutPassword } from "@/types/user.types";
import { putUserService } from "@/services/users/putUser.services";
import { deleteUserService } from "@/services/users/deleteUser.services";

const postUserController = async (req: Request, res: Response): Promise<Response<void>> => {

    const reqBody = req.body
    const createdUser: userRegisterResponse = await postUserService(reqBody)

    return res.status(201).json(createdUser)
}

const loginUserController = async (req: Request, res: Response): Promise<Response<void>> => {

    const token: string = await loginUserService(req.body)

    return res.status(200).json({ token })
}

const getAllUsersController = async (req: Request, res: Response): Promise<Response<void>> => {

    const users: userWithoutPassword[] = await getAllUsersService()

    return res.status(200).json(users)
}

const getUserByIdController = async (req: Request, res: Response): Promise<Response<void>> => {

    const id: string = req.params.id

    const user: userWithoutPassword = await getUserByIdService(id)

    return res.status(200).json(user)
}

const putUserController = async (req: Request, res: Response): Promise<Response<void>> => {

    const user = req.body

    const id: string = req.params.id

    const editedUser: userWithoutPassword = await putUserService(id, user)

    return res.status(200).json(editedUser)
}

const deleteUserController = async (req: Request, res: Response): Promise<Response<void>> => {

    const id: string = req.params.id

    await deleteUserService(id)

    return res.sendStatus(204)
}

export { postUserController, loginUserController, getAllUsersController, getUserByIdController, putUserController, deleteUserController }