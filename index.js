const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
//for file paths
const path = require("path");
//for envs
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
//this is so that client can make requests...without this if client on a
//different origin makes request...you get an error...like a different localhost port
const cors = require("cors");

mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

//if json in request parse it...bodyParser does the same thing
app.use(express.json());
//if cookie in request, parse it
app.use(cookieParser());
//allow client port (origin) to make request
//later also put production url
app.use(
  cors({
    origin: ["http://localhost:3000"],
    //to allow cookies and other credentials from this origin...should see
    //200 ok in network tab and also should see in localhost now from
    //front end and backend having credentials true
    credentials: true,
  })
);

const userRouter = require("./routes/users");
const categoryRouter = require("./routes/category");
const tokenRouter = require("./routes/token");

//connecting router to users, category, in browser
app.use("/users", userRouter);
app.use("/category", categoryRouter);
app.use("/token", tokenRouter);

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
