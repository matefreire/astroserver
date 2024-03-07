import { Router } from "express";

import { registerUserControllers } from "@/controllers/users.controllers";

import { ensureSchema } from "@/middlewares/ensureSchema.middleware";


import { userRegisterSchema } from "@/schemas/user.schemas";
import { ensureBodyExists } from "@/middlewares/ensureBodyExists.middleware";

export const userRoute: Router = Router()

userRoute.post('/register', ensureBodyExists, ensureSchema(userRegisterSchema), registerUserControllers)