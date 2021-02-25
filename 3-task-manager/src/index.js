const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(userRouter);
app.use(taskRouter);
// app.use((error, req, res, next) => {
//     CATCH THEM ALL __ERRORS__
//      May be it is a good idea for loging errors if I could bypass the respponse or know what status error I must set.
//      
//     res.status(400).send(error.message);
// });

app.listen(port, () => {
    console.log(`task-manager-backend up and running on port ${port}`)
});
