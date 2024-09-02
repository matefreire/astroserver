import { db } from "@/app";

// export const deleteHistoryService = async (id: string): Promise<void> => {
//   await db.postHistory.delete({
//     where: {
//       id: id,
//     },
//   });
// };

export const deleteHistoryService = async (id: string): Promise<void> => {
  await db.$executeRaw`
    DELETE FROM "PostHistory"
    WHERE "id" = ${id};
  `;
};
