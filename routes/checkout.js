const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');
const app = express();
const send_smsRoutes = require("./send_sms");
module.exports = (db) => {
  let templateVars = {}
  router.get("/", (req, res) => {
    templateVars.user = req.session.user_id ? req.session.user_id : undefined;
    res.render("checkout", templateVars)
      });
  router.post("/", (req, res) => {
    res.render('index', send_smsRoutes)
  })
  return router;
}
