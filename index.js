const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./database/db");
const cors = require("cors");
const { initialize } = require("./socket");
const { createServer } = require("http");
require("express-async-errors");
require("dotenv").config();
require("colors");

const port = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(cookieParser());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Welcome to CRS API");
});

app.use("/api/users", require("./routes/UserRouter"));
app.use("/api/admins", require("./routes/AdminRouter"));
app.use("/api/reports", require("./routes/ReportRouter"));

app.use((err, req, res, next) => {
  console.error("Error:".red, err.message);
  const errorMessage =
    err instanceof Error ? err.message : "Internal Server Error";
  res.status(500).json({ error: errorMessage });
});

const httpServer = createServer(app);
initialize(httpServer);

httpServer.listen(port, () =>
  console.log(`Server started on port ${port}`.blue)
);
