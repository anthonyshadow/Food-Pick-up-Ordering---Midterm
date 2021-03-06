// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const cookieSession = require('cookie-session');
const app        = express();
const morgan     = require('morgan');


// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));


app.use(cookieSession({
  name: 'session',
  keys:["cowboys"],
  maxAge: 24 * 60 * 60 * 1000
}));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const registerRoutes = require("./routes/register");
const loginRoutes = require("./routes/login");
const logoutRoutes = require("./routes/logout");
const menuRoutes = require("./routes/menu");
const restaurantRoutes = require("./routes/restaurant");
const about_usRoutes = require("./routes/about_us");
const checkoutRoutes = require("./routes/checkout");
const foodRoutes = require("./routes/foods");
const ordersRoutes = require("./routes/orders");
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/foods", foodRoutes(db));
app.use("/register", registerRoutes(db));
app.use("/login", loginRoutes(db));
app.use("/logout", logoutRoutes(db));
app.use("/menu", menuRoutes(db));
app.use("/restaurant", restaurantRoutes(db));
app.use("/about_us", about_usRoutes(db));
app.use("/checkout", checkoutRoutes(db));
app.use("/orders", ordersRoutes(db));
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  let templateVars = {}
  templateVars.user = req.session.user_id ? req.session.user_id : undefined;
  console.log("rendering index")
  res.render("index", templateVars);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});


