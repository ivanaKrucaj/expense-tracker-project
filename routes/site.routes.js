const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  if (req.session.loggedInUser) {
    next();
  } else {
    res.redirect("/signin");
  }
});

router.get("/home", (req, res) => {
  res.render("home.hbs");
});

router.get("/createTrans", (req, res) => {
  res.render("createTrans.hbs");
});

router.get("/editTrans", (req, res) => {
  res.render("editTrans.hbs");
});

router.get("/diagrams", (req, res) => {
  res.render("diagrams.hbs");
});

module.exports = router;
