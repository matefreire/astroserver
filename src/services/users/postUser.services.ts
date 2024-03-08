import { db } from "@/app";
import { AppError } from "@/error";
import { userRegister } from "@/types/user.types";
import { hashPassword } from "@/utils/bcrypt";

const postUserService = async (reqBody: userRegister): Promise<userRegister> => {

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
    return newUser
}

export default postUserService; 