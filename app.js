const express = require("express");
const morgan = require("morgan");
const app = express();

const userRouter = require("./src/routes/userRoutes");
const deckRouter = require("./src/routes/deckRoutes");
const AppError = require("./src/utils/appError");
const globalErrorHandler = require("./src/controllers/errorController");

//MIDDLEWARE
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use((req, res, next) => {
  console.log("hello from the middleware");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//ROUTES
app.use("/api/v1/user", userRouter);
app.use("/api/v1/decks", deckRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
