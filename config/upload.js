const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function (req, file, callback) {
    let type = "";
    if (file.mimetype === "application/octet-stream" || !file.mimetype) {
      type = ".jpg";
    }
    callback(null, Date.now() + "-" + file.originalname + type);
  },
});

const upload = multer({ storage });

module.exports = upload;