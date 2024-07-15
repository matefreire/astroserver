import { db } from "@/app";
import { Post } from "@prisma/client";

export const getAllPostService = async (): Promise<Post[]> => {
  const posts: Post[] | null = await db.post.findMany({});
  return posts;
};
