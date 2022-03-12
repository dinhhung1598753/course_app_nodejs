const { PrismaClient } = require('@prisma/client');
const { course, user, userCourse } = new PrismaClient();
const nodemailer = require('nodemailer');

class CourseController {



  /** 
   * [GET]
   * /courses
   * 
  */
  async index(req, res, next){
    var userId = req.userId
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
   * /courses
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
    var userId = req.userId
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


  /**
   * 
   * [PUT]
   * /courses
   */
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


  /**
   * 
   * [GET]
   * /courses/search
   */
  search(req, res, next) {
    const searchValue = req.query.searchValue || '';
    // console.log("search  ",searchValue);
    course.findMany({
      where: {
        name: {
          contains: searchValue
        }
      },
    })
      .then(tours => {
        console.log(tours);
        res.send(tours);
      });
  }


  /**
   * 
   * [GET]
   * /courses/subscribe
   */
   countSubscribe(req, res, next) {
    const courseKey = req.query.courseKey || '';
    userCourse.count({
      where: {
        courseKey: courseKey
      },
    })
      .then(tours => {
        console.log(tours);
        res.send(tours);
      });
  }
}

module.exports = new CourseController()
