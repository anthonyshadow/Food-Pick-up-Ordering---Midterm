const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');

module.exports = (db) => {
  router.get("/", (req, res) => {
  db.query(`SELECT name FROM users;`)
  .then(data => data.rows)
    res.render("login")
  });
  router.post("/", (req, res) => {
    db.query(`SELECT * FROM users WHERE email = $1`, [req.body.email])
    .then(data => {
      const user = data.rows[0]
      if(user && user.password === req.body.password) {
        res.redirect("/");
      } else {
        res.send("Wrong password or email")
      }
    })
    });
  return router;
};
