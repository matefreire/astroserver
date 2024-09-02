import { db } from "@/app";
import { AppError } from "@/error";
import { postType, putPostType } from "@/types/post.types";

// export const putHistoryService = async (id: string, reqBody: putPostType) => {
//   const history = await db.postHistory.update({
//     where: {
//       id: id,
//     },
//     data: {
//       title: reqBody.title,
//       description: reqBody.description,
//     },
//   });
//   if (!history) {
//     throw new AppError("Post notfound", 404);
//   }

//   return history;
// };

export const putHistoryService = async (id: string, reqBody: any) => {
  const history: any = await db.$queryRaw`
    UPDATE "PostHistory"
    SET "title" = ${reqBody.title},
        "description" = ${reqBody.description}
    WHERE "id" = ${id}
    RETURNING *;
  `;

  if (!history || history.length === 0) {
    throw new AppError("History not found", 404);
  }

  return history[0];
};
