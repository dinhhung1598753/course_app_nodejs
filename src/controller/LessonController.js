const { PrismaClient } = require('@prisma/client');
const { lesson, course, user } = new PrismaClient();
const Utils = require('./utils/Utils');

class LessonController {



  /** 
   * [GET]
   * /lessons
   * 
  */
  async index(req, res, next) {
    var courseKey = req.query.courseKey;

    lesson.findMany({
      where: {
        courseKey: courseKey
      }
    }).then(courses => {
      res.status(200).json(courses)
    })
  }


  /**
   * [POST]
   * /courses
   */
  async create(req, res, next) {
    
    let url = req.protocol + '://' + req.get('host')
    url = url + '/public/images/' + req.file.filename
    const {key, name, courseKey, description, videoId} = req.body;
    const newLesson =  {
      key,
      name,
      courseKey,
      description, 
      videoId,
      avatar: url
    }

    const checkLessonExist = await lesson.findUnique({
      where: {
        key: key
      }
    });
    if (checkLessonExist) {
      return res.send('LessonKey has been used!')
    }
    // var userId = await Utils.getUserId(req);
    // console.log(userId)
    // if(userId){
    //   newCourse.teacherId = userId;
    //   course.create({
    //     data: newCourse
    //   })
    //     .then((course) => {
    //       return res.status(200).send("OK")
    //     });
    // }

    lesson.create({
      data:newLesson
    })
      .then((lesson) => {
        return res.status(200).send("OK")
      });
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
      where: {
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
  delete(req, res, next) {
    const key = req.params.key;
    course.delete({
      where: {
        key: key
      }
    }).then(course => res.status(200).send(course))
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
}

module.exports = new LessonController()
