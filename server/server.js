const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
const usersRoute = require("./routes/usersRoute");
const questionsRoute = require("./routes/questionsRoute");
const blogActionsRoute = require("./routes/blogActionRoute");

app.use(express.json());
app.use("/api/users", usersRoute);
app.use("/api/questions", questionsRoute);
app.use("/api/actions", blogActionsRoute);

const port = process.env.PORT || 9000;

app.listen(port, () => console.log(`Server running on port ${port}`));
