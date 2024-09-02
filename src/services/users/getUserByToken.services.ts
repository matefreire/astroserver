import { db } from "@/app";
import { AppError } from "@/error";
import { userWithoutPasswordSchema } from "@/schemas/user.schemas";
import { userWithoutPassword } from "@/types/user.types";
import { User } from "@prisma/client";

// export const getUserByTokenService = async (
//   email: string
// ): Promise<userWithoutPassword> => {
//   const user: User | null = await db.user.findUnique({
//     where: {
//       email: email,
//     },
//   });

//   const userWithoutPassword = userWithoutPasswordSchema.parse(user);

//   return userWithoutPassword;
// };

export const getUserByTokenService = async (
  email: string
): Promise<userWithoutPassword> => {
  const users: User[] = await db.$queryRaw<User[]>`
    SELECT * FROM "User" WHERE "email" = ${email} LIMIT 1;
  `;

  const user = users.length > 0 ? users[0] : null;

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const userWithoutPassword = userWithoutPasswordSchema.parse(user);

  return userWithoutPassword;
};
