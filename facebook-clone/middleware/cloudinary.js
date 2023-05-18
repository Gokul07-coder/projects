const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const env = require('dotenv').config({path : '../Util/.env'});

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
  });
  
  // Multer setup
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + `-` + file.originalname);
    },
  });
  
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 2 * 1024 * 1024,
    },
    // fileFilter: fileFilter
  });

module.exports = {upload};