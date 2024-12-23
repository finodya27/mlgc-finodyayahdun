const multer = require("multer");

const uploadMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1000000 },
});

module.exports = { uploadMiddleware };
