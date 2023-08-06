const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const session = require("express-session");
const methodOverride = require("method-override");
require("dotenv").config();
require("./server/config/db").connectToMongoDB();
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const { isActiveRoute } = require("./server/helpers/routeHelpers");

const PORT = process.env.PORT;

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cookieParser());
app.use(methodOverride("_method"));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
    // cookie: { maxAge: new Date(Date.now() * 3600000) },
  })
);
app.use(expressLayouts);
app.set("layout", "./layouts/main");

app.set("view engine", "ejs"); // Replace 'ejs' with your template engine (e.g., 'pug' for Pug)
// app.set("views", path.join(__dirname, "views"));
// app.use(bodyParser.urlencoded({ extended: true }));

app.locals.isActiveRoute = isActiveRoute;
app.use("/", require("./server/routes/main"));
app.use("/", require("./server/routes/admin"));

app.listen(PORT, () => {
  console.log(`magic happens on PORT: http://localhost:${PORT}`);
});

// module.exports = app;
