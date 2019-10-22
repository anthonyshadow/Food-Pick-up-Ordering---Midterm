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
    db.query(`INSERT into USERS (name, email, phone, password)
    VAlUES ($1, $2, $3, $4)`, [req.body.name, req.body.email, req.body.phone, req.body.password])
    .then(data => data.rows[0])
    res.redirect("/")
      });
  return router;
}

