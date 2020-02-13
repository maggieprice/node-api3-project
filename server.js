const express = require('express');
const userRouter = require("./users/userRouter");
const server = express();
server.use(express.json());
server.use(logger);
server.use('/api/users', userRouter);
server.get('/', (req, res) => {
  res.json(`Let's write some middleware!`);
});

//custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      'Origin'
    )}`
  );

  next();
}

module.exports = server;
