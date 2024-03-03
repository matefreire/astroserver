import { Router } from "express";

import { registerUserControllers } from "@/controllers/users.controllers";

import { ensureSchema } from "@/middlewares/ensureSchema.middleware";


import { userRegisterSchema } from "@/schemas/user.schemas";

export const userRoute: Router = Router()

userRoute.post('/register', ensureSchema(userRegisterSchema), registerUserControllers)