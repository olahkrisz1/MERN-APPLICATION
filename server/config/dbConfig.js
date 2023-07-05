const mongoose = require("mongoose");

mongoose.connect(process.env.mongo_url);

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("MongoDB connected successfully");
});

connection.on("error", () => {
  console.log("MongoDB connection failed");
});

module.exports = connection;
