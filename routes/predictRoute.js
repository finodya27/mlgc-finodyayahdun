const { predictHandler } = require("../controllers/predictController");
const { uploadMiddleware } = require("../middlewares/uploadMiddleware");

const predictRoute = {
  method: 'POST',
  path: '/predict',
  options: uploadMiddleware,
  handler: predictHandler,
};

module.exports = predictRoute;
