import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import sequelize from "./config/database.js";
import authRoutes from "./route/authRoute.js";
import userRoutes from "./route/UserRoute.js";
import restaurantRoutes from "./route/RestoRoute.js";
import menuRoutes from "./route/MenuRoute.js";
import reviewRoutes from "./route/ReviewRoute.js";
import "./model/UserModel.js";
import "./model/RestoModel.js";
import "./model/MenuModel.js";
import "./model/ReviewModel.js";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: [
      "https://review-restoran-dot-b-01-450713.uc.r.appspot.com",
      "http://localhost:3000",
      "http://localhost:8080",
      "http://localhost:53109",
      // Allow any localhost port for development
      /^http:\/\/localhost:\d+$/
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(cookieParser());

// Serve static files from the images directory
app.use('/uploads', express.static('uploads'));


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/menus", menuRoutes);
app.use("/api/reviews", reviewRoutes);

// Connect & sync database then start server
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected...");
    await sequelize.sync({ alter: true }); // auto migration, hati2 di production
    console.log("Database synchronized...");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection error:", error.message);
  }
})();
