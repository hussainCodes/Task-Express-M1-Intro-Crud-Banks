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

app.delete("/accounts/:accountId", (request, response) => {
  const accountId = request.params.accountId;
  const wantedAccount = accounts.find((account) => account.id == accountId);

  if (!wantedAccount) {
    return response.status(404).json({ error: "account not found" });
  }

  const newAccounts = accounts.filter((account) =>
    account.id == accountId ? false : true
  );
  return response.status(200).json({ data: newAccounts });
});

app.put("/accounts/:accountId", (request, response) => {
  const accountId = request.params.accountId;
  const wantedAccount = accounts.find((account) => account.id == accountId);
  if (!wantedAccount) {
    return response.status(404).json({ error: "account not found" });
  }

  wantedAccount.username = request.body.username;

  return response.status(200).json({ data: wantedAccount });
});

app.get("/accounts/:username", (request, response) => {
  const name = request.params.username;
  const currency = request.query.currency;
  const wantedAccount = accounts.find((account) => account.username == name);
  if (currency) {
    changedCurrency = wantedAccount.funds * 3.2;
    wantedAccount.funds = changedCurrency;
  }

  return response.status(200).json({ data: wantedAccount });
});

app.listen(8000, () => {
  console.log("Hi");
});
