import { db } from "@/app";
import { AppError } from "@/error";
import { User } from "@prisma/client";

// export const postHistoryService = async (history: any): Promise<any> => {
//   const user: User | null = await db.user.findUnique({
//     where: {
//       id: history.userId,
//     },
//   });

//   if (!user) {
//     throw new AppError("User notfound", 404);
//   }

//   const newPost = await db.postHistory.create({
//     data: {
//       title: history.title,
//       description: history.description,
//       userId: history.userId,
//       picture: history.picture,
//     },
//   });

//   return newPost;
// };

export const postHistoryService = async (history: any): Promise<any> => {
  const userExists: any = await db.$queryRaw`
    SELECT EXISTS(
      SELECT 1 
      FROM "User" 
      WHERE id = ${history.userId}
    );
  `;

  if (!userExists[0].exists) {
    throw new AppError("User not found", 404);
  }

  // Cria um novo post no histórico
  const newPost: any = await db.$queryRaw`
    INSERT INTO "PostHistory" ("id",title, description, "userId", picture)
    VALUES (gen_random_uuid(), ${history.title}, ${history.description}, ${history.userId}, ${history.picture})
    RETURNING *;
  `;
  return newPost[0];
};
