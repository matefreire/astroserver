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
