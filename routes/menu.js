const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');
const app = express();

module.exports = (db) => {
  router.get("/", (req, res) => {
  let templateVars = {}
  templateVars.user = req.session.user_id ? req.session.user_id : undefined;
  db.query(`SELECT * FROM foods;`)
  .then(foodData => {
    const foods = foodData.rows;
    const params = { foods }

    const createMenu = foodsArr => {
      const categoriesSet = new Set();
      const menu = {};
      for (let meal of foodsArr) {
        categoriesSet.add(meal.category)
      }
      const categories = Array.from(categoriesSet);
      for (let category of categories) {

        // adding to the food object
        menu[category] = foodsArr.filter(meal => meal.category === category);
      }
      return menu;
    }
    if (templateVars.user) {
    templateVars.menu = createMenu(params.foods)
    res.render("menu", templateVars)
    } else {
      res.render("login", templateVars)
    }
  })

  .catch(err => {
    res.status(500)
    });
  });
  return router;
};

