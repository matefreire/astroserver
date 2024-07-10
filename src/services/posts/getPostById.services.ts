import { db } from "@/app";
import { AppError } from "@/error";
import { postType } from "@/types/post.types";

export const getPostByIdService = async (id: string): Promise<postType> => {
  const post = await db.post.findUnique({
    where: {
      id: id,
    },
  });

  if (!post) {
    throw new AppError("Post notfound", 404);
  }

  return post;
};
