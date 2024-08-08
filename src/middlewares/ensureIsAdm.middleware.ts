import { db } from "@/app";
import { Access_level, User } from "@prisma/client";

import { AppError } from "@/error";

import { userLogin } from "@/types/user.types";

import { NextFunction, Request, Response } from "express";

export const ensureIsAdm = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(res.locals.isAdmin);
  const userBody = res.locals.isAdmin;

  if (res.locals.isAdmin !== Access_level.ADMIN) {
    throw new AppError("Access denied", 403);
  }

  next();
};
