const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectToDatabase = require("./config/database");

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend's URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json()); // Parse JSON request bodies

// Connect to the database
connectToDatabase();

// Routes
const userRoutes = require("./routes/userRoutes"); // Example user routes
const formRoutes = require("./routes/formRoutes"); // Example form routes

app.use("/api/users", userRoutes); // All user-related routes
app.use("/api/forms", formRoutes); // All form-related routes

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
