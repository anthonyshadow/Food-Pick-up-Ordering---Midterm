const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
<<<<<<< HEAD
  res.render("login")
  })
=======
    res.render("login")
      });
>>>>>>> 096c98b12b7202257f98829fea6cb517196926b6
  return router;
}
