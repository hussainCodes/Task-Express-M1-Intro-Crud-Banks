const AccountSchema = require("../../models/AccountSchema");
//const { request } = require("./accounts.routes");
// const accounts = require("../../accounts");
// const getAllAccounts = (req, res) => {
//   return res.status(200).json(accounts);
// };

const getAllAccounts = async (req, res) => {
  try {
    const vip = req.query.vip;
    const accounts = await AccountSchema.find();
    if (vip) {
      const vipAccounts = await AccountSchema.find({
        funds: { $gte: vip },
      }).exec();
      return res.status(200).json({ data: vipAccounts });
    } else {
      return res.status(200).json({ data: accounts });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

// const createAccount = (req, res) => {
//   console.log(req.body);
//   const id = accounts.length + 1;
//   const newAccount = {
//     id: id,
//     username: req.body.username,
//     funds: req.body.funds,
//   };
//   accounts.push(newAccount);
//   res.status(201).json({
//     message: "Added account",
//     data: accounts,
//   });
// };

const createAccount = async (req, res) => {
  try {
    const account = req.body;
    const newAccount = await AccountSchema.create(account);
    return res.status(201).json({ data: newAccount });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

// const deleteAccount = (request, response) => {
//   const accountId = request.params.accountId;
//   const wantedAccount = accounts.find((account) => account.id == accountId);

//   if (!wantedAccount) {
//     return response.status(404).json({ error: "account not found" });
//   }

//   const newAccounts = accounts.filter((account) =>
//     account.id == accountId ? false : true
//   );
//   return response.status(200).json({ data: newAccounts });
// };

const deleteAccount = async (request, response) => {
  try {
    const accountId = request.params.accountId;
    const foundAccount = await AccountSchema.findById(accountId);
    if (foundAccount) {
      await foundAccount.deleteOne();
      return response.status(204).json({ message: "account deleted!" });
    } else {
      return response
        .status(404)
        .json({ message: "The account does not exist!" });
    }
  } catch (error) {
    return response.status(500).json({ error: error });
  }
};

// const updateAccount = (request, response) => {
//   const accountId = request.params.accountId;
//   const wantedAccount = accounts.find((account) => account.id == accountId);
//   if (!wantedAccount) {
//     return response.status(404).json({ error: "account not found" });
//   }
//   wantedAccount.username = request.body.username;
//   return response.status(200).json({ data: wantedAccount });
// };

const updateAccount = async (request, response) => {
  try {
    const accountId = request.params.accountId;
    const foundAccount = await AccountSchema.findById(accountId);
    if (foundAccount) {
      await foundAccount.updateOne(
        { username: request.body.username },
        { funds: request.body.funds }
      );
      return response.status(204).json({ data: foundAccount });
    } else {
      return response
        .status(404)
        .json({ message: "The account does not exist!" });
    }
  } catch (error) {
    return response.status(500).json({ error: error });
  }
};

const getAccountByUsername = (request, response) => {
  const name = request.params.username;
  const currency = request.query.currency;
  const wantedAccount = accounts.find((account) => account.username == name);
  if (currency) {
    changedCurrency = wantedAccount.funds * 3.2;
    wantedAccount.funds = changedCurrency;
  }
  return response.status(200).json({ data: wantedAccount });
};

module.exports = {
  getAllAccounts,
  createAccount,
  deleteAccount,
  updateAccount,
  getAccountByUsername,
};
