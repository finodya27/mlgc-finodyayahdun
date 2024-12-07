const { uploadFile } = require("../services/storageService");
const { predictImage } = require("../services/modelService");
const { savePrediction } = require("../services/databaseService");
const { v4: uuidv4 } = require("uuid");

const predictHandler = async (request, h) => {
  try {
    const file = request.payload.file;
    if (!file) {
      return h.response({
        status: "fail",
        message: "No file uploaded",
      }).code(400);
    }

    const { buffer, mimetype } = file;

    // Upload image to Cloud Storage
    const imageId = uuidv4();
    const imageUrl = await uploadFile(buffer, mimetype, imageId);

    // Perform prediction
    const { result, suggestion } = await predictImage(buffer);

    // Save prediction result to Firestore
    const createdAt = new Date().toISOString();
    const predictionData = {
      id: imageId,
      result,
      suggestion,
      createdAt,
      // imageUrl,
    };
    await savePrediction(imageId, predictionData);

    return h.response({
      status: "success",
      message: "Model is predicted successfully",
      data: predictionData,
    }).code(200);
  } catch (error) {
    console.error("Prediction Error:", error);
    return h.response({
      status: "fail",
      message: "Terjadi kesalahan dalam melakukan prediksi",
    }).code(400);
  }
};

module.exports = { predictHandler };
