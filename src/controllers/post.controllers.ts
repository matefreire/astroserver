import { postPostService } from "@/services/posts/postPost.services";
import { postType } from "@/types/post.types";
import { Request, Response } from "express";

const getPostByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id: number = req.body;
    const post: postType = await postPostService(id);
    return res.status(200).json(post);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: "Erro interno" });
  }
};

const getAllPostController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const posts: postType[] = await postPostService();
    return res.status(200).json(posts);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: "Erro interno" });
  }
};

const postPostController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const createdPost: postType = await postPostService(req.body);
    return res.status(201).json(createdPost);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: "Erro interno" });
  }
};

export { postPostController, getPostByIdController };
