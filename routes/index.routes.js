const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res) => res.render("index"));
// router.get("/home", (req, res) => res.render("home"));

module.exports = router;
