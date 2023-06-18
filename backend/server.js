import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/db.js"
import productRoute from "./routes/productRoute.js"
import userRoute from "./routes/userRoute.js"
import { notFound,errorHandler } from "./middleware/errorMiddleware.js"
import cors from "cors"

dotenv.config()

connectDB()

const app = express()

app.use(cors())
app.use(express.json()); 

app.use("/api/product",productRoute)
app.use("/api/user",userRoute)

app.get("/", (req,res) => {
    res.json("helo")
})

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} on port:${PORT}`)
})