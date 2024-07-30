import {
  postRegisterSchema,
  postSchema,
  putPostSchema,
} from "@/schemas/post.schema";
import { z } from "zod";

export type postType = z.infer<typeof postSchema>;
export type postRegisterType = z.infer<typeof postRegisterSchema>;
export type putPostType = z.infer<typeof putPostSchema>;
