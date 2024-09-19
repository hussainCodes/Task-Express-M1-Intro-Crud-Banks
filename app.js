const express = require("express");
const app = express();
const connectDB = require("./database");
const accountsRoutes = require("./apis/accounts/accounts.routes");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
connectDB();
app.use(express.json());
app.use(accountsRoutes);

app.listen(PORT, () => {
  console.log("Hi");
});
