
import express, { Request, Response } from "express"
import { userRoutes } from "./app/modules/user/user.route"
import cors from "cors"

import { notFound } from "./app/middlewares/notFound"
import { AuthRoutes } from "./app/modules/auth/auth.route"
import cookieParser from "cookie-parser"
import { globalErrorHandler } from "./app/middlewares/globalErrorhandler"

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(cors())


app.use("/api/v1/user",userRoutes)
app.use("/api/v1/auth",AuthRoutes)

app.get("/",(req:Request, res:Response)=>{
   res.send("welcome to parcel delivery backend")
})


app.use(globalErrorHandler)
app.use(notFound)

export default app