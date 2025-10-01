const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Contact API (optional - only if database is configured)
try {
  const contactRoute = require("./routes/contact");
  app.use("/contact", contactRoute);
  console.log("Contact API enabled");
} catch (error) {
  console.log("Contact API disabled - database not configured");
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit: http://localhost:${PORT}`);
});
