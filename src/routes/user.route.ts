import { Router } from "express";

import { deleteUserController, getAllUsersController, getUserByIdController, getUserByTokenController, loginUserController, postUserController, putUserController } from "@/controllers/users.controllers";

import { ensureSchema } from "@/middlewares/ensureSchema.middleware";


import { userLoginSchema, userRegisterSchema } from "@/schemas/user.schemas";
import { ensureBodyExists } from "@/middlewares/ensureBodyExists.middleware";
import { ensureIsAdm } from "@/middlewares/ensureIsAdm.middleware";
import { ensureUserToken } from "@/middlewares/ensureUserToken.middleware";
import { ensureOwner } from "@/middlewares/ensureOwner.middleware";
import { ensureUserIdExists } from "@/middlewares/ensureUserIdExists.middleware";

export const userRoute: Router = Router()

userRoute.get('', getAllUsersController)
userRoute.get('/:id', ensureUserIdExists, getUserByIdController)
userRoute.get('/token', ensureUserToken, getUserByTokenController)

userRoute.post('', ensureBodyExists, ensureSchema(userRegisterSchema), postUserController)

userRoute.post('/login', ensureBodyExists, ensureSchema(userLoginSchema), loginUserController)
userRoute.post('/login/admin', ensureBodyExists, ensureSchema(userLoginSchema), ensureIsAdm, loginUserController)

userRoute.put('/:id', ensureBodyExists, ensureUserToken, ensureOwner, ensureUserIdExists, putUserController)

userRoute.delete('/:id', ensureUserToken, ensureOwner, ensureUserIdExists, deleteUserController)