const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');
const app = express();

module.exports = (db) => {
  router.get("/", (req, res) => {
  let templateVars = {}
  templateVars.user = req.session.user_id ? req.session.user_id : undefined;
  res.render("menu")
  });
  return router;
};

