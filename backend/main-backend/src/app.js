var createError = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var authRouter = require("./auth/AuthController");
var customerRouter = require("./customer/CustomerController");
var restaurantRouter = require("./restaurant/RestaurantController");
var ordersRouter = require("./orders/OrdersController");
// var usersRouter = require("../routes/users");
const Database = require("./database.js");
const worldModel = require("./models/WorldModel");
const { cloudinaryConfig } = require("./config/cloudinaryConfig");
const schema = require("./graphql/config");
const { graphqlHTTP } = require("express-graphql");

async function initModules() {
  await Database.init();
}

async function configureApp() {
  await initModules();

  let app = express();
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(cors(configureCors()));
  // app.use(express.static(path.join(__dirname, 'public')));

  // app.use("/", indexRouter);
  app.use("/", authRouter);
  app.use("/customer", customerRouter);
  app.use("/restaurant", restaurantRouter);
  app.use("/orders", ordersRouter);
  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
  });

  return app;
}

function configureCors() {
  const whitelist = [
    "http://localhost:3000",
  ];

  const corsOptionsDelegate = (req, callback) => {
    let corsOptions;

    let isDomainAllowed = whitelist.indexOf(req.header("Origin")) !== -1;

    if (isDomainAllowed) {
      // Enable CORS for this request
      corsOptions = { origin: true };
    } else {
      // Disable CORS for this request
      corsOptions = { origin: false };
    }
    callback(null, corsOptions);
  };

  return corsOptionsDelegate;
}

module.exports = configureApp;
