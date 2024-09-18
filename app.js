const express = require("express");
const app = express();
const connectDB = require("./database");
const accountsRoutes = require("./apis/accounts/accounts.routes");
connectDB();
app.use(express.json());
app.use(accountsRoutes);

app.listen(8000, () => {
  console.log("Hi");
});
