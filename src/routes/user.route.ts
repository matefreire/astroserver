import { Router } from "express";
import { registerUserControllers } from "../controllers/users.controllers";
import { ensureBody } from "../middlewares/ensureBody.middleware";
import { ensureSchema } from "../middlewares/ensureSchema.middleware";

export const userRoute: Router = Router()

userRoute.post('/register', ensureBody, ensureSchema, registerUserControllers)