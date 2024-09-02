import { db } from "@/app";
import { AppError } from "@/error";
import { userWithoutPasswordSchema } from "@/schemas/user.schemas";
import { userWithoutPassword } from "@/types/user.types";
import { User } from "@prisma/client";

// const getAllUsersService = async():Promise<userWithoutPassword[]> => {

//     const users: User[] | null = await db.user.findMany()

//     if(!users){
//         throw new AppError('Users not found', 400)
//     }

//     const usersWithoutPassword = users.map(user => userWithoutPasswordSchema.parse(user))

//     return usersWithoutPassword
// }

// export {getAllUsersService}

const getAllUsersService = async (): Promise<userWithoutPassword[]> => {
  const users = await db.$queryRaw<User[]>`
      SELECT * FROM "User";
    `;

  if (!users || users.length === 0) {
    throw new AppError("Users not found", 400);
  }

  const usersWithoutPassword = users.map((user) =>
    userWithoutPasswordSchema.parse(user)
  );

  return usersWithoutPassword;
};

export { getAllUsersService };
