const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(
      "mongodb+srv://hussainalhaddad777:wsW5gjQgIdD7ASaI@fullstack24.lu9y2.mongodb.net/"
    );
    console.log("mongo is connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
