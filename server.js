const express = require("express");
const cors = require("cors");
const { errorMiddleware } = require("./middlewares/errorMiddleware");
const historyRoute = require("./routes/historyRoute");
const predictRoute = require("./routes/predictRoute");

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(express.json()); // Untuk parse JSON
app.use(cors()); // Enable CORS

// Routes
app.use("/predict", predictRoute);
app.use("/predict/histories", historyRoute);

// Global error handler
app.use(errorMiddleware);

// Mulai server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
