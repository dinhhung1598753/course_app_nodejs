const userRouter = require('./user');
const courseRouter = require('./course');
const loginRouter = require('./login');
// const logoutRouter = require('./logout');
const auth = require('../middleware/auth');


function route(app) {
  app.use('/users', userRouter);
  app.use('/login', loginRouter);
  app.use('/courses', courseRouter);
}

module.exports = route;
