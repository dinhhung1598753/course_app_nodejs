const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 5000;
const route = require('./routes');
const multer = require('multer');
const path = require('path');
const socketIO = require('./sockets');

const app = express();

var server = require('http').Server(app)
var io = require('socket.io')(server, {
  cors: {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  }
})



require('dotenv').config()

var publicDir = path.join(__dirname, '/public');
app.use('/public', express.static(publicDir));

app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(cookieParser());

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "OPTIONS, GET, POST, PUT, PATCH, DELETE"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
})
// app.use(auth.requireAuth);
route(app);
socketIO(io);
server.listen(port, () => {
  console.log(`app started at port: ${port}`)
})
// server.listen(8000, () => {
//   console.log(`Server started at port: 8000`)
// })
