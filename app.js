const express = require("express");
require("dotenv").config();

const userRouter = require("./routes/userRoute");
const taskRouter = require("./routes/taskRoute");
const db = require('./database/config/dbConnect');

const User = require('./database/model/User');
const Task = require('./database/model/Task');

db.connect();

const app = express();
app.use(express.json());

app.use("/users", userRouter);
app.use("/tasks", taskRouter);

module.exports = app;
