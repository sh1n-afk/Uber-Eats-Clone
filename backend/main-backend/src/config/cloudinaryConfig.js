const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: "dkamuv8b4",
  api_key: "215112657343822",
  api_secret: "nd3Si-zUJ6fd5JQhUqDi5ry8h0Q",
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["jpg", "png", "jpeg"],
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploader = multer({ storage });

module.exports = { uploader };
