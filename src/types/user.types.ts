import { userLoginSchema, userRegisterResponseSchema, userRegisterSchema, userWithoutPasswordSchema } from "@/schemas/user.schemas";
import { z } from "zod";

export type userRegister = z.infer<typeof userRegisterSchema>
export type userLogin = z.infer<typeof userLoginSchema>
export type userWithoutPassword = z.infer<typeof userWithoutPasswordSchema>
export type userRegisterResponse = z.infer<typeof userRegisterResponseSchema>