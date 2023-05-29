require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 5000;
const errorHandler = require("../backend/middleware/errorMiddleware");
const connectDB = require("../backend/config/db");
const cors = require("cors");
const app = express();

connectDB();

const goalsRoutes = require("./routes/goalsRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", goalsRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
