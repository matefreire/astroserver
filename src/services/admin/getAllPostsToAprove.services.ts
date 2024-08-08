import { db } from "@/app";
import { PostType } from "@/types/model.types";

export const getAllPostsToAproveService = async (): Promise<
  PostType[] | null
> => {
  return await db.post.findMany({
    where: {
      is_accepted: false,
    },
    include: {
      user: true,
    },
  });
};
