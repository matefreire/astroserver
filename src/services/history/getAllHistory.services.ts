import { db } from "@/app";

// export const getAllHistoryService = async (): Promise<any> => {
//   const posts = await db.postHistory.findMany({
//     select: {
//       id: true,
//       title: true,
//       description: true,
//       picture: true,
//       userId: true,
//       createdAt: true,
//       comments: {
//         select: {
//           id: true,
//           description: true,
//           user: true,
//           createdAt: true,
//         },
//       },
//     },
//     orderBy: {
//       createdAt: "desc",
//     },
//   });
//   return posts;
// };

export const getAllHistoryService = async (): Promise<any> => {
  const posts = await db.$queryRaw`
    SELECT 
      ph.id,
      ph.title,
      ph.description,
      ph.picture,
      ph."userId",
      ph."createdAt",
      (
        SELECT json_agg(
          json_build_object(
            'id', c.id,
            'description', c.description,
            'user', json_build_object(
              'id', uc.id,
              'name', uc.name
            ),
            'createdAt', c."createdAt"
          )
        )
        FROM "Comment" c
        JOIN "User" uc ON uc.id = c."userId"
        WHERE c."postId" = ph.id
      ) as comments
    FROM 
      "PostHistory" ph
    ORDER BY 
      ph."createdAt" DESC;
  `;

  return posts;
};
