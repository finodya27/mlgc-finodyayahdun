const corsMiddleware = {
  method: 'onPreResponse',
  assign: 'corsHandler',
  handler: (request, h) => {
    const response = request.response;
    if (!response.isBoom) {
      response.header('Access-Control-Allow-Origin', '*');
      response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
      response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    }
    return h.continue;
  },
};

module.exports = { corsMiddleware };
