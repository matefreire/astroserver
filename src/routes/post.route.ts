import {
  deletePostController,
  getAllPostController,
  getPostByIdController,
  postPostController,
  putPostController,
} from "@/controllers/post.controllers";
import { ensureBodyExists } from "@/middlewares/ensureBodyExists.middleware";
import { ensureSchema } from "@/middlewares/ensureSchema.middleware";
import { ensureUserToken } from "@/middlewares/ensureUserToken.middleware";
import {
  postRegisterSchema,
  putAcceptPostSchema,
  putPostSchema,
} from "@/schemas/post.schema";
import { Router } from "express";

export const postRoute: Router = Router();

postRoute.get("/:id", ensureUserToken, getPostByIdController);

postRoute.get("/", ensureUserToken, getAllPostController);

postRoute.post(
  "/",
  ensureUserToken,
  ensureBodyExists,
  ensureSchema(postRegisterSchema),
  postPostController
);

postRoute.put(
  "/:id",
  ensureUserToken,
  ensureBodyExists,
  ensureSchema(putPostSchema),
  putPostController
);

postRoute.put(
  "/accept/:id",
  ensureUserToken,
  ensureBodyExists,
  ensureSchema(putAcceptPostSchema),
  putPostController
);
postRoute.delete("/:id", ensureUserToken, deletePostController);
