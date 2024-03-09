import { db } from "@/app";
import { AppError } from "@/error";
import { userWithoutPasswordSchema } from "@/schemas/user.schemas";
import { userWithoutPassword } from "@/types/user.types";
import { User } from "@prisma/client";

const getUserByIdService = async(id: string):Promise<userWithoutPassword> => {

    const user: User | null = await db.user.findUnique({
        where:{
            id:id
        }
    })

    const userWithoutPassword = userWithoutPasswordSchema.parse(user)

    return userWithoutPassword
}

export {getUserByIdService}