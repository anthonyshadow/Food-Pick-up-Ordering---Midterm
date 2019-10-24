const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');
const app = express();
const send_smsRoutes = require("./send_sms");


module.exports = (db) => {
  router.get("/", (req, res) => {
    let templateVars = {}
    templateVars.user = req.session.user_id ? req.session.user_id : undefined;
    db.query(`
    SELECT foods.id as foodId, orders.id as orderId, foods.name, orders.accepted, orders.completed, orders.total_price, orders.customer_comment
    FROM food_orders
    JOIN orders ON orders.id = order_id
    JOIN foods ON foods.id = food_id
    WHERE user_id = $1`, [req.session.user_id.id])
    .then(data => {
      templateVars.order = data.rows
    res.render("restaurant", templateVars)
    });

  });

  router.post("/", (req, res) => {
    let templateVars = {}
    templateVars.user = req.session.user_id ? req.session.user_id : undefined;
    db.query(`
    UPDATE orders
    SET completed = true
    WHERE user_id = $1
    AND orders.id = $2`, [req.session.user_id.id, req.body.order_id])
    .then(data => {
      send_smsRoutes.sendSMS({
        body: 'Your order is complete!',
        from: '+12085476957',
        to: '+16473955386'
      })
      res.redirect('restaurant');

    })
  })
  return router;
};

