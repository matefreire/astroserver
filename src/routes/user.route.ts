import { Router } from "express";
import { registerUserControllers } from "../controllers/users.controllers";

export const userRoute: Router = Router()

userRoute.post('/register', registerUserControllers)