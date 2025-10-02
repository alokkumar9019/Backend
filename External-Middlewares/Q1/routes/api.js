// routes/api.js
const express = require("express");
const rateLimit = require("express-rate-limit");
const router = express.Router();

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: { error: "Too many requests, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

router.get("/public", (req, res) => {
  res.json({ message: "This is a public endpoint!" });
});

router.get("/limited", limiter, (req, res) => {
  res.json({ message: "You have access to this limited endpoint!" });
});

module.exports = router;
