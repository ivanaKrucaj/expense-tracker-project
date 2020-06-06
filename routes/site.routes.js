const express = require("express");
const router = express.Router();
const TransactionModel = require('../models/transaction.model')
const UserModel = require('../models/user.model')

router.use((req, res, next) => {
  if (req.session.loggedInUser) {
    next();
  } else {
    res.redirect("/signin");
  }
});

// HOME PAGE ------- GET
router.get("/home", (req, res) => {

  // display user(id) transactions on home page:
  TransactionModel.find()
    .then((transaction) => {
      let newTrans = transaction.filter((element) => {
        if(element.type == 'expense') {
          element.isExpenseType = true;
        }
        else {
          element.isExpenseType = false;
        }
        return element.user_id == req.session.loggedInUser._id
      })
      let reverseTrans = newTrans.reverse()
      // calculating current balance:
      let reduceTrans = reverseTrans.reduce((acc, value) => {
        if(value.type == 'income'){
          return acc + value.amount
        } else {
          return acc - value.amount
        }
        return acc
      }, 0)
      const userData = req.session.loggedInUser
      res.render("home.hbs", {reverseTrans, reduceTrans, userData});
    })
    .catch(() => {
      res.send('Something went terribly wrong.')
    })
});


// CREATE TRANSACTION ---------- GET
router.get("/createTrans", (req, res) => {
  res.render("createTrans.hbs");
});

// CREATE TRANSACTION ---------- POST
router.post('/createTrans', (req, res) => {
  const {type, name, category, amount, date} = req.body
  // console.log(req.session.loggedInUser);
  TransactionModel.create({type: type, name: name, category: category, amount: amount, date: date, user_id: req.session.loggedInUser._id})
    .then((response) => {
      res.redirect('/home')
    })
    .catch(() => {
      res.render('createTrans.hbs', {showErrorMessage: true})
    })
})


// EDIT TRANSACTION ---------- GET
router.get('/editTrans/:id', (req, res) => {
  let id = req.params.id
  console.log(id)
  TransactionModel.findById(id)
    .then((transaction) => {
      res.render("editTrans.hbs", {transaction});
    })
    .catch(() => {
      res.send('Something went wrong.')
    })
})

// EDIT TRANSACTION ---------- POST 
router.post("/editTrans/:id", (req, res) => {
  let id = req.params.id
  console.log('The id is',id)

  const {type, name, category, amount, date} = req.body
  TransactionModel.findByIdAndUpdate(id, {$set: {type, name, category, amount, date}})
    .then(() => {
      res.redirect('/home')
    })
    .catch(() => {
      res.send('Something went wrong.')
    })
});

//DELETE TRANSACTION ------------ GET:
router.get("/home/delete/:id", (req, res) => {

  TransactionModel.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect('/home')
    })
    .catch(() => {
      res.send('Something went wrong.')
    })
})


// DIAGRAMS ---------- GET
router.get("/diagrams", (req, res) => {
  res.render("diagrams.hbs");
});


module.exports = router;