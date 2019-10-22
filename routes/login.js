const express = require('express');
const app = express();
const router  = express.Router();
const cookieSession = require('cookie-session');


module.exports = (db) => {
  router.get("/", (req, res) => {
  let templateVars = {}
  templateVars.user = req.session.user_id ? req.session.user_id : undefined;
  db.query(`SELECT name FROM users;`)
  .then(data => data.rows)
    res.render("login", templateVars)
  });
  router.post("/", (req, res) => {
    db.query(`SELECT * FROM users WHERE email = $1`, [req.body.email])
    .then(data => {
      const user = data.rows[0]
      if(user && user.password === req.body.password) {
        templateVars = { email: req.body.email, password: req.body.password };
        req.session.user_id = user;
        res.redirect("/");
      } else {
        res.send("Wrong password or email")
      }
    })
    });
  return router;
};


