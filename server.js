const mongoose = require("mongoose");
const dotenv = require("dotenv");
const port = process.env.port || 3000;

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("Uncaught exception. Shutting down gracefully ...");
  process.exit(1);
});

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successful");
  });

// CONNECTION TO LOCAL DB

// mongoose
//   .connect(process.env.DATABASE_LOCAL, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Local DB connection successful");
//   });

const app = require("./app");

const server = app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled rejection. Shutting down gracefully ...");
  server.close(() => {
    process.exit(1);
  });
});
