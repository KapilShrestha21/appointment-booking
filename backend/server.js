import "dotenv/config"
import express from "express";
import cors from "cors";
import pool from "./src/config/db.js";

import userRoutes from "./src/routes/user.routes.js";
import serviceRoutes from "./src/routes/services.routes.js";
import appointmentRoutes from "./src/routes/appointment.routes.js";

import errorHandler from "./src/middlewares/errorHandler.js";

const app = express()
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/appointments", appointmentRoutes);

// for centralized error handler
app.use(errorHandler);

pool.query("SELECT NOW()")
  .then(() => console.log("Database connected successfully!"))
  .catch((err) => console.error("Database connection error:", err.message));
  
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    
})