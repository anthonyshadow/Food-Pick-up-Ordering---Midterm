const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');
const app = express();

module.exports = (db) => {
  router.get("/", (req, res) => {
  res.render("restaurant")
  });
  return router;
};
