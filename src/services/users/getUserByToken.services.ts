import { db } from "@/app"
import { userWithoutPasswordSchema } from "@/schemas/user.schemas"
import { userWithoutPassword } from "@/types/user.types"
import { User } from "@prisma/client"

export const getUserByTokenService = async(email:string): Promise<userWithoutPassword> =>{

    const user: User | null = await db.user.findUnique({
        where: {
            email: email
        }
    })


    const userWithoutPassword = userWithoutPasswordSchema.parse(user)

    return userWithoutPassword

}