import { Router } from "express";

import { getAllUsersController, getUserByIdController, loginUserController, postUserController, putUserController } from "@/controllers/users.controllers";

import { ensureSchema } from "@/middlewares/ensureSchema.middleware";


import { userLoginSchema, userRegisterSchema } from "@/schemas/user.schemas";
import { ensureBodyExists } from "@/middlewares/ensureBodyExists.middleware";
import { ensureIsAdm } from "@/middlewares/ensureIsAdm.middleware";

export const userRoute: Router = Router()

userRoute.get('', getAllUsersController)
userRoute.get('/:id', getUserByIdController)

userRoute.post('', ensureBodyExists, ensureSchema(userRegisterSchema), postUserController)

userRoute.post('/login', ensureBodyExists, ensureSchema(userLoginSchema), loginUserController)
userRoute.post('/login/admin', ensureBodyExists, ensureSchema(userLoginSchema), ensureIsAdm, loginUserController)

userRoute.put('', putUserController)