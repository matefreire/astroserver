import { db } from "@/app";
import { AppError } from "@/error";
import { postType, putPostType } from "@/types/post.types";

// export const putPostService = async (
//   id: string,
//   reqBody: putPostType
// ): Promise<postType> => {
//   const post = await db.post.update({
//     where: {
//       id: id,
//     },
//     data: {
//       title: reqBody.title,
//       description: reqBody.description,
//     },
//   });
//   if (!post) {
//     throw new AppError("Post notfound", 404);
//   }

//   return post;
// };

export const putPostService = async (
  id: string,
  reqBody: putPostType
): Promise<postType> => {
  const post = await db.$queryRaw<postType[]>`
    UPDATE "Post"
    SET "title" = ${reqBody.title},
        "description" = ${reqBody.description}
    WHERE "id" = ${id} 
    RETURNING *;
  `;

  if (!post || post.length === 0) {
    throw new AppError("Post not found", 404);
  }

  return post[0];
};
