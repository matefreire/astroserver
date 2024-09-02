import { db } from "@/app";
import { AppError } from "@/error";
import { userRegisterResponseSchema } from "@/schemas/user.schemas";
import { userRegister, userRegisterResponse } from "@/types/user.types";
import { hashPassword } from "@/utils/bcrypt";
import { Access_level, User } from "@prisma/client";

// const postUserService = async (reqBody: userRegister): Promise<userRegisterResponse> => {

//     const hashedPassword = await hashPassword(reqBody.password);

//     const emailUnique = await db.user.findUnique({
//         where: {
//             email: reqBody.email
//         }
//     })

//     if(emailUnique){
//         throw new AppError("Email already exists", 409)
//     }

//     const newUser = await db.user.create({
//         data: {
//             ...reqBody,
//             password: hashedPassword
//         }
//     })

//     const userWithoutPassword = userRegisterResponseSchema.parse(newUser)

//     return userWithoutPassword
// }

export const postUserService = async (
  reqBody: userRegister
): Promise<userRegisterResponse> => {
  const hashedPassword = await hashPassword(reqBody.password);

  const emailExists = await db.$queryRaw<User[]>`
    SELECT * FROM "User" WHERE "email" = ${reqBody.email} LIMIT 1;
  `;

  if (emailExists.length > 0) {
    throw new AppError("Email already exists", 409);
  }

  const newUserArray = await db.$queryRaw<User[]>`
    INSERT INTO "User" ("id", "name", "email", "password", "access_level", "createdAt")
    VALUES (gen_random_uuid(), ${reqBody.name}, ${
    reqBody.email
  }, ${hashedPassword},
    ${"USER"}::"Access_level", NOW())
    RETURNING *;
  `;
  const newUser = newUserArray[0];

  const userWithoutPassword = userRegisterResponseSchema.parse(newUser);

  return userWithoutPassword;
};

export default postUserService;
