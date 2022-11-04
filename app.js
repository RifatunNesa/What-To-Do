const express = require('express');
require('dotenv').config();
const userRouter = require('./routes/userRoute');
const taskRouter = require('./routes/taskRoute');
const db = require('./database/config/dbConnect');
const MethodNotAllowedError = require('./utilities/errors/MethodNotAllowedError');
const globalErrorHandler = require('./utilities/errorHandler');

db.connect();

const app = express();
app.use(express.json());

app.use('/users', userRouter);
app.use('/tasks', taskRouter);

app.all('/*', (req, res, next) => {
  return next(new MethodNotAllowedError());
});

app.use(globalErrorHandler);

module.exports = app;
