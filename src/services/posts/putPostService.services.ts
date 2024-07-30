import { db } from "@/app";
import { AppError } from "@/error";
import { postType, putPostType } from "@/types/post.types";

export const putPostService = async (
  id: string,
  reqBody: putPostType
): Promise<postType> => {
  const post = await db.post.update({
    where: {
      id: id,
    },
    data: {
      title: reqBody.title,
      description: reqBody.description,
    },
  });
  console.log(post);
  if (!post) {
    throw new AppError("Post notfound", 404);
  }

  return post;
};
