const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.send("Welcome to the homepage!"));
router.get("/about", (req, res) => res.send("About Us: We are learning Express routers."));

module.exports = router;
