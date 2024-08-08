import { db } from "@/app";
import { Post } from "@prisma/client";

export const getAllPostService = async (): Promise<Post[]> => {
  const posts: Post[] = await db.post.findMany({
    where: {
      is_accepted: true,
    },
    select: {
      id: true,
      title: true,
      description: true,
      is_accepted: true,
      picture: true,
      post_type: true,
      userId: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          name: true,
        },
      }, // Inclua user se você precisar dessas informações também
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return posts;
};
