const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');
const app = express();
const send_smsRoutes = require("./send_sms");


module.exports = (db) => {
  router.get("/", (req, res) => {
    let templateVars = {}
    templateVars.user = req.session.user_id ? req.session.user_id : undefined;
  res.render("restaurant", templateVars)
  });

  router.post("/", (req, res) => {
    send_smsRoutes.sendSMS({
      body: 'Your order is complete!',
      from: '+12085476957',
      to: '+16473955386'
    })
    res.render('restaurant', templateVars)
  })

  return router;
};

