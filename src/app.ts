import "express-async-errors"
import express from "express"

import cors from 'cors'

import { PrismaClient } from "@prisma/client"
import { userRoute } from "./routes/user.route"

import { handleError } from "./error"

export const db = new PrismaClient()

const app = express()

app.use(cors())

app.use(express.json())

app.use('/users', userRoute)

app.use(handleError)

export default app