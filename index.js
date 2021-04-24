const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
//for file paths
const path = require("path");
//for envs
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");

mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

//if json in request parse it
app.use(express.json());
//if cookie in request, parse it
app.use(cookieParser());

const userRouter = require("./routes/users");
const categoryRouter = require("./routes/category");

//connecting router to users, category path in browser
app.use("/users", userRouter);
app.use("/category", categoryRouter);

//if we have port defined or if we dont then run locally at
//port 8080

const port = process.env.PORT || 8080;

//serve static assets (client code) if in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`Server started at port: ${port}`));
