import express from "express"

import { PrismaClient } from "@prisma/client"
import { userRoute } from "./routes/user.route"

// import { handleError } from "./error"
// import "express-async-errors"

export const db = new PrismaClient()

const app = express()

app.use(express.json())

app.use('/users', userRoute)

// app.use(handleError)

export default app