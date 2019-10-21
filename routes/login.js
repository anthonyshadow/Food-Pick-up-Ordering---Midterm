const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/login", (req, res) => {
      db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users })
          .render("index")
        console.log('venivne')
      })
    //} else {
      // res.redirect("register")
      // }
      .catch(err => {
        res
        .status(500)
        .json({ error: err.message });
      });
  });
  return router;
}

module.exports = (db) => {
  router.post("/login", (req, res) => {
      res.render("register")
  });
  return router;
}
