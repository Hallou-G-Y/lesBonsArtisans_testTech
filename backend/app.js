const bodyParser = require("body-parser");
const express = require("express");
require("./models/dbconfig");
const AuthRouter = require("./routes/authRoutes");
const ProductRouter = require("./routes/productsRoutes");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//const UsersRouter = require('./routes/usersRoutes');

app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:5173", // L'URL de votre front-end
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/api/auth", AuthRouter);
app.use("/api/products", ProductRouter);
//app.use('/api/users', UsersRouter);

module.exports = app;
