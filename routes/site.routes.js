const express = require("express");
const router = express.Router();
const TransactionModel = require("../models/transaction.model");
const UserModel = require("../models/user.model");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const Chart = require("chart.js");

// protected sites middleware
router.use((req, res, next) => {
  if (req.session.passport) {
    req.session.loggedInUser = req.session.passport.user;
  }
  if (req.session.loggedInUser) {
    next();
  } else {
    res.redirect("/signin");
  }
});

// logout middleware, connected whith "destroys session"
router.use(function (req, res, next) {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  next();
});

// HOME PAGE ------- GET
router.get("/home", (req, res) => {
  //This defines queries for filter feature:
  let mongooseQuery = {};
  if (req.query.type) {
    mongooseQuery.type = req.query.type;
  }
  if (req.query.category) {
    mongooseQuery.category = req.query.category;
  }

  // displays user(id) transactions on home page:
  TransactionModel.find(mongooseQuery)
    .then((transaction) => {

      // adds property to transaction object so we can filter income and expenses by bg color on home page:
      let newTrans = transaction.filter((element) => {
        if (element.type == "expense") {
          element.isExpenseType = true;
        } else {
          element.isExpenseType = false;
        }
        return element.user_id == req.session.loggedInUser._id;
      });
      // this displays the transactions by the earliest created in home page
      let reverseTrans = newTrans.reverse();
      // this calculates current balance:
      let reduceTrans = reverseTrans.reduce((acc, value) => {
        if (value.type == "income") {
          return acc + value.amount;
        } else {
          return acc - value.amount;
        }
        return acc;
      }, 0);
      const userData = req.session.loggedInUser;
      // this displays current balance with currency and the coma:
      const currency = reduceTrans.toLocaleString("de-DE", {
        style: "currency",
        currency: userData.currency,
      });
      // Greeting name uppercased:
      const upperCaseName =
        userData.username.slice(0, 1).toUpperCase() +
        userData.username.slice(1);
      // this formats the date in a nice way
      const transactionsToDisplay = reverseTrans.map((tr) => {
        if (tr.date) {
          tr.formattedDate = tr.date.toLocaleString("en-GB", {
            month: "long", // "June"
            day: "2-digit", // "01"
            year: "numeric", // "2019"
          });
        }

        return tr;
      });
      // renders all created objects into the home page:
      res.render("home.hbs", {
        transactionsToDisplay,
        reduceTrans,
        userData,
        currency,
        upperCaseName,
      });
    })
    .catch((err) => {
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
  TransactionModel.findById(id)
    .then((transaction) => {
      let isSelected = (type, expectedType) => {
        if (type === expectedType) {
          return "selected";
        } else {
          return "";
        }
      };
      const transactionTypes = [
        {
          type: "income",
          name: "Income",
          selected: isSelected(transaction.type, "income"),
        },
        {
          type: "expense",
          name: "Expense",
          selected: isSelected(transaction.type, "expense"),
        },
      ];

      const transactionCategories = [
        {
          category: "food",
          name: "Food",
          selected: isSelected(transaction.category, "food"),
        },
        {
          category: "transport",
          name: "Transport",
          selected: isSelected(transaction.category, "transport"),
        },
        {
          category: "accommodation",
          name: "Accommodation",
          selected: isSelected(transaction.category, "accommodation"),
        },
        {
          category: "salary",
          name: "Salary",
          selected: isSelected(transaction.category, "salary"),
        },
        {
          category: "travel",
          name: "Travel",
          selected: isSelected(transaction.category, "travel"),
        },
        {
          category: "bills",
          name: "Bills",
          selected: isSelected(transaction.category, "bills"),
        },
        {
          category: "entertainment",
          name: "Entertainment",
          selected: isSelected(transaction.category, "entertainment"),
        },
        {
          category: "clothing",
          name: "Clothing",
          selected: isSelected(transaction.category, "clothing"),
        },
        {
          category: "education",
          name: "Education",
          selected: isSelected(transaction.category, "education"),
        },
        {
          category: "healthcare",
          name: "Healthcare",
          selected: isSelected(transaction.category, "healthcare"),
        },
        {
          category: "other",
          name: "Other",
          selected: isSelected(transaction.category, "other"),
        },
      ];

      // populate date:
      const formattedDate = transaction.date.toISOString().substring(0, 10);

      res.render("editTrans.hbs", {
        transactionTypes,
        transaction,
        formattedDate,
        transactionCategories,
      });
    })
    .catch(() => {
      res.send("Something went wrong.");
    });
});

// EDIT TRANSACTION ---------- POST
router.post("/editTrans/:id", (req, res) => {
  let id = req.params.id;

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
      res.redirect('/error')
      // res.send("No charts for you", err);
    });
});

router.get("/diagramsJson", (req, res) => {
  const userTransactions = req.session.loggedInUser._id;
  TransactionModel.find({ user_id: userTransactions })
    .then((transaction) => {
      res.json({ transaction });
    })
    .catch((err) => {
      res.redirect('/error')
      // res.send("No charts for you", err);
    });
});

router.get("/error", (req, res) => {
  res.render("error.hbs", { layout: false });
});

module.exports = router;
