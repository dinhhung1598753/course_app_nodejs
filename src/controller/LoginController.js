const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const promisify = require('util').promisify;
const verify = promisify(jwt.verify).bind(jwt);

const { PrismaClient } = require('@prisma/client');
const { user } = new PrismaClient();

let loadedUser;
class LoginController {
  /**
   * [POST]
   * /login/
   */
  create(req, res, next) {
    user.findUnique({
      where: {
        email: req.body.email
      }
    })
      .then(user => {
        loadedUser = user;
        if (user) {
          bcrypt.compare(req.body.password, user.password)
            .then(async function (result) {
              if (result) {
                const token = await jwt.sign(
                  { user_id: user.id },
                  process.env.JWTSECRET,
                  { expiresIn: '2h' }
                );
                res.cookie('token', token);
                res.send(token);
              }
              else {
                res.status(403).send('Incorrect password!')
              }
            })
        }
        else {
          res.status(404).send('User not found!')
        }
      })
  }

  me(req, res, auth) {

    const accessTokenFromHeader = req.headers.authorization.replace("Bearer ", "");
    // console.log("header", req.headers);
    // console.log("token",accessTokenFromHeader)
    if (!accessTokenFromHeader) {
      res.status(401).send('Không tìm thấy access token!');
    }

    const accessTokenSecret = process.env.JWTSECRET;
    try {
      verify(
        accessTokenFromHeader,
        accessTokenSecret
      ).then((verified)=>{
  
        if (!verified) {
          res
            .status(401)
            .send('Bạn không có quyền truy cập vào tính năng này!');
        }
    
        // console.log("verified is ", verified.user_id);
    
        user.findUnique({
          where: {
            id: verified.user_id
          }
        }).then((user)=>{
          // console.log("user is ", user);
          res.status(200).json({
            // user: {
            //   id : user.id,
            //   fullname: user.fullName,
            //   role: user.role
            // }
            user : user
          })
        });
    
        // console.log("user is ", user);
        // req.user = user;
  
      });
    } catch (error) {
      console.log(`Error in verify access token:  + ${error}`);
      res
            .status(401)
            .send('Bạn không có quyền truy cập vào tính năng này!');
    }
    
    



    // console.log("res is ", req)
    
  }
}



module.exports = new LoginController();
