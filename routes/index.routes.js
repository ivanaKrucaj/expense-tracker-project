const express = require("express");
const router = express.Router();

/* GET landing page */
router.get("/", (req, res) => res.render("index"));

module.exports = router;
