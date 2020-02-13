// code away!
const express = require('express');
const server = express();
server.use(express.json())

const userRouter = require("./users/userRouter.js");


server.use("/api/users", userRouter);
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** Server on port ${port} \n`));