import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/db.js"
import {products} from "./products.js"
import productRoute from "./routes/productRoute.js"
import cors from "cors"

dotenv.config()

connectDB()

const app = express()

app.use(cors())

app.use("/api/product",productRoute)

app.get("/", (req,res) => {
    res.json("helo")
})

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} on port:${PORT}`)
})