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
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Serve static files from the images directory
app.use(
  "/images",
  express.static(path.resolve("..", "frontend", "public", "images"))
);

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
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Database connection error:", error.message);
  }
})();
