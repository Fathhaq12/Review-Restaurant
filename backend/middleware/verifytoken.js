import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(403).json({ message: "Token is required" });

  // Format: "Bearer <token>"
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(403).json({ message: "Token is required" });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    req.userId = decoded.id; // Tambahkan line ini
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
