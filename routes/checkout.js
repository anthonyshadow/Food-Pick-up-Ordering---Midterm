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

    let { foodId, foodName, foodDescription, foodPrice, foodImage} = req.body

    console.log("req", req.body)

<<<<<<< HEAD
    db.query(`INSERT into ORDERS (user_id, total_price) VALUES ($1, $2)`, [user_id, total_price])
=======

    // [ { foodId: '5',
    // foodName: 'Juicy Lucy',
    // foodDescription: 'description',
    // foodPrice: '160',
    // foodImage: '' } ]

    // console.log(JSON.stringify(req.session.user_id))

    const totalPrice = req.body.cartItem.reduce((total, current) => {return total += Number(current.foodPrice)}, 0);
    db.query(`INSERT into ORDERS (user_id, total_price) VALUES ($1, $2) returning id`, [req.session.user_id.id, totalPrice])
    .then(data => {
      let order_id =data.rows[0].id
      let orders = req.body.cartItem
      for (let item of orders) {
        console.log("fooditem", item.foodId)
        console.log("order", order_id)
        db.query(`INSERT into FOOD_ORDERS (food_id, order_id) VALUES ($1, $2)`, [item.foodId, order_id])
        .catch(error => console.log(error.message))
      }
    })

    .catch((error) => console.log(error))

    console.log("total", totalPrice)

>>>>>>> features/insert
    db.query(`
    UPDATE orders
    SET accepted = true
    WHERE user_id = $1`, [req.session.user_id.id]);
    send_smsRoutes.sendSMS({
      body: 'Your order is being made, it will be ready in about 20-30 minutes!',
      from: '+12085476957',
      to: '+16473955386'
    });
    res.send("Order Submitted")
  });
  return router;
}
