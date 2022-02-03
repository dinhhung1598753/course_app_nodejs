const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const promisify = require('util').promisify;
const verify = promisify(jwt.verify).bind(jwt);

// const { PrismaClient } = require('@prisma/client');

class Utils {


  async getUserId(req) {
    
    const accessTokenFromHeader = req.headers.authorization.replace("Bearer ", "");
    if (accessTokenFromHeader) {
      const accessTokenSecret = process.env.JWTSECRET;
      try {
        var verified =  await verify(
          accessTokenFromHeader,
          accessTokenSecret
        );
        if (verified) {
          // console.log(verified.user_id)
          return verified.user_id
        }
      } catch (error) {
        console.log("error", error)
      }
    }else{
      return false;
    }
  }
}



module.exports = new Utils();
