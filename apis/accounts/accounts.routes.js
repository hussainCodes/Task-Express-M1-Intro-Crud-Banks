const express = require("express");
//const accounts = require("./accounts");
const {
  getAllAccounts,
  createAccount,
  deleteAccount,
  updateAccount,
  getAccountByUsername,
} = require("./accounts.controllers");

const accountsRoutes = express();

accountsRoutes.get("/accounts", getAllAccounts);

accountsRoutes.post("/accounts", createAccount);

accountsRoutes.delete("/accounts/:accountId", deleteAccount);

accountsRoutes.put("/accounts/:accountId", updateAccount);

accountsRoutes.get("/accounts/:username", getAccountByUsername);

module.exports = accountsRoutes;
