const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const UserModel = require("../models/user.model");

// SIGN UP ------------ GET
router.get("/signup", (req, res) => res.render("auth/signup"));

// SIGN UP ------------ POST
router.post("/signup", (req, res) => {
  const { username, email, password, currency } = req.body;
  console.log(username, email, password, currency);

  if (!username || !email || !password || !currency) {
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
      UserModel.create({ email, username, password, currency })
        .then((userData) => {
          req.session.loggedInUser = userData;
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

// SIGN IN ------------ GET
router.get("/signin", (req, res) => res.render("auth/signin"));

// SIGN IN ------------ POST
router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(500).render("auth/signin.hbs", {
      errorMessage: "Please enter email and password",
    });
    return;
  }
  const myRegex = new RegExp(
    /^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/
  );
  if (!myRegex.test(email)) {
    res.status(500).render("auth/signin.hbs", {
      errorMessage: "Email format not correct",
    });
    return;
  }

  // Find if the user exists in the database
  UserModel.findOne({ email })
    .then((userData) => {
      //check if passwords match
      bcrypt
        .compare(password, userData.password)
        .then((doesItMatch) => {
          //if it matches
          if (doesItMatch) {
            // req.session is the special object that is available to you
            req.session.loggedInUser = userData;
            //req.session.greet = 'Hola';
            res.redirect("/home");
          }
          //if passwords do not match
          else {
            res.status(500).render("auth/signin.hbs", {
              errorMessage: "Password doesn't match",
            });
            return;
          }
        })
        .catch(() => {
          res.status(500).render("auth/signin.hbs", {
            errorMessage: "Something went wrong!",
          });
          return;
        });
    })
    //throw an error if the user does not exists
    .catch(() => {
      res.status(500).render("auth/signin.hbs", {
        errorMessage: "Email is not registered",
      });
      return;
    });
});

router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    // cannot access session here
    res.redirect("/signin");
  });
});

module.exports = router;
