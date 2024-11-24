const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Connected to database successful");
  })
  .catch((err) => {
    console.log("Error connecting to database", err);
  });
