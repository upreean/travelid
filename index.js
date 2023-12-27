require("dotenv").config();

const express = require("express");
const homeRoute = require("./routes/home");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const uri = "mongodb://127.0.0.1:27017/travelid";
const app = express();
const port = 3000;

const uri = process.env.MONGODB_CONNECT_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", () =>
  console.log("Something went wrong to connect to database")
);
db.once("open", () => {
  console.log("DB Connection has been made successfully");
});

// middleware
app.set("view engine", "ejs");
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// routing
app.use("/", homeRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// const User = mongoose.model("User", {
//   name: String,
//   email: String,
// });
// // Simpan data
// const user = new User({
//   name: "John Doe",
//   email: "johndoe@example.com",
// });
// user.save();

// // Baca data
// const users = User.find();
// users.then((users) => {
//   console.log(users);
// });

// mongoose.connect("mongodb://127.0.0.1:27017/travelid", {
//   userNewUrlParser: true,
// });
// const db = mongoose.connection;
// db.on("error", console.log("Something went wrong to connect to database"));
// db.onec("open", () => {
//   console.log("DB Connection has been made successfully");
// });

// app.get("/", (req, res) => {
//   res.send("Hello Aprian!");
// });
