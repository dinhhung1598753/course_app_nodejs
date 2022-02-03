const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 5000;
const route = require('./routes');
const multer = require('multer');
const path = require('path');

const app = express();

require('dotenv').config()

var publicDir = path.join(__dirname,'/public');
app.use('/public', express.static(publicDir));

app.use(cors());
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

route(app);
app.listen(port, () => {
  console.log(`Server started at port: ${port}`)
})
