const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
  res.render("login")
  });

  router.post("/", (req, res) => {
    res.render("login");
    console.log('fwwnvivnwi')
    });
  return router;
};
