import { db } from "@/app"

import { AppError } from "@/error"

import { userLogin } from "@/types/user.types"

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const loginUserService = async (reqBody: userLogin):Promise<string> => {

    const user = await db.user.findUnique({
        where: {
            email: reqBody.email
        }
    })

    if (!user) {
        throw new AppError("Wrong e-mail/password", 400)
    }

    const unHashedPassword = await bcrypt.compare(reqBody.password, user.password)
    console.log(unHashedPassword)
    if (!unHashedPassword) {
        throw new AppError("Wrong e-mail/password", 400)
    }

    const token = jwt.sign({
        isAdmin: user.access_level
    }, process.env.SECRET_KEY!, {
        expiresIn: '1d',
        subject: String(user.email)
    })

    return token
}



export { loginUserService }