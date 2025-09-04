const express = require("express");
const cors = require("cors");
const pdfHandleRoute = require("./routes/pdfHandleRoute");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use("/pdf", pdfHandleRoute);

// Basic health check route
app.get("/", (req, res) => {
  res.json({ message: "Readmee AI Backend is running!" });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error("Unhandled error:", error);
  res.status(500).json({ error: "Internal server error" });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  //console.log(`API endpoints available at http://localhost:${PORT}`);
});