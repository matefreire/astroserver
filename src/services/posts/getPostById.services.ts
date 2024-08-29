import { db } from "@/app";
import { AppError } from "@/error";
import { postType } from "@/types/post.types";

// export const getPostByIdService = async (id: string): Promise<postType> => {
//   const post = await db.post.findUnique({
//     where: {
//       id: id,
//     },
//   });

//   if (!post) {
//     throw new AppError("Post notfound", 404);
//   }

//   return post;
// };

export const getPostByIdService = async (id: string): Promise<postType> => {
  const post = await db.$queryRaw<postType>`
    SELECT * 
    FROM Post 
    WHERE id = ${id}
  `;

  if (!post) {
    throw new AppError("Post not found", 404);
  }

  return post;
};
