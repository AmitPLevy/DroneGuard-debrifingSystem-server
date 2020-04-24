const mongoose = require("mongoose");
const consts = require("./consts");
const { URL, DB_USER, DB_PASS } = consts;

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  user: DB_USER,
  pass: DB_PASS,
  useUnifiedTopology: true
};
mongoose
  .connect(URL, options)
  .then(() => console.log("connected"))
  .catch(err => console.log(`connection error: ${err}`));
