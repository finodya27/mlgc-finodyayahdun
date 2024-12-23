const multer = require("multer");

const errorMiddleware = (err, req, res, next) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({
      status: "fail",
      message: "Payload content length greater than maximum allowed: 1000000",
    });
  }

  if (err.message === "Only image files are allowed") {
    return res.status(400).json({
      status: "fail",
      message: "Only image files are allowed",
    });
  }

  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      status: "fail",
      message: `Multer error: ${err.message}`,
    });
  }

  console.error("Unexpected Error:", err);
  return res.status(500).json({
    status: "fail",
    message: "Internal Server Error",
  });
};

module.exports = errorMiddleware;
