import "express-async-errors";
import express from "express";

import cors from "cors";

import { PrismaClient } from "@prisma/client";
import { userRoute } from "./routes/user.route";

import { handleError } from "./error";
import { postRoute } from "./routes/post.route";
import { adminRoute } from "./routes/admin.route";

export const db = new PrismaClient();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/users", userRoute);
app.use("/posts", postRoute);
app.use("/admin", adminRoute);

app.use(handleError);

export default app;
