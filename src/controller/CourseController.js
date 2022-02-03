const { PrismaClient } = require('@prisma/client');
const { course, user } = new PrismaClient();
const nodemailer = require('nodemailer');
const Utils = require('./utils/Utils');

class CourseController {



  /** 
   * [GET]
   * /course
   * 
  */
  async index(req, res, next){
    var userId = await Utils.getUserId(req);
    if(userId){
      user.findUnique({
        where: {
          id: userId
        }
      }).then((user)=>{
        if(user.role == "MANAGER"){
          course.findMany().then((courses) => res.status(200).json({courses}))
        }else{
          course.findMany({
            where:{
              teacherId : userId
            }
          }).then(courses => {
            res.status(200).json(courses)
          })
        }
      });
    }
    else{
      res.status(403)
    }
  }


  /**
   * [POST]
   * /course
   */
  async create(req, res, next) {
    
    const newCourse = req.body;

    const checkCourseExist = await course.findUnique({
      where: {
        key: newCourse.key
      }
    });
    if (checkCourseExist) {
      return res.send('CourseKey has been used!')
    }
    var userId = await Utils.getUserId(req);
    console.log(userId)
    if(userId){
      newCourse.teacherId = userId;
      course.create({
        data: newCourse
      })
        .then((course) => {
          return res.status(200).send("OK")
        });
    }
    return res.status(403)
  }

  async update(req, res, next) {
    
    const newCourse = req.body;

    const courseExist = await course.findUnique({
      where: {
        key: newCourse.key
      }
    });
    if (!courseExist) {
      return res.send('Course not found!')
    }
    newCourse.teacherId = courseExist.teacherId;
    course.update({
      where:{
        key: newCourse.key
      },
      data: newCourse
    })
      .then((course) => {
        return res.status(200).send("OK")
      });
    
    return res.status(403)
  }

  /**
   * [DELETE]
   * /courses/:key
   */
  delete(req, res, next){
    const key = req.params.key;
    course.delete({
      where: {
        key: key
      }
    }).then(course=> res.status(200).send(course))
  }
}

module.exports = new CourseController()
