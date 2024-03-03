import { userRegisterSchema } from "@/schemas/user.schemas";
import { z } from "zod";

export type userRegister = z.infer<typeof userRegisterSchema>