import { db } from "@/app"

const deleteUserService = async(id:string): Promise<void> => {

    await db.user.delete({
        where: {
            id:id
        }
    })


}

export {deleteUserService}