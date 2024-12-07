const errorMiddleware = (err, request, h) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    return h.response({
      status: "fail",
      message: "Payload content length greater than maximum allowed: 1000000",
    }).code(413);
  }
  throw err; 
};

module.exports = { errorMiddleware };
