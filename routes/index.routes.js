const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res) => res.render("index"));

router.get("/signup", (req, res) => res.render("auth/signup"));

router.get("/signin", (req, res) => res.render("auth/signin"));

module.exports = router;
