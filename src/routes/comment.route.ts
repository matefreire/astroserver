import { postCommentController } from "@/controllers/comment.controllers";
import { ensureBodyExists } from "@/middlewares/ensureBodyExists.middleware";
import { ensureSchema } from "@/middlewares/ensureSchema.middleware";
import { ensureUserToken } from "@/middlewares/ensureUserToken.middleware";
import { commentSchemaRequest } from "@/schemas/comment.schema";
import { Router } from "express";

export const commentRoute: Router = Router();

commentRoute.post(
  "/",
  ensureUserToken,
  ensureBodyExists,
  ensureSchema(commentSchemaRequest),
  postCommentController
);
