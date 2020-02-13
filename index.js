// code away!
const express = require('express');
const server = express();
server.use(express.json())

const userRouter = require("./users/userRouter.js");
const port = 5000;

server.use("/api/users", userRouter);

server.listen(port, () => console.log(`\n** Server on port ${port} \n`));