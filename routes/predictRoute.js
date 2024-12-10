const express = require("express");
const { predictController } = require("../controllers/predictController");
const { upload } = require("../middlewares/uploadMiddleware");

const router = express.Router();

// Gunakan upload.single('image') untuk key "image"
router.post("/", upload.single("image"), predictController);

module.exports = router;
