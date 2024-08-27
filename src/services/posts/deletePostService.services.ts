import { db } from "@/app";

// export const deletePostService = async (id: string): Promise<void> => {
//   await db.post.delete({
//     where: {
//       id: id,
//     },
//   });
// };

export const deletePostService = async (id: string): Promise<void> => {
  await db.$executeRaw`
    DELETE FROM "Post"
    WHERE "id" = ${id};
  `;
};
