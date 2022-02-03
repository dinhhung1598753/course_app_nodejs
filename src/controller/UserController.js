const { PrismaClient } = require('@prisma/client');
const { user } = new PrismaClient();
const bcrypt = require('bcrypt');

class UserController {
  /**
   * [POST]
   * /user/create
   */
  async create(req, res, next) {
    const newUser = req.body;

    const checkEmailExist = await user.findUnique({
      where: {
        email: newUser.email
      }
    })

    if (checkEmailExist) {
      return res.send('Email has been used!')
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newUser.password, salt);

    newUser.password = hashPassword;
    newUser.dob = new Date(newUser.dob);

    user.create({
      data: newUser
    })
      // .then(user => res.send(user))
      .then(user => res.send("OK"))
  }

  index(req, res, next) {
    user.findMany()
      .then(users => res.send(users))
  }

  show(req, res, next) {
    user.findFirst({
      where: {
        id: parseInt(req.params.userId)
      }
    })
      .then(user => res.send(user))
  }

  updateProfile(req, res, next) {
    const newProfile = req.body;
    if (newProfile.dob) {
      newProfile.dob = new Date(newProfile.dob);
    }
    user.update({
      where: {
        id: parseInt(req.params.userId)
      },
      data: newProfile
    })
      .then(user => res.send(user))
  }

  updateRole(req, res, next) {
    user.update({
      where: {
        id: parseInt(req.params.userId)
      },
      data: {
        role: "MANAGER"
      }
    })
      .then(user => res.send(user))
  }

  delete(req, res, next) {
    user.delete({
      where: {
        id: parseInt(req.params.userId)
      }
    })
      .then(user => res.send(user))
  }

  async changePassword(req, res, next) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.newPassword, salt);

    user.update({
      where: {
        id: parseInt(req.params.userId)
      },
      data: {
        password: hashPassword
      }
    })
    .then(() => res.send('Change Password successfully!'))
  }
}

module.exports = new UserController()
