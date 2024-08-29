import { db } from "@/app";

// export const putAcceptPostService = async (id: string) => {
//   await db.post.update({
//     where: {
//       id: id,
//     },
//     data: {
//       is_accepted: true,
//     },
//   });
// };

export const putAcceptPostService = async (id: string) => {
  await db.$executeRaw`
    UPDATE "Post"
    SET is_accepted = true 
    WHERE id = ${id}
  `;
};
