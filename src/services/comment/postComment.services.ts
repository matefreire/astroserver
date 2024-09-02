import { db } from "@/app";
import { CommentType } from "@/types/model.types";
import { Comment } from "@prisma/client";

// export const postCommentService = async (
//   commentData: CommentType
// ): Promise<Comment> => {
//   const comment: Comment = await db.comment.create({
//     data: {
//       postId: commentData.postId,
//       description: commentData.description,
//       userId: commentData.userId,
//     },
//   });
//   return comment;
// };

export const postCommentService = async (
  commentData: CommentType
): Promise<Comment> => {
  const comment: Comment[] = await db.$queryRaw<Comment[]>`
    INSERT INTO "Comment" ("id","postId", "description", "userId")
    VALUES (gen_random_uuid(),${commentData.postId}, ${commentData.description}, ${commentData.userId})
    RETURNING *;
  `;

  // Retorna o primeiro (e único) comentário criado
  return comment[0];
};
