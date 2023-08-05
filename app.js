const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
require("dotenv").config();
require("./server/config/db").connectToMongoDB();

const PORT = process.env.PORT;

const app = express();

app.use(express.static("public"));

app.use(express.json());
app.use(expressLayouts);
app.set("layout", "./layouts/main");

app.set("view engine", "ejs"); // Replace 'ejs' with your template engine (e.g., 'pug' for Pug)
app.set("views", path.join(__dirname, "views"));
// app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", require("./server/routes/main"));

app.listen(PORT, () => {
  console.log(`magic happens on PORT: http://localhost:${PORT}`);
});

// module.exports = app;
