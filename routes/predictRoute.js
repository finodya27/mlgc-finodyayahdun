const express = require("express");
const { predictController } = require("../controllers/predictController");
const { uploadMiddleware } = require("../middlewares/uploadMiddleware");

const predictRoute = express.Router();
predictRoute.post("/", uploadMiddleware.single("image"), predictController);

module.exports = predictRoute;
