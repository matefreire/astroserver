import { db } from "@/app";
import { AppError } from "@/error";
import { userWithoutPasswordSchema } from "@/schemas/user.schemas";
import { userWithoutPassword } from "@/types/user.types";
import { User } from "@prisma/client";

// const putUserService = async(id: string, user: Partial<User>):Promise<userWithoutPassword> => {

//     const newUser: User | null = await db.user.update({
//         where: {
//             id: id
//         },
//         data: user
//     })

//     const userWithoutPassword: userWithoutPassword = userWithoutPasswordSchema.parse(newUser)

//     return userWithoutPassword
// }

export const putUserService = async (
  id: string,
  user: Partial<User>
): Promise<userWithoutPassword> => {
  const userUp = await db.$queryRaw<User[]>`
    UPDATE "User"
    SET "name" = ${user.name},
        "email" = ${user.email}
    WHERE "id" = ${id} 
    RETURNING *;
  `;

  if (!userUp || userUp.length === 0) {
    throw new AppError("User not found", 404);
  }

  const userWithoutPassword = userWithoutPasswordSchema.parse(userUp[0]);

  return userWithoutPassword;
};
