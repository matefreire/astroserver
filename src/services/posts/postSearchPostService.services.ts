import { db } from "@/app";

export const postSearchPostService = async (posts: string) => {
  return await db.post.findMany({
    where: {
      OR: [
        {
          title: {
            contains: posts,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: posts,
            mode: "insensitive",
          },
        },
      ],
    },
  });
};
