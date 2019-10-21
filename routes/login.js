const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
  db.query(`SELECT name FROM users;`)
  .then(data => data.rows)
    res.render("login")
  });
  return router;
}
