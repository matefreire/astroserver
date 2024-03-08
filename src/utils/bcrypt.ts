import bcrypt from 'bcrypt'
export const hashPassword = async(password:string) => {

    const newPassword = await bcrypt.hash(password, 10)

    return newPassword
}

