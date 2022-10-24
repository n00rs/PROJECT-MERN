const multer = require("multer");

const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('storag')
    cb(null, "./server/public/blog_images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: Storage });

module.exports = {upload}
  