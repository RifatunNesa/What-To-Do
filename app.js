const express = require("express");
require("dotenv").config();

const userRouter = require("./routes/userRoute");
const taskRouter = require("./routes/taskRoute");

const app = express();
app.use(express.json());

app.use("/users", userRouter);
app.use("/tasks", taskRouter);

module.exports = app;
