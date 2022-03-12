const { PrismaClient } = require('@prisma/client');
const { user, userCourse, course } = new PrismaClient();
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

  async addCourse(req, res, next) {
    const userId = req.userId
    const newUserCourse = req.body;
    newUserCourse.userId = userId;
    const exist = await userCourse.findMany({
      where: {
        userId: userId,
        courseKey: newUserCourse.courseKey
      }
    });
    if (exist.length > 0) {
      res.send("Khóa học đã được đăng kí")
    }
    else {
      userCourse.create({
        data: newUserCourse
      })
        // .then(user => res.send(user))
        .then(userCourse => res.send("OK"))
        .catch(err => res.send(err.message))
    }
  }

  async getCourses(req, res, next) {
    const userId = req.userId
    let courses = await course.findMany({
      where: {
        userCourses: {
          some: {
            user: {
              id: userId
            },
          }
        }
      },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
          },
        }
      }
    });

    for (let i = 0; i < courses.length; i++) {
      courses[i].countSubscribe = await userCourse.count({
        where: {
          courseKey: courses[i].key
        },
      })
    }
    res.send(courses)

  }

  // async show(req, res, next) {
  //   const u = await user.findFirst({
  //     where: {
  //       id: parseInt(req.params.userId)
  //     }
  //   })
  //   res.send(u)
  // }

  // updateProfile(req, res, next) {
  //   const newProfile = req.body;
  //   if (newProfile.dob) {
  //     newProfile.dob = new Date(newProfile.dob);
  //   }
  //   user.update({
  //     where: {
  //       id: parseInt(req.params.userId)
  //     },
  //     data: newProfile
  //   })
  //     .then(user => res.send(user))
  // }

  // updateRole(req, res, next) {
  //   user.update({
  //     where: {
  //       id: parseInt(req.params.userId)
  //     },
  //     data: {
  //       role: "MANAGER"
  //     }
  //   })
  //     .then(user => res.send(user))
  // }

  delete(req, res, next) {
    user.delete({
      where: {
        id: parseInt(req.params.userId)
      }
    })
      .then(user => res.send(user))
  }

  // async changePassword(req, res, next) {
  //   const salt = await bcrypt.genSalt(10);
  //   const hashPassword = await bcrypt.hash(req.body.newPassword, salt);

  //   user.update({
  //     where: {
  //       id: parseInt(req.params.userId)
  //     },
  //     data: {
  //       password: hashPassword
  //     }
  //   })
  //     .then(() => res.send('Change Password successfully!'))
  // }



  
  
}


module.exports = new UserController()
