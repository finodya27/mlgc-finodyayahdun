const { getPredictionHistories } = require("../services/databaseService");

const getHistoryHandler = async (request, h) => {
  try {
    const histories = await getPredictionHistories();

    return h.response({
      status: "success",
      data: histories,
    }).code(200);
  } catch (error) {
    console.error("Error fetching prediction histories:", error);
    return h.response({
      status: "fail",
      message: "Terjadi kesalahan dalam mengambil riwayat prediksi",
    }).code(500);
  }
};

module.exports = { getHistoryHandler };
