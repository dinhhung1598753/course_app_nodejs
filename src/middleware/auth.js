const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { user } = new PrismaClient();

class Auth {
  // For BE
  async requireAuth(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).send('Unauthorized!')
    }

    await jwt.verify(
      req.cookies.token,
      process.env.JWTSECRET,
      async function (err, decoded) {
        if (decoded == undefined) {
          res.status(401).send('Unauthorized!');
        }
        else {
          user.findUnique({
            where: {
              id: decoded.user_id
            }
          })
            .then(user => {
              req.currentUser = user;
              next();
            })
        }
      }
    );
  }


  // For FE
  // async requireAuth(req, res, next) {
  //   const authHeader = req.get("Authorization");
  //   if (!authHeader) {
  //     const err = new Error('Not authenticated.');
  //     err.statusCode = 401;
  //     throw err;
  //   }

  //   const token = authHeader.split(" ")[1];
  //   let decodedToken;
  //   try {
  //     decodedToken = jwt.verify(token, process.env.JWTSECRET)
  //   } catch (error) {
  //     error.statusCode = 500;
  //     throw err;
  //   }

  //   if (!decodedToken) {
  //     const err = new Error("Not authenticated.");
  //     error.statusCode = 401;
  //     throw err;
  //   }

  //   req.userId = decodedToken.userId;
  //   next();
  // }

  isStudent(req, res, next) {
    const role = req.currentUser.role;
    if (role === "STUDENT" || role === "MANAGER") {
      next();
      return;
    }
    res.status(403).send('No permission.')
  }

  isTeacher(req, res, next) {
    const role = req.currentUser.role;
    if (role === "TEACHER" || role === "MANAGER") {
      next();
      return;
    }
    res.status(403).send('No permission.')
  }

  isManager(req, res, next) {
    const role = req.currentUser.role;
    if (role === "MANAGER") {
      next();
      return;
    }
    res.status(403).send('No permission.')
  }
}

module.exports = new Auth();
