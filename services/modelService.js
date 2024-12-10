const tf = require("@tensorflow/tfjs-node");

const modelUrl = "https://storage.googleapis.com/submissionmlgc-finodyayahdun/submissions-model/model.json";
let model;

(async () => {
  model = await tf.loadGraphModel(modelUrl);
  console.log("Model loaded successfully");
})();

const predictImage = async (buffer) => {
  const imageTensor = tf.node
    .decodeJpeg(buffer)
    .resizeNearestNeighbor([224, 224])  // Sesuaikan ukuran input sesuai dengan model Anda
    .expandDims()
    .toFloat();

  const prediction = model.predict(imageTensor).dataSync();
  return {
    result: prediction[0] > 0.5 ? "Cancer" : "Non-cancer",
    suggestion: prediction[0] > 0.5 ? "Consult a doctor!" : "No cancer detected.",
  };
};

module.exports = { predictImage };
