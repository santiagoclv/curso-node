const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
// app.use((error, req, res, next) => {
//     console.log(JSON.stringify(error, null, 2))
//     CATCH THEM ALL __ERRORS__
//      May be it is a good idea for loging errors if I could bypass the respponse or know what status error I must set.
//      
//     res.status(400).send(error.message);
// });

module.exports = app;
