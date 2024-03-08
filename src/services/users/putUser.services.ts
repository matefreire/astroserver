import { db } from "@/app"
import { userWithoutPasswordSchema } from "@/schemas/user.schemas"
import { userWithoutPassword } from "@/types/user.types"
import { User } from "@prisma/client"

const putUserService = async(id: string, user: Partial<User>):Promise<userWithoutPassword> => {
    
    const newUser: User = await db.user.update({
        where: {
            id: id
        },
        data: user
    })

    const userWithoutPassword: userWithoutPassword = userWithoutPasswordSchema.parse(newUser)

    return userWithoutPassword
}

export {putUserService}