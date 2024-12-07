const { getHistoryHandler } = require("../controllers/historyHandler");

const historyRoute = {
  method: 'GET',
  path: '/predict/histories',
  handler: getHistoryHandler,
};

module.exports = historyRoute;
