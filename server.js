const Hapi = require('@hapi/hapi');
const { errorMiddleware } = require("./middlewares/errorMiddleware");
const { corsMiddleware } = require("./middlewares/corsMiddleware");
const historyRoute = require("./routes/historyRoute");
const predictRoute = require("./routes/predictRoute");

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 8080,
    host: '0.0.0.0',
  });

  // Menambahkan route
  server.route(predictRoute);
  server.route(historyRoute);

  // Middleware untuk menangani CORS
  server.ext(corsMiddleware.method, corsMiddleware.handler);

  // Middleware untuk error handling
  server.ext('onPreResponse', errorMiddleware);

  // Menjalankan server
  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

init();
