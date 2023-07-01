import mongoose from "mongoose";

const MONGO_URI = "mongodb+srv://cluster0.u6eobom.mongodb.net/";
const DB_NAME = "sagnik-shop";
const USERNAME = "sagnik";
const PASSWORD = "sagnik";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      dbName: DB_NAME,
      user: USERNAME,
      pass: PASSWORD,
    });
    console.log("MongoDB is successfully connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
