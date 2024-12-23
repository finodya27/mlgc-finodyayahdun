const express = require("express");
const cors = require("cors");
const errorMiddleware = require("./middlewares/errorMiddleware");
const historyRoute = require("./routes/historyRoute");
const predictRoute = require("./routes/predictRoute");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json()); 
app.use(cors()); 

app.use("/predict", predictRoute);
app.use("/predict/histories", historyRoute);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
