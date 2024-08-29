import { db } from "@/app";

import { AppError } from "@/error";

import { userLogin } from "@/types/user.types";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// export const loginUserService = async (reqBody: userLogin): Promise<string> => {
//   const user = await db.user.findUnique({
//     where: {
//       email: reqBody.email,
//     },
//   });

//   if (!user) {
//     throw new AppError("Wrong e-mail/password", 400);
//   }

//   const unHashedPassword = await bcrypt.compare(
//     reqBody.password,
//     user.password
//   );
//   if (!unHashedPassword) {
//     throw new AppError("Wrong e-mail/password", 400);
//   }
//   const token = jwt.sign(
//     {
//       isAdmin: user.access_level,
//     },
//     process.env.SECRET_KEY!,
//     {
//       expiresIn: "1d",
//       subject: String(user.email),
//     }
//   );

//   return token;
// };

export const loginUserService = async (reqBody: userLogin): Promise<string> => {
  // Query raw para buscar o usuário pelo email
  const users = await db.$queryRaw<
    { password: string; access_level: string; email: string }[]
  >`
    SELECT "password", "access_level", "email"
    FROM "User"
    WHERE "email" = ${reqBody.email}
    LIMIT 1;
  `;

  const user = users[0];

  if (!user) {
    throw new AppError("Wrong e-mail/password", 400);
  }

  // Comparação da senha fornecida com a senha hash armazenada
  const unHashedPassword = await bcrypt.compare(
    reqBody.password,
    user.password
  );

  if (!unHashedPassword) {
    throw new AppError("Wrong e-mail/password", 400);
  }

  // Geração do token JWT
  const token = jwt.sign(
    {
      isAdmin: user.access_level,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: "1d",
      subject: String(user.email),
    }
  );

  return token;
};
