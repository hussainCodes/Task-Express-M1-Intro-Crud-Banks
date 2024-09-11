const express = require("express");
const accounts = require("./accounts");
const app = express();

app.use(express.json());

app.get("/accounts", (req, res) => {
  return res.status(200).json(accounts);
});

app.post("/accounts", (req, res) => {
  console.log(req.body);
  const id = accounts.length + 1;
  const newAccount = {
    id: id,
    username: req.body.username,
    funds: req.body.funds,
  };
  accounts.push(newAccount);
  res.status(201).json({
    message: "Added account",
    data: accounts,
  });
});

app.listen(8000, () => {
  console.log("Hi");
});
