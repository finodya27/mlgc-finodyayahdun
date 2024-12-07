const Hapi = require('@hapi/hapi');
const { errorMiddleware } = require("./middlewares/errorMiddleware");
const historyRoute = require("./routes/historyRoute");
const predictRoute = require("./routes/predictRoute");

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 8080,
    host: 'localhost',
  });

  server.route(predictRoute);
  server.route(historyRoute);

  // Error handling
  server.ext('onPreResponse', errorMiddleware);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

init();
