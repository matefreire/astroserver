import { db } from "@/app";
import { Post } from "@prisma/client";

// export const getAllPostService = async (): Promise<Post[]> => {
//   const posts: Post[] = await db.post.findMany({
//     where: {
//       is_accepted: true,
//     },
//     select: {
//       id: true,
//       title: true,
//       description: true,
//       is_accepted: true,
//       picture: true,
//       post_type: true,
//       userId: true,
//       createdAt: true,
//       user: {
//         select: {
//           id: true,
//           name: true,
//         },
//       },
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

export const getAllPostService = async (): Promise<Post[]> => {
  const posts: Post[] = await db.$queryRaw<Post[]>`
    SELECT 
      p.id,
      p.title,
      p.description,
      p.is_accepted,
      p.picture,
      p.post_type,
      p."userId",
      p."createdAt",
      json_build_object(
        'id', u.id,
        'name', u.name
      ) as user,
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
        WHERE c."postId" = p.id
      ) as comments
    FROM "Post" p
    JOIN "User" u ON u.id = p."userId"
    WHERE p.is_accepted = true
    ORDER BY p."createdAt" DESC;
  `;

  return posts;
};
