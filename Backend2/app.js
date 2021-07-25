const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { DBkey } = require("./key.js");
const PORT = 5000;
app.use(express.json());
app.use(require("./routes/route"));

mongoose.connect(DBkey, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("you are connect to database");
});
mongoose.connection.on("error", () => {
  console.log("you are not connect to database");
});

app.listen(PORT, () => {
  console.log("working fine");
});
