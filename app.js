const express = require("express");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//routers
const creditRouter = require("./routes/credit_routes");
const userRouter = require("./routes/user_routes");
const viewRouter = require("./routes/view_routes");

const app = express();

//views
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "pug");

//global middlewares
//serve static files
app.use(express.static(path.join(__dirname, "static")));
app.use(bodyParser.json());
app.use(cookieParser());

// Development logging
app.use(morgan("dev"));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//routes
app.use("/", viewRouter);
app.use("/v1/credits", creditRouter);
app.use("/v1/user", userRouter);

//all the rest
app.all("*", (req, res, next) => {
  res.status(404).render("not-found");
  // next(new Error(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
