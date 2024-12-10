const errorMiddleware = (err, req, res, next) => {
  // Handle file size limit errors
  if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({
      status: "fail",
      message: "File size exceeds the maximum limit of 1MB",
    });
  }

  // Handle file type errors
  if (err.message === "Only image files are allowed") {
    return res.status(400).json({
      status: "fail",
      message: "Only image files are allowed",
    });
  }

  // Handle other multer errors (e.g., file upload error)
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      status: "fail",
      message: `Multer error: ${err.message}`,
    });
  }

  // Handle other errors (e.g., general API errors, unknown errors)
  console.error("Unexpected Error:", err);
  return res.status(500).json({
    status: "fail",
    message: "Internal Server Error",
  });
};

module.exports = { errorMiddleware };
