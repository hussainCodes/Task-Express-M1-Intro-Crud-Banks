const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("mongo is connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
