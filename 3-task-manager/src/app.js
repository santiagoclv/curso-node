const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const errorHanddler = require("./middlewares/errors");

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.use(errorHanddler);

module.exports = app;
