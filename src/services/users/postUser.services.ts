import { db } from "@/app";
import { AppError } from "@/error";
import { userRegisterResponseSchema } from "@/schemas/user.schemas";
import { userRegister, userRegisterResponse } from "@/types/user.types";
import { hashPassword } from "@/utils/bcrypt";

const postUserService = async (reqBody: userRegister): Promise<userRegisterResponse> => {

    const hashedPassword = await hashPassword(reqBody.password);

    const emailUnique = await db.user.findUnique({
        where: {
            email: reqBody.email
        }
    })

    if(emailUnique){
        throw new AppError("Email already exists", 409)
    }

    const newUser = await db.user.create({
        data: {
            ...reqBody,
            password: hashedPassword
        }
    })

    const userWithoutPassword = userRegisterResponseSchema.parse(newUser)

    return userWithoutPassword
}

export default postUserService; 