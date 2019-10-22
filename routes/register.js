const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');
const app = express();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let templateVars = {}
    templateVars.user = req.session.user_id ? req.session.user_id : undefined;
    res.render("register", templateVars)
      });

  router.post("/", (req, res) => {
    let { name, email, phone, password } = req.body
    if (email === '' || password === '') {
      res.send(400)
    } else {
      db.query(`SELECT * FROM users WHERE email = $1`, [email])
      .then(data => {
        if(data.rows.length) {
          res.send(400)
        } else {
      db.query(`INSERT into USERS (name, email, phone, password)
      VAlUES ($1, $2, $3, $4)`, [name, email, phone, password])
      .then(data => data.rows[0])
      res.redirect("/")
        }
      })
    }
      });
  return router;
}

