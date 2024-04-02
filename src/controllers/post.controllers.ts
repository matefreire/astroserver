import { postPostService } from "@/services/posts/postPost.services";
import { postType } from "@/types/post.types";
import { Request, Response } from "express";

const postPostController = async(req:Request, res:Response):Promise<Response>=>{
    
    const createdPost:postType = await postPostService(req.body)

    return res.status(201).json(createdPost)
}

export{postPostController}