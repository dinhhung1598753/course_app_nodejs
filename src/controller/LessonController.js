const { PrismaClient } = require('@prisma/client');
const { lesson, course, user } = new PrismaClient();

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
   * /lessons
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
   * /lessons
   */
  async update(req, res, next) {

    let url = req.protocol + '://' + req.get('host')
    url = req.file ?  (url + '/public/images/' + req.file.filename) : null;
    const {key, name, courseKey, description, videoId} = req.body;
    const newLesson =  {
      key,
      name,
      courseKey,
      description, 
      videoId,
      avatar: url
    }

    const lessonExist = await lesson.findUnique({
      where: {
        key: newLesson.key
      }
    });
    if (!newLesson) {
      return res.send('Lesson not found!')
    }
    lessonExist.name = newLesson.name ?? lessonExist.name
    lessonExist.description = newLesson.description ?? lessonExist.description
    lessonExist.videoId = newLesson.videoId ?? lessonExist.videoId
    lessonExist.avatar = newLesson.name ?? lessonExist.avatar

    lesson.update({
      where: {
        key: newLesson.key
      },
      data: newLesson
    })
      .then((course) => {
        return res.status(200).send("OK")
      });

    return res.status(403)
  }

  /**
   * [DELETE]
   * /lessons/:key
   */
  delete(req, res, next) {
    const key = req.params.key;
    lesson.delete({
      where: {
        key: key
      }
    }).then(lesson => res.status(200).send(lesson))
  }


  /**
   * 
   * [GET]
   * /lessons/search
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
