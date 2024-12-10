const { getPredictionHistories } = require("../services/databaseService");

const getHistoryController = async (req, res) => {
  try {
    const histories = await getPredictionHistories();
    return res.status(201).json({
      status: "success",
      data: histories,
    });
  } catch (error) {
    console.error("Error fetching prediction histories:", error);
    return res.status(500).json({
      status: "fail",
      message: "Error fetching prediction histories",
    });
  }
};

module.exports = { getHistoryController };
