const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//for file paths
const path = require("path");
require("dotenv");

mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb+srv://kyle123:kevinkyle2@cluster0.wa9rw.mongodb.net/user_database?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

app.use(express.json());

const userRouter = require("./routes/users");

//connecting router to users path
app.use("/users", userRouter);

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
