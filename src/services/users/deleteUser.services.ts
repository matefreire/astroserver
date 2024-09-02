import { db } from "@/app";

// const deleteUserService = async(id:string): Promise<void> => {

//     await db.user.delete({
//         where: {
//             id:id
//         }
//     })

// }

// export {deleteUserService}

const deleteUserService = async (id: string): Promise<void> => {
  await db.$queryRaw`
      DELETE FROM "User"
      WHERE "id" = ${id};
    `;
};

export { deleteUserService };
