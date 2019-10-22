const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM foods;`)
    .then(data => data.rows)
     res.render("menu")
  });
  return router;
};




