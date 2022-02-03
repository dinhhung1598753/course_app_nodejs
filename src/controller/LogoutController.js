const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const promisify = require('util').promisify;
const verify = promisify(jwt.verify).bind(jwt);

const { PrismaClient } = require('@prisma/client');
const { user } = new PrismaClient();

class LogoutController {
  /**
   * [GET]
   * /logout/
   */
  index(req, res, next) {
    
  }

  
}



module.exports = new LoginController();
