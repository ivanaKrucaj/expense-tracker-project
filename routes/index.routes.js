const express = require("express");
const router = express.Router();
const passport = require("passport");

/* GET landing page */
router.get("/", (req, res) => res.render("index", {layout: false }));

module.exports = router;

// Google login routes
router.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
      ]
    })
  );
  router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: "/home",
      failureRedirect: "/signin" // here you would redirect to the login page using traditional login approach
    })
  );
