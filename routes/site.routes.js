const express = require("express");
const router = express.Router();
const TransactionModel = require('../models/transaction.model')

router.use((req, res, next) => {
  if (req.session.loggedInUser) {
    next();
  } else {
    res.redirect("/signin");
  }
});

// HOME PAGE ------- GET
router.get("/home", (req, res) => {
  res.render("home.hbs");
});


// CREATE TRANSACTION ---------- GET
router.get("/createTrans", (req, res) => {
  res.render("createTrans.hbs");
});

// CREATE TRANSACTION ---------- POST
router.post('/createTrans', (req, res) => {
  const {type, name, category, amount, date} = req.body
  console.log(req.session.loggedInUser);
  TransactionModel.create({type: type, name: name, category: category, amount: amount, date: date, user_id: req.session.loggedInUser._id})
    .then((response) => {
      res.render('home.hbs')
    })
    .catch(() => {
      res.render('createTrans.hbs', {showErrorMessage: true})
    })
})


// EDIT TRANSACTION ---------- GET
router.get("/editTrans", (req, res) => {
  res.render("editTrans.hbs");
});


// DIAGRAMS ---------- GET
router.get("/diagrams", (req, res) => {
  res.render("diagrams.hbs");
});



module.exports = router;