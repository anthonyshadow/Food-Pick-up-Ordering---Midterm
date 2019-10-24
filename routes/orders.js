const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');
const app = express();

module.exports = (db) => {
  let templateVars = {}
  router.get("/", (req, res) => {
    templateVars.user = req.session.user_id ? req.session.user_id : undefined;
    db.query(`SELECT foods.id as foodId, orders.id as orderId, foods.name, orders.accepted, orders.completed, orders.total_price
      FROM food_orders
      JOIN orders ON orders.id = order_id
      JOIN foods ON foods.id = food_id
      WHERE orders.user_id = $1`, [req.session.user_id.id])
    .then(data => {
      templateVars.order = data.rows;
    res.render("orders", templateVars)
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
  });
  router.post("/", (req, res) => {
    res.redirect('/orders')
  });
  return router
};
