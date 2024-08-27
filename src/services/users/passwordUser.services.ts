import { db } from "@/app";
import { AppError } from "@/error";
import { userPassword } from "@/types/user.types";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
export const passwordUserService = async (
  data: userPassword
): Promise<void> => {
  const user: User | null = await db.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    throw new AppError("Usuário não encontrado", 404);
  }

  const password = await bcrypt.hash(data.password, 8);

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: password,
    },
  });
};
