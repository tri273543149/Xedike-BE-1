const mongoose = require("mongoose");
const express = require("express");
// const cors = require("cors");

const config = require("./config");

mongoose
  .connect(config.mongoUri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connect to DB successfully"))
  .catch((err) => console.log(err));

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(cors())

// app.use(
//   cors({
//     allowedHeaders: ["sessionId", "Content-Type"],
//     exposedHeaders: ["sessionId"],
//     origin: "*",
//     methods: "GET, POST, PUT, DELETE, PATCH",
//     preflightContinue: false,
//   })
// );

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, token"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  next();
});

// router
app.use("/api/user", require("./router/api/user"));
app.use("/api/driver", require("./router/api/driver"));
app.use("/api/car", require("./router/api/car"));
app.use("/api/trip", require("./router/api/trip"));

app.use("/api/users", require("./router/api/users"));
app.use("/api/drivers", require("./router/api/drivers"));
app.use("/api/cars", require("./router/api/cars"));
app.use("/api/trips", require("./router/api/trips"));

app.use("/uploads", express.static("uploads"));

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
