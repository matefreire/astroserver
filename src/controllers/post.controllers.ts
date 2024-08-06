import { deletePostService } from "@/services/posts/deletePostService.services";
import { getAllPostService } from "@/services/posts/getAllPost.services";
import { getPostByIdService } from "@/services/posts/getPostById.services";
import { postPostService } from "@/services/posts/postPost.services";
import { postSearchPostService } from "@/services/posts/postSearchPostService.services";
import { putPostService } from "@/services/posts/putPostService.services";
import { postType } from "@/types/post.types";
import { Request, Response } from "express";

const getPostByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id: string = req.params.id;
    const post: postType = await getPostByIdService(id);
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
    const posts: postType[] | null = await getAllPostService();
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
    const searchedPost: postType = await postPostService(req.body);
    return res.status(201).json(searchedPost);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: "Erro interno" });
  }
};

const postSearchPostController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const createdPost: postType[] = await postSearchPostService(req.body.posts);
    console.log(createdPost);
    return res.status(200).json(createdPost);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: "Erro interno" });
  }
};
const putPostController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = req.params.id;
    const editedPost: postType = await putPostService(id, req.body);
    return res.status(201).json(editedPost);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: "Erro interno" });
  }
};

const deletePostController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    await deletePostService(req.params.id);
    return res.status(204).send();
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: "Erro interno" });
  }
};

export {
  postPostController,
  getPostByIdController,
  getAllPostController,
  deletePostController,
  putPostController,
  postSearchPostController,
};
