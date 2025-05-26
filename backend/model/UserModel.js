import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { refreshToken } from "../controller/RefreshToken.js";

const User = sequelize.define("User", {
  username: { type: DataTypes.STRING, unique: true, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, allowNull: false, defaultValue: "user" },
  refreshToken: { type: DataTypes.TEXT },
});

export default User;
