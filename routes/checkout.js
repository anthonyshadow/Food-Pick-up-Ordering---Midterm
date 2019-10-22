const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');
const app = express();
const send_smsRoutes = require("./send_sms");



module.exports = (db) => {
  let templateVars = {}
  router.get("/", (req, res) => {
    templateVars.user = req.session.user_id ? req.session.user_id : undefined;

    db.query(`SELECT foods.name, foods.price, food_orders.order_id, orders.total_price
    FROM food_orders
    JOIN foods ON foods.id = food_id
    JOIN orders ON orders.id = order_id
    ORDER BY ordered_at DESC
    LIMIT 1;`)
      .then(data => {
        const order = data.rows;
        templateVars.order = order
      })

      console.log("Hello", templateVars)
    res.render("checkout", templateVars)
  });
  router.post("/", (req, res) => {
    send_smsRoutes.sendSMS({
      body: 'Your order is pending!',
      from: '+12085476957',
      to: '+16473955386'
    })
    res.redirect('/')
  })
  return router;
}
