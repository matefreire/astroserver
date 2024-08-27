import { db } from "@/app";
import { AppError } from "@/error";
import { postRegisterType, postType } from "@/types/post.types";
import { Access_level, Type_post_enum, User } from "@prisma/client";

export const postPostService = async (
  post: postRegisterType
): Promise<postType> => {
  let isPostAceppted = false;
  const user: User | null = await db.user.findUnique({
    where: {
      id: post.userId,
    },
  });

  if (!user) {
    throw new AppError("User notfound", 404);
  }

  if (user.access_level == Access_level.ADMIN) {
    isPostAceppted = true;
  }

  const newPost = await db.post.create({
    data: {
      title: post.title,
      description: post.description,
      userId: post.userId,
      post_type: post.post_type ?? Type_post_enum.POST,
      picture: post.picture,
      is_accepted: isPostAceppted,
    },
  });

  return newPost;
};

// export const postPostService = async (
//   post: postRegisterType
// ): Promise<postType> => {
//   let isPostAccepted = false;

//   const user: User | null = await db.$queryRaw<User>`
//     SELECT * FROM "User" WHERE "id" = ${post.userId} LIMIT 1;
//   `;

//   if (!user) {
//     throw new AppError("User not found", 404);
//   }

//   if (user.access_level === Access_level.ADMIN) {
//     isPostAccepted = true;
//   }

//   const newPost = await db.$queryRaw<postType[]>`
//     INSERT INTO "Post" (
//       "title",
//       "description",
//       "userId",
//       "post_type",
//       "picture",
//       "is_accepted"
//     ) VALUES (
//       ${post.title},
//       ${post.description},
//       ${post.userId},
//       ${
//         post.post_type ?? Type_post_enum.POST
//       }::"Type_post_enum", -- Conversão do tipo enum
//       ${post.picture},
//       ${isPostAccepted}
//     ) RETURNING *;
//   `;

//   return newPost[0];
// };
