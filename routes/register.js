const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("register")
      });

  router.post("/", (req, res) => {
    console.log(req.body)
    db.query(`INSERT into USERS (name, email, phone, password)
    VAlUES ($1, $2, $3, $4)`, [req.body.name, req.body.email, req.body.phone, req.body.password])
    .then(data => data.rows[0])
    res.redirect("/")
      });
  return router;
}

