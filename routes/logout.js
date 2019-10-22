const express = require('express');
const app = express();
const router  = express.Router();
const cookieSession = require('cookie-session');


module.exports = (db) => {
router.post("/", (req, res) => {
  req.session = null
  res.redirect("/");
})
return router
}
