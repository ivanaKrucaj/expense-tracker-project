const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const UserModel = require("../models/user.model");

// SIGN UP PAGE
router.get("/signup", (req, res) => res.render("auth/signup"));

// SIGN UP PAGE
router.post("/signup", (req, res) => {
  const { username, email, password } = req.body;
  console.log(username, email, password);

  if (!username || !email || !password) {
    res.status(500).render("auth/signup.hbs", {
      errorMessage: "Please enter username, email and password",
    });
    return;
  }

  const myRegex = new RegExp(
    /^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/
  );
  if (!myRegex.test(email)) {
    res.status(500).render("auth/signup.hbs", {
      errorMessage: "Email format not correct",
    });
    return;
  }

  //   const myPassRegex = new RegExp(
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
  //   );
  //   if (!myPassRegex.test(password)) {
  //     res.status(500).render("auth/signup.hbs", {
  //       errorMessage:
  //         "Password needs to have 8 characters, a number and an Uppercase alphabet",
  //     });
  //     return;
  //   }

  bcrypt.genSalt(12).then((salt) => {
    console.log("Salt: ", salt);
    bcrypt.hash(password, salt).then((password) => {
      UserModel.create({ email, username, password })
        .then(() => {
          res.redirect("/home");
        })
        .catch((err) => {
          if (err.code === 11000) {
            res.status(500).render("auth/signup.hbs", {
              errorMessage: "username or email entered already exists!",
            });
            return;
          } else {
            res.status(500).render("auth/signup.hbs", {
              errorMessage: "Something went wrong!",
            });
            return;
          }
        });
    });
  });
});

router.get("/signin", (req, res) => res.render("auth/signin"));

module.exports = router;
