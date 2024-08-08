import { getAllPostsToAproveService } from "@/services/admin/getAllPostsToAprove.services";
import { PostType } from "@/types/model.types";
import { Request, Response } from "express";

const getAllPostsToAproveController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const posts: PostType[] | null = await getAllPostsToAproveService();
    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro interno" });
  }
};

export { getAllPostsToAproveController };
