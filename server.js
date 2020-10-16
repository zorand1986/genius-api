const dotenv = require("dotenv");
const port = process.env.port || 3000;

dotenv.config({ path: "./config.env" });
console.log(process.env);

const app = require("./app");

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
