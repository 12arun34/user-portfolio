const express = require("express");
const router = express.Router();
const db = require("../utils/db");

router.post("/", (req, res) => {
  const { name, email, message } = req.body;
  db.query(
    "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)",
    [name, email, message],
    (err, result) => {
      if (err) return res.status(500).send("Database error");
      res.send("Message saved successfully!");
    }
  );
});

module.exports = router;
