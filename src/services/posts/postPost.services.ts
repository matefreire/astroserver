import { db } from "@/app";
import { AppError } from "@/error";
import { postRegisterType, postType } from "@/types/post.types";
import { User } from "@prisma/client";

export const postPostService = async(post: postRegisterType): Promise<postType> => {

    const user: User | null = await db.user.findUnique({
        where:{
            id: post.userId
        }
    })

    if(!user){
        throw new AppError('User notfound', 404)
    }

    const newPost = await db.post.create({
        data:{
            title: post.title,
            description: post.description,
            userId: post.userId,
            post_type: post.post_type,
            picture: post.picture,
        }
    })

    return newPost
}