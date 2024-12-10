const { uploadFile } = require("../services/storageService");
const { predictImage } = require("../services/modelService");
const { savePrediction } = require("../services/databaseService");
const { v4: uuidv4 } = require("uuid");

const predictController = async (req, res) => {
  try {
    const file = req.file; 
    if (!file) {
      return res.status(400).json({
        status: "fail",
        message: "No file uploaded",
      });
    }

    // Validasi ukuran file
    if (file.size > 1_000_000) {
      return res.status(413).json({
        status: "fail",
        message: "Payload content length greater than maximum allowed: 1000000",
      });
    }

    const { buffer: data, mimetype } = file;
    const imageId = uuidv4();
    const imageUrl = await uploadFile(data, mimetype, imageId);

    // Prediksi gambar
    let predictionResult;
    try {
      predictionResult = await predictImage(data);
    } catch (error) {
      console.error("Prediction Model Error:", error);
      return res.status(400).json({
        status: "fail",
        message: "Terjadi kesalahan dalam melakukan prediksi",
      });
    }

    const { result, suggestion } = predictionResult;
    const predictionData = {
      id: imageId,
      result,
      suggestion,
      createdAt: new Date().toISOString(),
    };

    // Simpan hasil prediksi ke database
    await savePrediction(imageId, { ...predictionData, imageUrl });

    // Respon sukses
    return res.status(201).json({
      status: "success",
      message: "Model is predicted successfully",
      data: predictionData,
    });
  } catch (error) {
    console.error("Unexpected Prediction Error:", error);
    return res.status(500).json({
      status: "fail",
      message: "Terjadi kesalahan dalam melakukan prediksi",
    });
  }
};

module.exports = { predictController };
