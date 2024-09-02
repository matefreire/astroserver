import { postCommentService } from "@/services/comment/postComment.services";
import { CommentType } from "@/types/model.types";
import { Request, Response } from "express";

export const postCommentController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const commentData: CommentType = await postCommentService(req.body!);
    return res.status(201).json(commentData);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: "Erro interno" });
  }
};
