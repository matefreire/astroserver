// import "express-async-errors"
import express from "express"
// import { handleError } from "./error"
import { PrismaClient } from "@prisma/client"

export const db = new PrismaClient()

const app = express()

const port = process.env.PORT ? Number(process.env.PORT) : 3000
app.use(express.json())

app.listen(port,  ()=> {
        console.log("server inicialized, port:", port)
    }
)
// app.use('/users', userRoute)
// app.use('/login', loginRoute)
// app.use('/categories', categoriesRoute)
// app.use('/realEstate', realEstateRoute)
// app.use('/schedules', schedulesRoute)

// app.use(handleError)

export default app