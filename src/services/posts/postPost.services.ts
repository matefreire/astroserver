import { db } from "@/app";
import { AppError } from "@/error";
import { postRegisterType, postType } from "@/types/post.types";
import { Access_level, Type_post_enum, User } from "@prisma/client";

// export const postPostService = async (
//   post: postRegisterType
// ): Promise<postType> => {
//   let isPostAceppted = false;
//   const user: User | null = await db.user.findUnique({
//     where: {
//       id: post.userId,
//     },
//   });

//   if (!user) {
//     throw new AppError("User notfound", 404);
//   }

//   if (user.access_level == Access_level.ADMIN) {
//     isPostAceppted = true;
//   }

//   const newPost = await db.post.create({
//     data: {
//       title: post.title,
//       description: post.description,
//       userId: post.userId,
//       post_type: post.post_type ?? Type_post_enum.POST,
//       picture: post.picture,
//       is_accepted: isPostAceppted,
//     },
//   });

//   return newPost;
// };

export const postPostService = async (
  post: postRegisterType
): Promise<postType> => {
  let isPostAccepted = false;

  // Verifique se o usuário existe
  const user = await db.$queryRaw<User[]>`
    SELECT * FROM "User" WHERE "id" = ${post.userId} LIMIT 1;
  `;

  if (!user || user.length === 0) {
    throw new AppError("User not found", 404);
  }

  // Verifique o nível de acesso do usuário
  if (user[0].access_level === Access_level.ADMIN) {
    isPostAccepted = true;
  }
  console.log(post, "post");
  // Insira o novo post na base de dados
  const newPost = await db.$queryRaw<postType[]>`
    INSERT INTO "Post" (
      "id", 
      "title", 
      "description", 
      "userId", 
      "post_type", 
      "is_accepted"
    ) VALUES (
      gen_random_uuid(),
      ${post.title}, 
      ${post.description}, 
      ${post.userId}, 
      ${post.post_type ?? Type_post_enum.POST}::"Type_post_enum", 
      ${isPostAccepted ?? false}::boolean
    ) RETURNING *;
  `;

  // Retorne o primeiro resultado do array (o post criado)
  return newPost[0];
};
