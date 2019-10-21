const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("register")
      });

  router.post("/register", (req, res) => {
    res.redirect("/")
      });
  return router;
}

