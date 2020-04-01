var express = require('express');
var router = express.Router();


// Moment module for retrieving current time 
var moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');

// Multer Settings
/* TODO: (1) File filtering(ext, size, etc) upon uploads
*        (2) Delete/move uploaded files
*        (3) Engine handler
*/
var multer = require('multer');
var path = require('path');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/') // dir for the uploaded file to be stored
    },
    filename: (req, file, cb) => {
        let uploadTime = moment().format('YYYY-MM-DD_HH-mm-ss');
        let extension = path.extname(file.originalname);
        let basename = path.basename(file.originalname, extension);
        cb(null, basename + '_' + uploadTime + extension); // naming the uploaded file
    }
});
var upload = multer({ storage: storage });


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'CDP2 Team6' });
});

/* POST upload */
router.post('/', upload.single('upload'), (req, res, next) => {
  let uploadTime = moment().format('YYYY-MM-DD_HH-mm-ss');

  try {
      res.send('File uploaded successfully' + '\n' + JSON.stringify(req.file));
      console.log('File uploaded:' + '\n' + JSON.stringify(req.file) + 'Time: ' + uploadTime);
  } catch (err) {
      res.send(400);
  }
});

module.exports = router;
