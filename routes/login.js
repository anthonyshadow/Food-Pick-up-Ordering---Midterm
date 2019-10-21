const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');

module.exports = (db) => {
  router.get("/", (req, res) => {
  res.render("login")
  });
  router.post("/", (req, res) => {
    db.query(`SELECT * FROM users WHERE email = $1`, [req.body.email])
    .then(data => {
      const user = data.rows[0]
      let templateVars;
      if(user && user.password === req.body.password) {
        templateVars = { email: req.body.email, password: req.body.password };
        res.redirect("/", templateVars);
      } else {
        res.send("Wrong password or email")
      }
    })
    res.render("/");
    });
  return router;
};
