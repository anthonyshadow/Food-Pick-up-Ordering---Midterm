const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');
const app = express();
const send_smsRoutes = require("./send_sms");


// const cartItems = JSON.parse(localStorage["cart-item"])

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

    res.render("checkout", templateVars)
  });
  router.post("/", (req, res) => {
    let { user_id, ordered_at, accepted, completed, total_price, customer_comment, cartItem} = req.body

    db.query(`INSERT into ORDERS (user_id, total_price)
    VALUES ($1, $2)`, [user_id, total_price])

    console.log(req.body)

    db.query(`
    UPDATE orders
    SET accepted = true
    WHERE user_id = $1`, [req.session.user_id.id]);
    send_smsRoutes.sendSMS({
      body: 'Your order is being made, it will be ready in about 20-30 minutes!',
      from: '+12085476957',
      to: '+16473955386'
    });
    res.redirect('/')
  });
  return router;
}
