const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');
const app = express();
const send_smsRoutes = require("./send_sms");


module.exports = (db) => {
  router.get("/", (req, res) => {
    let templateVars = {}
    let userOrders = db.query(`
    SELECT *
    FROM food_orders
    JOIN orders ON orders.id = order_id
    WHERE user_id = $1`, [req.session.user_id.id])
    templateVars.user = req.session.user_id ? req.session.user_id : undefined;
    templateVars.order =
    res.render("restaurant", templateVars)


    console.log(Object.keys(userOrders))
  });

  router.post("/", (req, res) => {
    let templateVars = {}
    templateVars.user = req.session.user_id ? req.session.user_id : undefined;
    db.query(`
    UPDATE orders
    SET completed = false
    WHERE user_id = $1`, [req.session.user_id.id]);
    send_smsRoutes.sendSMS({
      body: 'Your order is complete!',
      from: '+12085476957',
      to: '+16473955386'
    })
    res.render('restaurant', templateVars)
  })
  return router;
};

