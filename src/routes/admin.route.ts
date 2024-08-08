import { getAllPostsToAproveController } from "@/controllers/admin.controllers";
import { ensureIsAdm } from "@/middlewares/ensureIsAdm.middleware";
import { ensureUserToken } from "@/middlewares/ensureUserToken.middleware";
import { Router } from "express";

export const adminRoute: Router = Router();

adminRoute.get(
  "/",
  ensureUserToken,
  ensureIsAdm,
  getAllPostsToAproveController
);
