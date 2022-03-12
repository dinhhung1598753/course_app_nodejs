const express = require('express');
const lessonController = require('../controller/LessonController');
const router = express.Router();
const path = require('path');
const multer = require('multer');



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/images'))
    },
    filename: function (req, file, cb) {
        let fileName = file.originalname.toLowerCase().split(' ').join('-');
        fileName = fileName.split('.').join( Date.now() + '.')
        cb(null, fileName)
    }
})

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('File type not accepted (.png, .jpg, .jpeg)'));
        }
    }
})



router.get('/', lessonController.index);
router.post('/', upload.single('imageFile'), lessonController.create);
router.put('/', upload.single('imageFile'), lessonController.update);
router.delete('/:key', lessonController.delete);

module.exports = router;
