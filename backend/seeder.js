import mongoose from "mongoose"
import connectDB from "./db/db.js"
import dotenv from "dotenv"
import Product from "./Models/productModel.js"
import User from "./Models/userModel.js"
import Order from "./Models/OrderModel.js"
import { products } from "./products.js"
import users from "./user.js"

dotenv.config()

connectDB()

const importdata = async() => {
    try {
    await Product.deleteMany()
    await Order.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)

    const adminUser = createdUsers[0]._id

    const sampleProducts = products.map((product) => {
        return { ...product, user: adminUser }
    })

    await Product.insertMany(sampleProducts)

    console.log("Data Successfully Imported")
    process.exit()
    } catch (error) {
    
    console.error(`${error}`)
    process.exit(1)
    }
}

const deletedata = async() => {
   try {
    await Product.deleteMany()
    await User.deleteMany()
    await Order.deleteMany()

    console.log("Data successfully deleted")
    process.exit()

   } catch (error) {
    console.log(`${error}`)
    process.exit(1)
   }
}

if(process.argv[2] === "-d"){
    deletedata()
}else{
    importdata()
}