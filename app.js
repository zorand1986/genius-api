const express = require("express");
const morgan = require("morgan");
const app = express();

const userRouter = require("./routes/userRoutes");
const deckRouter = require("./routes/deckRoutes");

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

module.exports = app;
