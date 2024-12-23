const express = require("express");
const { getHistoryController } = require("../controllers/historyController");

const historyRoute = express.Router();
historyRoute.get("/", getHistoryController);

module.exports = historyRoute;
