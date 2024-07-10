import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";
import { AppError } from "../error";

export const ensureSchema =
  (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) {
      throw new AppError("Body necessary", 400);
    }

    const newSchema = schema.parse(req.body);

    req.body = newSchema;
    next();
  };
