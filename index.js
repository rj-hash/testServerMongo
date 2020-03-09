const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const bodyParser = require("body-parser");
const cors = require("cors");
// var User = require("./src/schema/user");

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

const store = new MongoStore({
  url: "mongodb://localhost/testOrangeDB",
  collection: "sessions"
});

mongoose.connect("mongodb://localhost/testOrangeDB");

app.use(
  session({
    secret: "fpooookdmm",
    store: store,
    resave: false,
    saveUninitialized: true,
    unset: "destroy",
    name: "session cookie name"
  })
);

app.get("/", (req, res) => {
  res.send("hello world!");
});

// app.post("/add", (req, res) => {
//   const data = req.body;
//   const user = new User({
//     name: data.name,
//     email: data.email,
//     password: data.password
//   });

//   user
//     .save()
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.send(err.message);
//     });
//   //   res.send(data);
// });

require("./src/api/user.routes")(app);
require("./src/api/userprofile.routes")(app);
require("./src/api/timeline.routes")(app);

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}....`);
});
