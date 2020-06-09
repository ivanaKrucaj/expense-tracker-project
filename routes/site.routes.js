const express = require("express");
const router = express.Router();
const TransactionModel = require("../models/transaction.model");
const UserModel = require("../models/user.model");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const Chart = require("chart.js");

router.use((req, res, next) => {
  if (req.session.loggedInUser) {
    next();
  } else {
    res.redirect("/signin");
  }
});

// HOME PAGE ------- GET
router.get("/home", (req, res) => {
  console.log(req.query);

  // define queries for filter feature:
  let mongooseQuery = {};
  if (req.query.type) {
    mongooseQuery.type = req.query.type;
  }
  if (req.query.category) {
    mongooseQuery.category = req.query.category;
  }

  // display user(id) transactions on home page:
  TransactionModel.find(mongooseQuery)
    .then((transaction) => {
      // add property to transaction object so we can filter income and expenses by bg color on home page:
      let newTrans = transaction.filter((element) => {
        if (element.type == "expense") {
          element.isExpenseType = true;
        } else {
          element.isExpenseType = false;
        }

        return element.user_id == req.session.loggedInUser._id;
      });
      let reverseTrans = newTrans.reverse();
      // calculate current balance:
      let reduceTrans = reverseTrans.reduce((acc, value) => {
        if (value.type == "income") {
          return acc + value.amount;
        } else {
          return acc - value.amount;
        }
        return acc;
      }, 0);
      const userData = req.session.loggedInUser;
      // Current balance
      const currency = reduceTrans.toLocaleString("de-DE", {
        style: "currency",
        currency: userData.currency,
      });
      const upperCaseName =
        userData.username.slice(0, 1).toUpperCase() +
        userData.username.slice(1);
      // render all created objects into the home page:
      res.render("home.hbs", {
        reverseTrans,
        reduceTrans,
        userData,
        currency,
        upperCaseName,
      });
    })
    .catch((err) => {
      console.log(err);
      res.send("Something went terribly wrong.", err);
    });
});

// CREATE TRANSACTION ---------- GET
router.get("/createTrans", (req, res) => {
  res.render("createTrans.hbs");
});

// CREATE TRANSACTION ---------- POST
router.post("/createTrans", (req, res) => {
  const { type, name, category, amount, date } = req.body;
  // console.log(req.session.loggedInUser);
  TransactionModel.create({
    type: type,
    name: name,
    category: category,
    amount: amount,
    date: date,
    user_id: req.session.loggedInUser._id,
  })
    .then((response) => {
      res.redirect("/home");
    })
    .catch(() => {
      res.render("createTrans.hbs", { showErrorMessage: true });
    });
});

// EDIT TRANSACTION ---------- GET
router.get("/editTrans/:id", (req, res) => {
  let id = req.params.id;
  console.log(id);
  TransactionModel.findById(id)
    .then((transaction) => {
      res.render("editTrans.hbs", { transaction });
    })
    .catch(() => {
      res.send("Something went wrong.");
    });
});

// EDIT TRANSACTION ---------- POST
router.post("/editTrans/:id", (req, res) => {
  let id = req.params.id;
  console.log("The id is", id);

  const { type, name, category, amount, date } = req.body;
  TransactionModel.findByIdAndUpdate(id, {
    $set: { type, name, category, amount, date },
  })
    .then(() => {
      res.redirect("/home");
    })
    .catch(() => {
      res.send("Something went wrong.");
    });
});

//DELETE TRANSACTION ------------ GET:
router.get("/home/delete/:id", (req, res) => {
  TransactionModel.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/home");
    })
    .catch(() => {
      res.send("Something went wrong.");
    });
});

// DIAGRAMS ---------- GET
router.get("/diagrams", (req, res) => {
  TransactionModel.find()
    .then((transaction) => {
      let canvas;
      res.render("diagrams.hbs", { transaction });
    })
    .catch((err) => {
      res.send("No charts for you", err);
    });
});

router.get("/diagramsJson", (req, res) => {
  const userTransactions = req.session.loggedInUser._id;
  TransactionModel.find({ user_id: userTransactions })
    .then((transaction) => {
      res.json({ transaction });
    })
    .catch((err) => {
      res.send("No charts for you", err);
    });
});

module.exports = router;
